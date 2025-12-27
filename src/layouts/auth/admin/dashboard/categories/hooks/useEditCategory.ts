import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { useState } from "react";

export default function useEditCategory() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<ICategory | null>(null);

  const handleOpenEdit = (category: ICategory) => {
    setEditItem(category), setEditModalOpen(true);
  };

  const handleCloseEdit = (category: ICategory) => {
    setEditItem(null), setEditModalOpen(false);
  };

  return {
    editModalOpen,
    editItem,
    handleOpenEdit,
    handleCloseEdit,
  };
}
