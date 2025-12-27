"use client";
import { auth, db } from "@/configs/firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserSession,
  deleteUserSession,
  getUserSession,
} from "@/actions/auth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { UserApis } from "@/api";
import { generateNickname } from "@/utils/generateNickname.utils";
import { IUser } from "@/interfaces/public/IUser.interface";

interface UserData {
  uid: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  userLogin: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  userLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  userLogin: async () => {},
  googleSignIn: async () => {},
  userLogout: async () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Khôi phục session user
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await getUserSession();

        if (session?.userId) {
          setUser({
            uid: session.userId as string,
            email: session.email as string,
            username: session.username as string,
          });
        }
      } catch (error) {
        console.error("Không thể khôi phục session user:", error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // 🔹 Đăng nhập bằng Google
  const googleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const fbUser = res.user;

      // 🔍 Kiểm tra user trong Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", fbUser.email));
      const querySnapshot = await getDocs(q);

      let userDocId: string;
      let userData: any;

      if (querySnapshot.empty) {
        // Nếu user chưa tồn tại → tạo mới
        const newUser: IUser = {
          username: fbUser.displayName ?? generateNickname(),
          email: fbUser.email ?? "",
          avatar: fbUser.photoURL ?? "",
          isActive: true,
        };

        const res = await UserApis.create(newUser);
        if (res.statusCode !== 201) throw new Error(res.message);

        userDocId = res?.data?.id ?? "";
        userData = newUser;
      } else {
        // Nếu user đã tồn tại
        const userDoc = querySnapshot.docs[0];
        userDocId = userDoc.id;
        userData = userDoc.data();
      }

      // ✅ Tạo session
      await createUserSession(userDocId, {
        email: userData.email,
        username: userData.username,
      });

      const newUserData: UserData = {
        uid: userDocId,
        email: userData.email,
        username: userData.username,
      };

      setUser(newUserData);
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Đăng nhập user (email + password)
  const userLogin = async (email: string, password: string) => {
    try {
      setLoading(true);

      // 1️⃣ Đăng nhập Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fbUser = userCredential.user;

      // 2️⃣ Kiểm tra user trong Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      let userDocId: string;
      let userData: any;

      if (querySnapshot.empty) {
        // 🔸 Nếu user chưa tồn tại trong Firestore → tạo mới
        const now = new Date().toISOString();
        const newUser: IUser = {
          username: fbUser.displayName ?? generateNickname(),
          email: fbUser.email ?? "",
          avatar: fbUser.photoURL ?? "",
          isActive: true,
        };

        const res = await UserApis.create(newUser);
        if (res.statusCode !== 201) throw new Error(res.message);

        userDocId = res?.data?.id ?? "";
        userData = newUser;
      } else {
        // 🔹 Nếu đã tồn tại → lấy dữ liệu
        const userDoc = querySnapshot.docs[0];
        userDocId = userDoc.id;
        userData = userDoc.data();
      }

      // 3️⃣ Tạo session
      await createUserSession(userDocId, {
        email: userData.email,
        username: userData.username,
      });

      const newUserData: UserData = {
        uid: userDocId,
        email: userData.email,
        username: userData.username,
      };

      setUser(newUserData);
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Đăng xuất user
  const userLogout = async () => {
    await deleteUserSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, userLogin, googleSignIn, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
