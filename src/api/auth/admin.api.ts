"use server";
import { auth, db } from "@/configs/firebase.config"
import { IUser } from "@/interfaces/public/IUser.interface"
import { generateNickname } from "@/utils/generateNickname.utils"
import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"
import { addDoc, collection, doc, documentId, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { revalidatePath } from "next/cache"
import { IRole } from "@/interfaces/auth/IRole.interface";
import bcrypt from "bcryptjs";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";
import { now } from "@/utils/now.utils";
import { IBaseGetMulti, IBaseGetOne } from "@/interfaces/others/IBaseReturn.interface";

export async function InitAdmin() {
  const adminDocRef = doc(db, "admins", "administrator");

  const adminDoc = await getDoc(adminDocRef);

  if (!adminDoc.exists()) {
    await setDoc(adminDocRef, {
      username: "Administrator",
      email: "admin@example.com",
      password: "Admin123@",
      isActive: true,
      createdAt: now(),
    });
    console.log("create Admin success");
  } else {
    console.log("Admin: true");
  }
}

// ✅ Trả về plain object thay vì Firebase User
export const emailSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi tạo tài khoản Firebase:", error);
    throw new Error(error?.message || "Không thể tạo tài khoản");
  }
}

// 🆕 Tạo user mới
export const create = async (data: IAdmin) => {
  const now = new Date().toISOString();
  const nickname = generateNickname();
  
  try {
    // Kiểm tra email đã tồn tại chưa
    const q = query(collection(db, "admins"), where("email", "==", data.email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("Email đã tồn tại trong hệ thống");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    // Tạo user mới VÀ LƯU roleData
    const res = await addDoc(collection(db, "admins"), {
      email: data.email,
      username: data?.username ?? nickname,
      password: hashedPassword,
      role: data.role ?? "",
      createdAt: now,
      updatedAt: now,
      avatar: data.avatar ?? "",
      isActive: true,
    });

    // Lấy lại user data sau khi tạo
    const newUserSnap = await getDoc(doc(db, "admins", res.id));
    const newUser = {
      id: newUserSnap.id,
      ...newUserSnap.data(),
    } as IAdmin;

    // Revalidate
    revalidatePath("/admin/users");
    revalidatePath("/users");
    
    return {
      success: true,
      id: res.id,
      user: newUser // Đã có roleData trong newUser
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi tạo người dùng:", error);
    throw new Error(error?.message || "Không thể tạo người dùng");
  }
};

export const getMe = async (id: string) => {
  try {
    const userRef = doc(db, "admins", id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("Người dùng không tồn tại");
    }

    return {
      id: userSnap.id,
      ...userSnap.data(),
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy thông tin người dùng:", error);
    throw new Error(error?.message || "Không thể lấy thông tin người dùng");
  }
};


export const getMulti = async (): Promise<IBaseGetMulti> => {
  try {
    // Lấy admin
    const adminsSnapshot = await getDocs(collection(db, "admins"));
    const admins: IAdmin[] = adminsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as IAdmin),
    }));

    // Lấy role tương ứng
    const roleIds = admins.map(a => a.role).filter(Boolean);
    const rolesSnapshot = roleIds.length
    ? await getDocs(query(
        collection(db, "roles"),
        where(documentId(), "in", roleIds)
      ))
    : { docs: [] } as any;

    const roles: IRole[] = rolesSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...(doc.data() as IRole),
    }));

    // Ghép role vào admin
    const adminsWithRoles = admins.map(a => ({
      ...a,
      roleData: roles.find(r => r.id === a.role) || null,
    }));

    // Trả về theo IBaseGetMulti
    return {
      data: adminsWithRoles,
      totalItems: adminsWithRoles.length,
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy danh sách users:", error);
    throw new Error(error?.message || "Không thể lấy danh sách người dùng");
  }
};

export const findOneById = async (id: string):Promise<IBaseGetOne> => {
  try {
    const adminRef = doc(db, "admins", id);
    const adminSnap = await getDoc(adminRef)
    const roleId = (adminSnap.data() as IAdmin)?.role
    const roleRef = doc(db, "roles", String(roleId));
    const roleSnap = await getDoc(roleRef)
    
    if (!adminSnap.exists()) return {data: null};
    return { data:{ id: adminSnap.id, ...(adminSnap.data() as IAdmin), roleData: {id: roleSnap.id, ...(roleSnap.data() as IRole)}}};
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
    return {data: null};
  }
}


export const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("Người dùng chưa đăng nhập.");

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    console.log("✅ Đổi mật khẩu thành công!");
    return { success: true, message: "Đổi mật khẩu thành công" };
  } catch (error: any) {
    if (error.code === "auth/wrong-password") {
      console.error("❌ Mật khẩu hiện tại không đúng!");
      throw new Error("Mật khẩu hiện tại không đúng");
    } else {
      console.error("❌ Lỗi khi đổi mật khẩu:", error.message);
      throw new Error(error?.message || "Không thể đổi mật khẩu");
    }
  }
};

export const update = async (id: string, data: Partial<IAdmin>) => {
  const now = new Date().toISOString();
  
  try {
    const userRef = doc(db, "admins", id);
    
    // Kiểm tra user có tồn tại không
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error("Người dùng không tồn tại");
    }

    // Nếu có password mới, hash nó
    const updateData: any = { ...data, updatedAt: now };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    // 🎯 Nếu có role mới, fetch và LƯU roleData vào Firestore
    if (data.role !== undefined) {
      let roleData: IRole | null = null;
      
      if (data.role && typeof data.role === 'string') {
        try {
          const roleRef = doc(db, "roles", data.role);
          const roleSnap = await getDoc(roleRef);
          if (roleSnap.exists()) {
            roleData = { id: roleSnap.id, ...roleSnap.data() } as IRole;
          }
        } catch (error) {
          console.warn("Không thể lấy thông tin role:", error);
        }
      }
      
      // ✅ LƯU roleData vào updateData
      updateData.roleData = roleData;
    }

    // Cập nhật user (bao gồm cả roleData)
    await updateDoc(userRef, updateData);

    // Lấy lại user data sau khi update
    const updatedUserSnap = await getDoc(userRef);
    const updatedUser = {
      id: updatedUserSnap.id,
      ...updatedUserSnap.data(),
    } as IAdmin;

    // Revalidate
    revalidatePath("/admin/users");
    revalidatePath("/users");
    
    return { 
      success: true, 
      id,
      user: updatedUser // Đã có roleData từ Firestore
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi cập nhật user:", error);
    throw new Error(error?.message || "Không thể cập nhật người dùng");
  }
};