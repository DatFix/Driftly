"use client";
import RolePermissonTab from "../commons/tab/RolePermissonTab";
import { IRole } from "@/interfaces/auth/IRole.interface";
import RoleTable from "./list/RoleTable";

export default function RolesLayout({ items }: { items: IRole[] }) {
  return (
    <div>
      <div className="w-60">
        <RolePermissonTab />
      </div>
      <RoleTable items={items} />
    </div>
  );
}
