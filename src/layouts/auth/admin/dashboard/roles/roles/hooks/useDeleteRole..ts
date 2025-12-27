import { RoleApis } from '@/api';
import { IRole } from '@/interfaces/auth/IRole.interface';
import { showErrorToast, showSuccessToast } from '@/utils/toast.utils';
import { useState } from 'react';

export function useDeleteRole() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<IRole | null>(null);

  const handleOpenDeleteModal = (role: IRole) => {
    setDeleteItem(role);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteItem(null);
  };

  const executeDelete = async () => {
    if (!deleteItem) return;

    try {
        await RoleApis.deleteRole(deleteItem.id as string);
        showSuccessToast("Xoá vai trò thành công")
        handleCloseDeleteModal()
    } catch (error) {
        showErrorToast("Xoá vai trò thất bại")
        console.log("Delete Role Error", error)
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
