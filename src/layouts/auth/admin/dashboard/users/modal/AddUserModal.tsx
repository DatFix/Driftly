"use client";
import { AdminApis } from "@/api";
import GroupButton from "@/components/buttons/group-button/GroupButton";
import BaseModal from "@/components/modals/BaseModal";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { useEffect, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import UserFormLayout from "../form/UserFormLayout";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";

export default function AddUserModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rhf = useSimRhf<IAdmin>();
  const [isPending, startTransition] = useTransition();
  const { reset, handleSubmit } = rhf;

  const onSubmit: SubmitHandler<IAdmin> = (data) => {
    startTransition(async () => {
      try {
        await AdminApis.create(data);
        showSuccessToast("Tạo người dùng thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Tạo người dùng thất bại");
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
      title="Thêm người dùng"
      description="Tạo mới người dùng"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserFormLayout mode="create" rhf={rhf} />
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
