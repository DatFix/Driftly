import BasePopover from "@/components/popover/BasePopover";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { getRoleAction } from "./action";

interface AdvancedColumn<T> {
  label: string;
  // Cho phép key là key của T hoặc string khác (ví dụ "action")
  key: keyof T | "action";
  render?: (item: T) => React.ReactNode;
}

export const getRoleColumn = ({
  onEditRole,
  onDeleteRole,
}: {
  onEditRole: (role: IRole) => void;
  onDeleteRole: (role: IRole) => void;
}): AdvancedColumn<IRole>[] => {
  return [
    {
      label: "Tên vai trò",
      key: "name",
    },
    {
      label: "Mô tả",
      key: "description",
    },
    {
      label: "Hành động",
      key: "action",
      render: (record: IRole) => (
        <BasePopover
          actions={getRoleAction({
            onEditRole: () => onEditRole(record),
            record,
            onDeleteRole: () => onDeleteRole(record),
          })}
        />
      ),
    },
  ];
};
