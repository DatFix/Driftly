"use server";
import { db } from "@/configs/firebase.config";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { generateSlug } from "@/utils/generateSlug.utils";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const create = async (category: ICategory) => {
  const now = new Date().toISOString()
  try {
    const docRef = await addDoc(collection(db, "categories"), {
      name: category.name,
      slug: generateSlug(category.name),
      description: category.description ?? "",
      children: category.children ?? [],
      isActive: category.isActive ?? false,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/categories", "page");
    return { id: docRef.id };
  } catch (error) {
    console.error("❌ Lỗi khi tạo category:", error);
    throw error;
  }
};

export const findOneById = async (id: string): Promise<ICategory | null> => {
  try {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return { id: docSnap.id, ...(docSnap.data() as ICategory) };
  } catch (error) {
    console.error("Lỗi khi lấy category theo ID:", error);
    return null;
  }
};


export const getMulti = async (): Promise<ICategory[]> => {
  try {
    // 🔹 Lấy categories và sắp xếp theo field 'index' (tăng dần)
    const q = query(collection(db, "categories"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const categories: ICategory[] = querySnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...(doc.data() as ICategory),
    }));

    // 🔹 Nạp thêm children (nếu có)
    const categoriesWithChildren = await Promise.all(
      categories.map(async (category) => {
        if (Array.isArray(category.children) && category.children.length > 0) {
          const childDocs = await Promise.all(
            category.children.map(async (child) =>
              typeof child === "string" ? await findOneById(child) : child
            )
          );
          return { ...category, children: childDocs.filter(Boolean) };
        }
        return category;
      })
    );

    return categoriesWithChildren;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách categories:", error);
    return [];
  }
};

// export const getMulti = async ({checkActive = false}: {checkActive?: boolean}): Promise<ICategory[]> => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "categories"));

//     // Lấy tất cả danh mục
//     const categories: ICategory[] = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...(doc.data() as ICategory),
//     }));

//     // ❗ Lọc bỏ các danh mục cha có isActive === false
//      const activeCategories = checkActive
//       ? categories.filter((cat) => cat.isActive !== false)
//       : categories;

//     // Lấy dữ liệu children (không kiểm tra isActive)
//     const categoriesWithChildren = await Promise.all(
//       activeCategories.map(async (category) => {
//         if (Array.isArray(category.children) && category.children.length > 0) {
//           const childDocs = await Promise.all(
//             category.children.map((child) =>
//               typeof child === "string" ? findOneById(child) : child
//             )
//           );
//           return {
//             ...category,
//             children: childDocs.filter(Boolean),
//           };
//         }
//         return category;
//       })
//     );

//     return categoriesWithChildren;
//   } catch (error) {
//     console.error("Lỗi khi lấy danh sách categories:", error);
//     return [];
//   }
// };


export const update = async (id: string, data: Partial<ICategory>) => {
  const now = new Date().toISOString();
  try {
    const roleRef = doc(db, "categories", id);
    await updateDoc(roleRef, {
      ...data,
      slug: generateSlug(data.name as any),
      updatedAt: now,
    });
    // await update(data?.children as any, {...data, children: data?.children})
    revalidatePath("categories", "layout");
    return { success: true, id };
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật role:", error);
    throw error;
  }
};

export const remove = async (id: string) => {
    try {
        const category = doc(db, "categories", id);
        await deleteDoc(category);
        revalidatePath("categories", "layout");
    } catch (error) {
        console.error("Lỗi khi xóa vai trò", error);
    }
}