import { RoleApis } from "@/api";
import { ProtectRoute } from "@/components/others/routes/ProtectRoute";
import PermissionsLayout from "@/layouts/auth/admin/dashboard/roles/permissions/PermissionsLayout";

export default async function PermissionsPage() {
  const res = await RoleApis.getRoles();
  return (
    <ProtectRoute permissions={["role.view"]}>
      <PermissionsLayout items={res} />
    </ProtectRoute>
  );
}
