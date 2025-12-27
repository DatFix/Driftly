"use server";
import { db } from "@/configs/firebase.config";
import { IBaseGetOne, IBaseUpdate } from "@/interfaces/others/IBaseReturn.interface";
import { IUser } from "@/interfaces/public/IUser.interface";
import { generateNickname } from "@/utils/generateNickname.utils";
import { now } from "@/utils/now.utils";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const create = async (data: IUser) => {
  const now = new Date().toISOString();

   try {
    const userQuery = query(collection(db, "users"), where("email", "==", data.email));
    const existing = await getDocs(userQuery);

    if (!existing.empty) {
      return {
        statusCode: 409, // Conflict
        message: "Email đã tồn tại trong hệ thống",
        data: null,
      };
    }

    // 🔹 2. Tạo người dùng mới
    const docRef = await addDoc(collection(db, "users"), {
      username: data.username ?? generateNickname(),
      email: data.email,
      avatar: data.avatar ?? "",
      isActive: data?.isActive ?? true,
      coverPhoto: 1 || data.coverPhoto,
      createdAt: now,
      updatedAt: now,
    });

    return {
      statusCode: 201,
      message: "Tạo người dùng thành công",
      data: { id: docRef.id },
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi tạo:", error);

    return {
      statusCode: 500,
      message: error?.message || "Đã xảy ra lỗi khi tạo người dùng",
      data: null,
    };
  }
};

export const findOneById = async (id: string): Promise<IBaseGetOne> => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return {data: null};

    return { data:{ id: docSnap.id, ...(docSnap.data() as IUser) }};
  } catch (error) {
    console.error("Lỗi khi lấy", error);
    return {data: null};
  }
};

export const update = async (id: string, data: IUser): Promise<IBaseUpdate> => {
  try {
    const docRef = doc(db, "users", id);
      const userSnap = await getDoc(docRef);
      if (!userSnap.exists()) {
        return{
          data: null,
          message: "Người dùng không tồn tại",
          statusCode: 404
        }
      }

      await updateDoc(docRef, {
        ...data,
        updatedAt: now(),
      })
      const updatedSnap = await getDoc(docRef);
      const updatedData = updatedSnap.data() as IUser;

      revalidatePath("/profile");

      return{
        data: updatedData,
        message: "Cập nhật thành công",
        statusCode: 200
      }
  } catch (error: any) {
      console.log("❌ Lỗi khi cập nhật", error)
      return{
          data: null,
          message: "Cập nhật thất bại",
          statusCode: 500
      }
  }
}

export const followToggle = async (userId: string, targetUserId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("Người dùng không tồn tại");
  const user = userSnap.data() as IUser;

  const targetUserRef = doc(db, "users", targetUserId);
  const targetUserSnap = await getDoc(targetUserRef);
  if (!targetUserSnap.exists()) throw new Error("Người dùng mục tiêu không tồn tại");
  const targetUser = targetUserSnap.data() as IUser;

  const isFollowing = user.followings?.includes(targetUserId);

  const newFollowings = isFollowing
    ? user.followings?.filter(id => id !== targetUserId) || []
    : [...(user.followings || []), targetUserId];

  const newFollowers = isFollowing
    ? targetUser.followers?.filter(id => id !== userId) || []
    : [...(targetUser.followers || []), userId];

  await updateDoc(userRef, {
    followings: newFollowings,
    updatedAt: now(),
  });

  await updateDoc(targetUserRef, {
    followers: newFollowers,
    updatedAt: now(),
  });

  revalidatePath("/profile");

  return {
    success: true,
    userId: targetUserId,
    following: !isFollowing,
    followers: newFollowers,
  };
};

