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
import { IImage } from "@/interfaces/public/IPost.interface";

interface UserData {
  id: string;
  email: string;
  username: string;
  avatar?: string | IImage;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  emailSignIn: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  userLogout: () => Promise<void>;
  setUser?: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  emailSignIn: async () => {},
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
            id: session.userId as string,
            email: session.email as string,
            username: session.username as string,
            avatar: session.avatar as string,
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
        const newUser: IUser = {
          username: fbUser.displayName ?? generateNickname(),
          email: fbUser.email ?? "",
          avatar: fbUser.photoURL ?? "",
          isActive: true,
        };

        const res = await UserApis.create(newUser);
        if (res.statusCode !== 201) throw new Error(res.message);

        userDocId = res.data?.id ?? "";
        userData = newUser;
      } else {
        const userDoc = querySnapshot.docs[0];
        userDocId = userDoc.id;
        userData = userDoc.data();
      }

      // ✅ Lưu session có avatar
      await createUserSession(userDocId, {
        email: userData.email,
        username: userData.username,
        avatar: userData.avatar, // ✅ thêm avatar
      });

      setUser({
        id: userDocId,
        email: userData.email,
        username: userData.username,
        avatar: userData.avatar,
      });
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Đăng nhập bằng Email + Password
  const emailSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fbUser = userCredential.user;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      let userDocId: string;
      let userData: any;

      if (querySnapshot.empty) {
        const newUser: IUser = {
          username: fbUser.displayName ?? generateNickname(),
          email: fbUser.email ?? "",
          avatar: fbUser.photoURL ?? "",
          isActive: true,
        };

        const res = await UserApis.create(newUser);
        if (res.statusCode !== 201) throw new Error(res.message);

        userDocId = res.data?.id ?? "";
        userData = newUser;
      } else {
        const userDoc = querySnapshot.docs[0];
        userDocId = userDoc.id;
        userData = userDoc.data();
      }

      // ✅ Lưu session có avatar
      await createUserSession(userDocId, {
        email: userData.email,
        username: userData.username,
        avatar: userData.avatar, // ✅ thêm avatar
      });

      setUser({
        id: userDocId,
        email: userData.email,
        username: userData.username,
        avatar: userData.avatar,
      });
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
      value={{ user, loading, emailSignIn, googleSignIn, userLogout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
