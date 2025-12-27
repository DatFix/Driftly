"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { PERMISSIONS } from "@/constants/permissons/permissions.constant";
import { IRole } from "@/interfaces/auth/IRole.interface";
import React from "react";

interface AdvancedColumn<T> {
  label: string;
  key: keyof T | "action";
  render?: (item: T) => React.ReactNode;
}

export const getPermissionColumn = (
  onChange: (id: string, updatedPermissions: string[]) => void
): AdvancedColumn<IRole>[] => {
  return [
    {
      label: "Tên Quyền",
      key: "name",
      render: (item: IRole) => (
        <span className="font-semibold">{item.name}</span>
      ),
    },
    {
      label: "Chi tiết quyền",
      key: "permissions",
      render: (item: IRole) => (
        <PermissionGroup item={item} onChange={onChange} />
      ),
    },
  ];
};

const PermissionGroup = ({
  item,
  onChange,
}: {
  item: IRole;
  onChange: (id: string, updated: string[]) => void;
}) => {
  const [selected, setSelected] = React.useState<string[]>(
    item.permissions || []
  );

  const togglePermission = (code: string, checked: boolean) => {
    setSelected((prev) => {
      const updated = checked
        ? [...prev, code]
        : prev.filter((c) => c !== code);
      onChange(item.id!, updated);
      return updated;
    });
  };

  const toggleGroup = (groupCode: string, checked: boolean) => {
    const group = PERMISSIONS.find((g) => g.code === groupCode);
    if (!group) return;
    const childCodes = group.children.map((c) => c.code);

    setSelected((prev) => {
      const updated = checked
        ? Array.from(new Set([...prev, ...childCodes]))
        : prev.filter((c) => !childCodes.includes(c as any));
      onChange(item.id!, updated);
      return updated;
    });
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
