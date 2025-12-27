import GroupButton from "@/components/buttons/group-button/GroupButton";
import BaseModal from "@/components/modals/BaseModal";
import RoleFormLayout from "../form/RoleFormLayout";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { useEffect, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import { RoleApis } from "@/api";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";

export default function AddRoleModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rhf = useSimRhf<IRole>();
  const [isPending, startTransition] = useTransition();
  const { reset, handleSubmit } = rhf;

  const onSubmit: SubmitHandler<IRole> = (data) => {
    startTransition(async () => {
      try {
        await RoleApis.createRole(data);
        showSuccessToast("Tạo vai trò thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Tạo vai trò thất bại");
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
      title="Thêm vai trò"
      description="Tạo mới vai trò"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <RoleFormLayout rhf={rhf} />
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
