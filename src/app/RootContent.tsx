"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { AdminContextProvider } from "@/context/AdminContext";
import Navbar from "@/layouts/home/nav/Navbar";
import BaseToast from "@/components/toasts/BaseToast";
import { usePathname } from "next/navigation";

export default function RootContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const exceptPathname = ["/login"];
  const isAdminPath = pathName.startsWith("/admin");

  return (
    <>
      {isAdminPath ? (
        <AdminContextProvider>
          <div className="bg-(--color-background) h-screen transition-all duration-200">
            {children}
          </div>
          <BaseToast />
        </AdminContextProvider>
      ) : (
        <AuthContextProvider>
          <div className="bg-(--color-background) transition-all duration-200">
            {!exceptPathname.some((item) => pathName.startsWith(item)) && <Navbar />}
            <div className="">{children}</div>
          </div>
          <BaseToast />
        </AuthContextProvider>
      )}
    </>
  );
}
