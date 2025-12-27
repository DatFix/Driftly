"use client";
import BaseButton from "@/components/buttons/base-button/BaseButton";
import { UpdatedIcon } from "@/components/icons/BaseIcon";
import BaseTextInput from "@/components/inputs/base-input/BaseTextInput";
import BaseTable from "@/components/tables/BaseTable";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { getPermissionColumn } from "./column";
import { RoleApis } from "@/api";
import { useState } from "react";
import { showSuccessToast } from "@/utils/toast.utils";

export default function PermissionTable({ items }: { items: IRole[] }) {
  const [roles, setRoles] = useState<IRole[]>(items);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Cập nhật quyền trong state
  const handlePermissionChange = (id: string, updatedPermissions: string[]) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, permissions: updatedPermissions } : r
      )
    );
  };

  const columns = getPermissionColumn(handlePermissionChange);

  const handleUpdateAll = async () => {
    try {
      setLoading(true);
      await RoleApis.updateMulti(
        roles
          .filter((r) => r.id) // 👈 chỉ lấy role có id
          .map((r) => ({
            id: r.id as string, // ép kiểu về string
            permissions: r.permissions,
          }))
      );
      showSuccessToast("Cập nhật quyền hạn thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật quyền:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = roles.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto mt-5">
      <div className="bg-(--color-card) p-7 shadow-sm rounded-lg">
        <div className="flex items-center justify-between mb-5">
          <div className="w-fit">
            <BaseTextInput
              size="small"
              placeholder="Tìm kiếm vai trò"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-fit">
            <BaseButton
              size="small"
              onClick={handleUpdateAll}
              isloading={loading}
            >
              <UpdatedIcon color="currentColor" />
              <p>Cập nhật</p>
            </BaseButton>
          </div>
        </div>

        <BaseTable data={filteredRoles} columns={columns} />
      </div>
    </div>
  );
}
