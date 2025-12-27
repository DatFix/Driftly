import GroupButton from "@/components/buttons/group-button/GroupButton";
import BaseModal from "@/components/modals/BaseModal";
import RoleFormLayout from "../form/RoleFormLayout";
import { useEffect, useTransition } from "react";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { SubmitHandler } from "react-hook-form";
import { RoleApis } from "@/api";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";

export default function EditRoleModal({
  item,
  open,
  setOpen,
}: {
  item: IRole;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const rhf = useSimRhf<IRole>();
  const [isPending, startTransition] = useTransition();
  const { reset, handleSubmit } = rhf;

  useEffect(() => {
    if (open && item) {
      async function initialFetch() {
        reset(item);
      }
      initialFetch();
    }
  }, [open, item]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const onSubmit: SubmitHandler<IRole> = (data) => {
    startTransition(async () => {
      try {
        await RoleApis.updateRole(item?.id as any, data);
        showSuccessToast("Cập nhật vai trò thành công");
        setOpen(false);
        reset();
      } catch (error) {
        showErrorToast("Cập nhật vai trò thất bại");
        console.log("Error", error);
      }
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      title="Chỉnh sửa vai trò"
      description="Cập nhật lại vai trò"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <RoleFormLayout rhf={rhf} />
        <GroupButton
          submitText="Cập nhật"
          isloading={isPending}
          onCancel={() => {
            reset(), setOpen(false);
          }}
        />
      </form>
    </BaseModal>
  );
}
