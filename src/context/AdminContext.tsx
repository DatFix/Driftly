"use client";
import { db } from "@/configs/firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { createSession, deleteSession, getSession } from "@/actions/auth";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";

interface AdminContextType {
  adminData: IAdmin | null;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  adminData: null,
  loading: false,
  adminLogin: async () => {},
  adminLogout: async () => {},
});

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [adminData, setAdminData] = useState<IAdmin | null>(null);
  const [loading, setLoading] = useState(true); // Đổi thành true để load session

  // Khôi phục session khi component mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await getSession();

        if (session?.userId && session?.role) {
          setAdminData({
            id: session.userId as string,
            email: session.email as string,
            username: session.username as string,
            role: session.role as string,
          });
        }
      } catch (error) {
        console.error("Không thể khôi phục session:", error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Đăng nhập admin
  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Tìm user trong collection users theo email
      const usersRef = collection(db, "admins");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Tài khoản không tồn tại");
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Tạo session
      await createSession(userDoc.id, {
        email: userData.email,
        username: userData.username,
        role: userData.roleData,
        // roleData: userData.roleData
      });

      const newAdminData = {
        id: userDoc.id,
        email: userData.email,
        username: userData.username,
        role: userData.roleData,
      };

      setAdminData(newAdminData);
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất admin
  const adminLogout = async () => {
    await deleteSession();
    setAdminData(null);
  };

  return (
    <AdminContext.Provider
      value={{ adminData, loading, adminLogin, adminLogout }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
