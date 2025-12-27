import { IPopupAction } from "@/components/dropdowns/BaseDropdown";
import { DeleteIcon, EditIcon } from "@/components/icons/BaseIcon";
import { IRole } from "@/interfaces/auth/IRole.interface";

export const getRoleAction = ({
  onEditRole,
  onDeleteRole,
  record,
}: {
  onEditRole: (role: IRole) => void;
  onDeleteRole: (role: IRole) => void;
  record: IRole;
}): IPopupAction[] => [
  {
    label: "Chỉnh sửa",
    icon: <EditIcon stroke={1.5} />,
    onClick: () => onEditRole(record),
  },
  {
    label: "Xoá vai trò",
    icon: <DeleteIcon stroke={1.5} danger />,
    onClick: () => onDeleteRole(record),
    danger: true,
  },
];
