"use server";
import { db } from "@/configs/firebase.config";
import { IPermission } from "@/interfaces/auth/IPermission.interface";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const getMulti = async (): Promise<IPermission[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "roles"));
        const permissions: IPermission[] = querySnapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data() as IPermission
            }
        ));
        return permissions;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách users:", error);
        return []
    }
}

export const createRole = async (data: IRole) => {
    const now = new Date().toISOString()
    try {
        const docRef = await addDoc(collection(db, "roles"), {
            name: data.name,
            description: data.description,
            permissions: data.permissions ?? [],
            createdAt: now,
            updatedAt: now,
        });

        console.log("✅ Category created with ID:", docRef.id);
        revalidatePath('roles', 'layout')
        return { id: docRef.id };
    } catch (error) {
        console.error("❌ Lỗi khi tạo category:", error);
        throw error;
    }
};

export const getRoles = async (): Promise<IRole[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "roles"));
        const roles: IRole[] = querySnapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data() as IRole
            }
        ));
        return roles;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách roles:", error);
        return []
    }
}

export const updateRole = async (id: string, data: Partial<IRole>) => {
  const now = new Date().toISOString();

  try {
    // Gọi đến document cụ thể
    const roleRef = doc(db, "roles", id);

    // Cập nhật dữ liệu
    await updateDoc(roleRef, {
      ...data,
      updatedAt: now,
    });

    console.log("✅ Role updated with ID:", id);

    // Revalidate trang hiển thị danh sách roles
    revalidatePath("roles", "layout");

    return { success: true, id };
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật role:", error);
    throw error;
  }
};

export const deleteRole = async (id: string) => {
    try {
        const role = doc(db, "roles", id);
        await deleteDoc(role);
        revalidatePath("roles", "layout");
    } catch (error) {
        console.error("Lỗi khi xóa vai trò", error);
    }
}

export const updateMulti = async (
  data: { id: string; permissions: string[] }[]
) => {
  try {
    // Cập nhật song song tất cả roles
    await Promise.all(
      data.map(({ id, permissions }) => {
        const roleRef = doc(db, "roles", id);
        return updateDoc(roleRef, { permissions });
      })
    );

    // Sau khi cập nhật xong thì revalidate lại trang
    revalidatePath("/permissions", "layout");
    console.log("✅ Đã cập nhật quyền cho tất cả vai trò!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật nhiều vai trò:", error);
  }
};



