import BasePopover from "@/components/popover/BasePopover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAction } from "./action";
import BaseTag from "@/components/tags/BaseTag";
import { IRole } from "@/interfaces/auth/IRole.interface";
import { IAdmin } from "@/interfaces/auth/IAdmin.interface";

interface AdvancedColumn<T> {
  label: string;
  // Cho phép key là key của T hoặc string khác (ví dụ "action")
  key: keyof T | "action";
  render?: (item: T) => React.ReactNode;
}

export const getUserColumn = ({
  onEditUser,
  onChangeStatusUser,
}: {
  onEditUser: (user: IAdmin) => void;
  onChangeStatusUser: (user: IAdmin) => void;
}): AdvancedColumn<IAdmin>[] => {
  return [
    {
      label: "Tên người dùng ",
      key: "username",
      render: (item: IAdmin) => (
        <div className="flex justify-start items-center gap-2">
          <Avatar className="w-10 h-10 object-cover">
            <AvatarImage
              src={
                item.avatar && item.avatar?.trim() !== ""
                  ? item.avatar
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>DL</AvatarFallback>
          </Avatar>
          {item.username}
        </div>
      ),
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Vai trò",
      key: "role",
      render: (record: IAdmin & { roleData?: IRole | null }) => (
        <div>{record.roleData?.name || "-"}</div>
      ),
    },
    {
      label: "Trạng thái",
      key: "isActive",
      render: (record: IAdmin) => (
        <BaseTag color={`${record.isActive ? "#059669" : "#EF4444"}`}>
          {record.isActive ? "Hoạt động" : "Vô hiệu hoá"}
        </BaseTag>
      ),
    },
    {
      label: "Hành động",
      key: "action",
      render: (record: IAdmin) => (
        <BasePopover
          actions={getUserAction({
            onEditUser: () => onEditUser(record),
            record,
            onChangeStatusUser: () => onChangeStatusUser(record),
          })}
        />
      ),
    },
  ];
};
