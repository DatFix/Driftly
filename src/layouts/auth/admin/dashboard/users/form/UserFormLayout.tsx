import { RoleApis } from "@/api";
import BaseTextInputRhf from "@/components/inputs/base-input/BaseTextInputRhf";
import { BaseSelectOption } from "@/components/inputs/base-select/BaseSelect";
import BaseSelectRhf from "@/components/inputs/base-select/BaseSelectRhf";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";
import { IUser } from "@/interfaces/public/IUser.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import { useEffect, useState } from "react";

export default function UserFormLayout({
  rhf,
  mode,
}: {
  rhf: SimFormReturn<IAdmin>;
  mode: "edit" | "create";
}) {
  const [roleOtions, setRoleOptions] = useState<BaseSelectOption[]>([]);
  const { control } = rhf;

  useEffect(() => {
    const mapToOptions = (items: { id: string; name: string }[]) => {
      return items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    };

    const fetchData = async () => {
      const res = await RoleApis.getMulti();
      setRoleOptions(mapToOptions(res as any));
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-y-0">
      <BaseTextInputRhf
        label="Tên người dùng"
        name="username"
        control={control}
        required
        placeholder="Tên người dùng"
      />

      <BaseTextInputRhf
        label="Email"
        name="email"
        required
        control={control}
        placeholder="Email"
        disabled={mode === "edit"}
      />

      <BaseTextInputRhf
        disabled={mode === "edit"}
        label="Mật khẩu"
        name="password"
        control={control}
        placeholder="Mật khẩu"
        required
        type="password"
      />

      <BaseSelectRhf
        control={control}
        name="role"
        options={roleOtions}
        label="Vai trò"
        placeholder="Vai trò"
        required
      />
    </div>
  );
}
