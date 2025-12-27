import BaseTab, { BaseTabProps } from "@/components/tabs/BaseTab";
import { usePathname } from "next/navigation";

export default function RolePermissonTab() {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[2];
  const items: BaseTabProps[] = [
    { key: "roles", label: "Vai trò", link: "/admin/roles" },
    { key: "permissions", label: "Quyền hạn", link: "/admin/permissions" },
  ];
  return (
    <div>
      <BaseTab tabKey={activeTab} items={items} />
    </div>
  );
}
