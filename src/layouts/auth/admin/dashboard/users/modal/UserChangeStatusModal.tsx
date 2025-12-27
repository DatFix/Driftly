import { AdminApis } from "@/api";
import GroupButton from "@/components/buttons/group-button/GroupButton";
import BaseModal from "@/components/modals/BaseModal";
import { BaseSwitchRhf } from "@/components/switch/BaseSwitchRhf";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { useEffect, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";

export default function UserChangeStatusModal({
  item,
  open,
  setOpen,
}: {
  item: IAdmin;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rhf = useSimRhf<IAdmin>();
  const [isPending, startTransition] = useTransition();
  const { reset, handleSubmit, control, watch } = rhf;

  useEffect(() => {
    if (open && item) {
      reset({
        ...item,
        isActive: !!item.isActive, // 👈 ép thành boolean
      });
    }
  }, [open, item]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const onSubmit: SubmitHandler<IAdmin> = (data) => {
    startTransition(async () => {
      try {
        await AdminApis.update(item?.id as any, data);
        showSuccessToast("Thay đổi trạng thái thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Thay đổi trạng thái thất bại");
        console.log("Error", error);
      }
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Thay đổi trạng thái"
      description="Thay đổi trạng thái người dùng"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseSwitchRhf
          name="isActive"
          label="Thay đổi trạng thái"
          control={control}
        />
        <GroupButton
          isloading={isPending}
          submitText="Cập nhật"
          onCancel={() => {
            reset(), setOpen(false);
          }}
        />
      </form>
    </BaseModal>
  );
}
