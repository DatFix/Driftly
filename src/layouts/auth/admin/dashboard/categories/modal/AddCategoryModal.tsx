import { CategoryApis } from "@/api";
import GroupButton from "@/components/buttons/group-button/GroupButton";
import BaseModal from "@/components/modals/BaseModal";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { useEffect, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import CategoryFormLayout from "../form/CategoryFormLayout";

export default function AddCategoryModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rhf = useSimRhf<ICategory>();
  const [isPending, startTransition] = useTransition();
  const { reset, handleSubmit } = rhf;

  const onSubmit: SubmitHandler<ICategory> = (data) => {
    startTransition(async () => {
      try {
        await CategoryApis.create(data);
        showSuccessToast("Tạo danh mục thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Tạo danh mục thất bại");
        console.log("Error", error);
      }
    });
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Thêm danh mục"
      description="Tạo mới danh mục"
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
