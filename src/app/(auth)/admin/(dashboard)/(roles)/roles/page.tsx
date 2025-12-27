import { RoleApis } from "@/api";
import { ProtectRoute } from "@/components/others/routes/ProtectRoute";
import RolesLayout from "@/layouts/auth/admin/dashboard/roles/roles/RolesLayout";

export default async function RolesPage() {
  const res = await RoleApis.getRoles();
  return (
    <ProtectRoute permissions={["role.view"]}>
      <RolesLayout items={res} />
    </ProtectRoute>
  );
}
