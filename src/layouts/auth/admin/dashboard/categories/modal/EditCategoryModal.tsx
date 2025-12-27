import { CategoryApis } from "@/api";
import BaseModal from "@/components/modals/BaseModal";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { useEffect, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import CategoryFormLayout from "../form/CategoryFormLayout";
import GroupButton from "@/components/buttons/group-button/GroupButton";

export default function EditCategoryModal({
  item,
  open,
  setOpen,
}: {
  item: ICategory;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rhf = useSimRhf<ICategory>();
  const [isPending, startTransition] = useTransition();
  const { reset, handleSubmit, setValue } = rhf;

  useEffect(() => {
    if (open && item) {
      const transformedItem = {
        ...item,
        children: Array.isArray(item.children)
          ? item.children.map((c: any) => (typeof c === "string" ? c : c.id))
          : [],
      };
      reset(transformedItem);
    }
  }, [open, item]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const onSubmit: SubmitHandler<ICategory> = (data) => {
    startTransition(async () => {
      try {
        await CategoryApis.update(item?.id as any, data);
        showSuccessToast("Cập nhật danh mục thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Cập nhật danh mục thất bại");
        console.log("Error", error);
      }
    });
  };
  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Chỉnh sửa danh mục"
      description="Cập nhật lại danh mục"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CategoryFormLayout rhf={rhf} />
        <GroupButton
          isloading={isPending}
          onCancel={() => {
            reset(), setOpen(false);
          }}
        />
      </form>
    </BaseModal>
  );
}
