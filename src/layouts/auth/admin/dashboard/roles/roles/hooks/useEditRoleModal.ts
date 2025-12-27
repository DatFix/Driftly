import { IRole } from "@/interfaces/auth/IRole.interface";
import { useState } from "react";

export default function useEditRoleModal() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<IRole | null>(null);

  const handleOpenEditModal = (role: IRole) => {
    setEditItem(role), setEditModalOpen(true);
  };

  const handleCloseEditModal = (role: IRole) => {
    setEditItem(null), setEditModalOpen(false);
  };

  return {
    editModalOpen,
    editItem,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}
