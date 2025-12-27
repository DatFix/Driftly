"use client";
import BaseButton from "@/components/buttons/base-button/BaseButton";
import { CategoryIcon, SheidIcon } from "@/components/icons/BaseIcon";
import BaseTextInput from "@/components/inputs/base-input/BaseTextInput";
import BaseTable from "@/components/tables/BaseTable";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { useState } from "react";
import { getCategoryColumn } from "./column";
import AddCategoryModal from "../modal/AddCategoryModal";
import useEditCategory from "../hooks/useEditCategory";
import EditCategoryModal from "../modal/EditCategoryModal";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import BaseConfirmAlert from "@/components/alert/BaseConfirmAlert";

export default function CategoryTable({ items }: { items: ICategory[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { editModalOpen, editItem, handleOpenEdit, handleCloseEdit } =
    useEditCategory();

  const {
    deleteModalOpen,
    deleteItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    executeDelete,
  } = useDeleteCategory();

  const columns = getCategoryColumn({
    onEditCategory: handleOpenEdit,
    onDeleteCategory: handleOpenDeleteModal,
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
              <CategoryIcon color="currentColor" width={20} height={20} />
              <p>Thêm danh mục</p>
            </BaseButton>
          </div>
        </div>
        <BaseTable data={items} columns={columns} />
      </div>

      <AddCategoryModal open={open} setOpen={setOpen} />
      <EditCategoryModal
        open={editModalOpen}
        setOpen={handleCloseEdit as any}
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
