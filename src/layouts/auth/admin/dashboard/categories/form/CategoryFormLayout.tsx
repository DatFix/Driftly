import { CategoryApis } from "@/api";
import BaseTextInputRhf from "@/components/inputs/base-input/BaseTextInputRhf";
import BaseSelectMultiRhf from "@/components/inputs/base-select-multi/BaseSelectMultiRhf";
import { BaseSelectOption } from "@/components/inputs/base-select/BaseSelect";
import { BaseSwitchRhf } from "@/components/switch/BaseSwitchRhf";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import { useEffect, useState } from "react";

export default function CategoryFormLayout({
  rhf,
}: {
  rhf: SimFormReturn<ICategory>;
}) {
  const { control, watch } = rhf;
  const [categoryOptions, setCategoryOptions] = useState<BaseSelectOption[]>(
    []
  );

  useEffect(() => {
    const mapToOptions = (items: { id: string; name: string }[]) => {
      return items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    };

    const fetchData = async () => {
      const res = await CategoryApis.getMulti();
      setCategoryOptions(mapToOptions(res as any));
    };
    fetchData();
  }, []);

  return (
    <div>
      <BaseTextInputRhf
        label="Tên danh mục"
        name="name"
        control={control}
        required
        placeholder="Tên danh mục"
      />

      <div className="my-5">
        <BaseSwitchRhf
          name="isActive"
          label="Danh mục chính"
          control={control}
        />
      </div>

      <BaseTextInputRhf
        label="Mô tả"
        name="description"
        control={control}
        placeholder="Mô tả"
      />

      <BaseSelectMultiRhf
        name="children"
        label="Danh mục"
        control={control}
        placeholder="Chọn danh mục..."
        options={categoryOptions}
        required
      />
    </div>
  );
}
