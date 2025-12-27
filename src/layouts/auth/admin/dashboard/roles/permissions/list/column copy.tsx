import { Checkbox } from "@/components/ui/checkbox";
import { PERMISSIONS } from "@/constants/permissons/permissions.constant";
import {
  IPermission,
  IPermissionItem,
} from "@/interfaces/auth/IPermission.interface";
import React, { useState } from "react";

interface AdvancedColumn<T> {
  label: string;
  key?: keyof T & string;
  render?: (item: T) => React.ReactNode;
}

export const getPermissionColumn = (): AdvancedColumn<IPermission>[] => {
  return [
    {
      label: "Tên Quyền",
      key: "name",
      render: (item: IPermission) => (
        <span className="font-semibold">{item.name}</span>
      ),
    },
    {
      label: "Chi tiết quyền",
      render: (item: IPermission) => <PermissionGroup item={item} />,
    },
  ];
};

// 👇 Tách phần render group ra riêng cho dễ quản lý
const PermissionGroup = ({ item }: { item: IPermission }) => {
  const [selected, setSelected] = useState<string[]>(
    item.items?.map((p) => p.code) || []
  );

  const togglePermission = (code: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, code] : prev.filter((c) => c !== code)
    );
  };

  const toggleGroup = (groupCode: string, checked: boolean) => {
    const group = PERMISSIONS.find((g) => g.code === groupCode);
    if (!group) return;
    const childCodes = group.children.map((c) => c.code);
    setSelected(
      (prev) =>
        checked
          ? Array.from(new Set([...prev, ...childCodes])) // chọn hết
          : prev.filter((c) => !childCodes.includes(c as any)) // bỏ hết
    );
  };

  return (
    <div className="flex gap-2">
      {PERMISSIONS.map((group) => {
        const childCodes = group.children.map((c) => c.code);
        const allChecked = childCodes.every((c) => selected.includes(c));
        const someChecked =
          !allChecked && childCodes.some((c) => selected.includes(c));

        return (
          <div
            key={group.code}
            className="flex flex-col items-start justify-start gap-3 max-w-40"
          >
            <div className="font-medium mb-1 w-24 flex items-center gap-2 text-(--color-primary)">
              {/* ✅ Checkbox All cho group */}
              <Checkbox
                checked={allChecked}
                onCheckedChange={(value) => toggleGroup(group.code, !!value)}
              />
              {group.name}
            </div>

            <div className="flex flex-wrap gap-4">
              {group.children.map((child) => {
                const checked = selected.includes(child.code);
                return (
                  <div key={child.code} className="flex items-center gap-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        togglePermission(child.code, !!value)
                      }
                    />
                    <span>{child.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
