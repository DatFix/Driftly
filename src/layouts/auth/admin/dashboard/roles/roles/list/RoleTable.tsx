import { IRole } from "@/interfaces/auth/IRole.interface";
import { useState } from "react";
import BaseTextInput from "@/components/inputs/base-input/BaseTextInput";
import BaseButton from "@/components/buttons/base-button/BaseButton";
import { SheidIcon, UserPlusIcon } from "@/components/icons/BaseIcon";
import BaseTable from "@/components/tables/BaseTable";
import { getRoleColumn } from "./column";
import AddRoleModal from "../modal/AddRoleModal";
import EditRoleModal from "../modal/EditRoleModal";
import useEditRoleModal from "../hooks/useEditRoleModal";
import { useDeleteRole } from "../hooks/useDeleteRole.";
import BaseConfirmAlert from "@/components/alert/BaseConfirmAlert";

export default function RoleTable({ items }: { items: IRole[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { editModalOpen, editItem, handleOpenEditModal, handleCloseEditModal } =
    useEditRoleModal();

  const {
    deleteModalOpen,
    deleteItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    executeDelete,
  } = useDeleteRole();

  const columns = getRoleColumn({
    onEditRole: handleOpenEditModal,
    onDeleteRole: handleOpenDeleteModal,
  });
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
            <BaseButton size="small" onClick={() => setOpen(true)}>
              <SheidIcon color="currentColor" width={20} height={20} />
              <p>Thêm vai trò</p>
            </BaseButton>
          </div>
        </div>
        <BaseTable data={items} columns={columns} />
      </div>

      <AddRoleModal open={open} setOpen={setOpen} />
      <EditRoleModal
        open={editModalOpen}
        setOpen={handleCloseEditModal as any}
        item={editItem as any}
      />
      <BaseConfirmAlert
        open={deleteModalOpen}
        onOpenChange={handleCloseDeleteModal}
        onConfirm={executeDelete}
      />
    </div>
  );
}
