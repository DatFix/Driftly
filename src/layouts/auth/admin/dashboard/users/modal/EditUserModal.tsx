import GroupButton from "@/components/buttons/group-button/GroupButton";
import BaseModal from "@/components/modals/BaseModal";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IUser } from "@/interfaces/public/IUser.interface";
import { useEffect, useTransition } from "react";
import UserFormLayout from "../form/UserFormLayout";
import { SubmitHandler } from "react-hook-form";
import { AdminApis } from "@/api";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";

export default function EditUserModal({
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
  const { reset, handleSubmit, setValue } = rhf;

  useEffect(() => {
    if (open && item) {
      const userWithPassword: IAdmin = {
        ...item,
        password: "••••••••",
      };
      reset(userWithPassword);
    }
  }, [open, item]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const onSubmit: SubmitHandler<IAdmin> = (data) => {
    startTransition(async () => {
      try {
        await AdminApis.update(item?.id as any, data);
        showSuccessToast("Cập nhật người dùng thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Cập nhật người dùng thất bại");
        console.log("Error", error);
      }
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Thêm người dùng"
      description="Tạo mới người dùng"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserFormLayout mode="edit" rhf={rhf} />
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
