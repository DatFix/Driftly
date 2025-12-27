import BaseButton from "@/components/buttons/base-button/BaseButton";
import { UserPlusIcon } from "@/components/icons/BaseIcon";
import BaseTextInput from "@/components/inputs/base-input/BaseTextInput";
import BaseTable from "@/components/tables/BaseTable";
import { IUser } from "@/interfaces/public/IUser.interface";
import { useState } from "react";
import { getUserColumn } from "./column";
import AddUserModal from "../modal/AddUserModal";
import useEditUser from "../hooks/useEditUser";
import EditUserModal from "../modal/EditUserModal";
import useChangeStatusUser from "../hooks/useChangeStatusUser";
import UserChangeStatusModal from "../modal/UserChangeStatusModal";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";

export default function UserTable({ items }: { items: IAdmin[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { editModalOpen, editItem, handleOpenEdit, handleCloseEdit } =
    useEditUser();

  const {
    ChangeStatusModalOpen,
    ChangeStatusItem,
    handleOpenChangeStatus,
    handleCloseChangeStatus,
  } = useChangeStatusUser();

  const columns = getUserColumn({
    onEditUser: handleOpenEdit,
    onChangeStatusUser: handleOpenChangeStatus,
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
              <UserPlusIcon color="currentColor" width={20} height={20} />
              <p>Thêm người dùng</p>
            </BaseButton>
          </div>
        </div>
        <BaseTable data={items} columns={columns} />
      </div>

      <AddUserModal open={open} setOpen={setOpen} />

      <EditUserModal
        open={editModalOpen}
        item={editItem as any}
        setOpen={handleCloseEdit as any}
      />

      <UserChangeStatusModal
        open={ChangeStatusModalOpen}
        item={ChangeStatusItem as any}
        setOpen={handleCloseChangeStatus as any}
      />
    </div>
  );
}
