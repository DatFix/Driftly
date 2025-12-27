"use client";
import { IPermission } from "@/interfaces/auth/IPermission.interface";
import RolePermissonTab from "../commons/tab/RolePermissonTab";
import PermissionTable from "./list/PermissionTable";
import { IRole } from "@/interfaces/auth/IRole.interface";

export default function PermissionsLayout({ items }: { items: IRole[] }) {
  // console.log('====================================');
  // console.log("items", items);
  // console.log('====================================');
  return (
    <div>
      <div className="w-60">
        <RolePermissonTab />
      </div>
      <PermissionTable items={items} />
    </div>
  );
}
