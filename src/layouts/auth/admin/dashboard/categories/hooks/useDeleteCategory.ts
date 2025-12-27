import { CategoryApis } from '@/api';
import { ICategory } from '@/interfaces/auth/ICategory.interface';
import { showErrorToast, showSuccessToast } from '@/utils/toast.utils';
import { useState } from 'react';

export function useDeleteCategory() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<ICategory | null>(null);

  const handleOpenDeleteModal = (Category: ICategory) => {
    setDeleteItem(Category);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteItem(null);
  };

  const executeDelete = async () => {
    if (!deleteItem) return;

    try {
        await CategoryApis.remove(deleteItem.id as string);
        showSuccessToast("Xoá danh mục thành công")
        handleCloseDeleteModal()
    } catch (error) {
        showErrorToast("Xoá danh mục thất bại")
        console.log("Delete Category Error", error)
    }
  };

  return {
    deleteModalOpen,
    deleteItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    executeDelete,
  };
}
