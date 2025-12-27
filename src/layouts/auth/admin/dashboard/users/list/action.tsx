import { IPopupAction } from "@/components/dropdowns/BaseDropdown";
import { ChangeIcon, EditIcon } from "@/components/icons/BaseIcon";
import { IUser } from "@/interfaces/public/IUser.interface";

export const getUserAction = ({
  onEditUser,
  onChangeStatusUser,
  record,
}: {
  onEditUser: (user: IUser) => void;
  onChangeStatusUser: (user: IUser) => void;
  record: IUser;
}): IPopupAction[] => [
  {
    label: "Chỉnh sửa",
    icon: <EditIcon stroke={1.5} />,
    onClick: () => onEditUser(record),
  },
  {
    label: "Thay đổi trạng thái",
    icon: <ChangeIcon stroke={1.5} />,
    onClick: () => onChangeStatusUser(record),
  },
];
