import { IUser } from "@/interfaces/public/IUser.interface";
import { useState } from "react";

export default function useEditUser() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<IUser | null>(null);

  const handleOpenEdit = (user: IUser) => {
    setEditItem(user), setEditModalOpen(true);
  };

  const handleCloseEdit = (User: IUser) => {
    setEditItem(null), setEditModalOpen(false);
  };

  return {
    editModalOpen,
    editItem,
    handleOpenEdit,
    handleCloseEdit,
  };
}
