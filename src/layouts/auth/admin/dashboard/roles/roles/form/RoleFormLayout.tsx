import BaseTextInputRhf from "@/components/inputs/base-input/BaseTextInputRhf";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";

export default function RoleFormLayout({ rhf }: { rhf: SimFormReturn<IRole> }) {
  const { control } = rhf;
  return (
    <div>
      <BaseTextInputRhf
        label="Tên vai trò"
        name="name"
        control={control}
        required
        placeholder="Tên vai trò"
      />

      <BaseTextInputRhf
        label="Mô tả"
        name="description"
        control={control}
        placeholder="Mô tả"
      />
    </div>
  );
}
