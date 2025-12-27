import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/configs/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { IAdminUserField } from "@/interfaces/auth/IAdminUserField.interface";

export async function loginAdmin(email: string, password: string) {
  // 1️⃣ Đăng nhập qua Firebase Auth
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2️⃣ Kiểm tra trong Firestore xem có phải admin không
  const adminRef = doc(db, "admins", user.uid);
  const adminSnap = await getDoc(adminRef);

  // if (!adminSnap.exists()) {
  //   throw new Error("Tài khoản này không có quyền admin");
  // }

  return { user, admin: adminSnap.data() };
}

export const getUserAdmin = async (): Promise<IAdminUserField[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        const users: IAdminUserField[] = querySnapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data() as IAdminUserField
            }
        ));
        return users;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách users:", error);
        return []
    }
}