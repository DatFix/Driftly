"use client";
import { IUser } from "@/interfaces/public/IUser.interface";
import UserTable from "./list/UserTable";
import { useAdmin } from "@/context/AdminContext";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";

export default function UserLayout({ items }: { items: IAdmin[] }) {
  const { adminData } = useAdmin();
  return (
    <div>
      <UserTable items={items} />
    </div>
  );
}
