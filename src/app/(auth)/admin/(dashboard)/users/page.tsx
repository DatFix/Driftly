import { AdminApis } from "@/api";
import { ProtectRoute } from "@/components/others/routes/ProtectRoute";
import UserLayout from "@/layouts/auth/admin/dashboard/users/UserLayout";

export default async function UsersManagerDashboard() {
  const res = await AdminApis.getMulti();
  
  return (
    <ProtectRoute permissions={["user.view"]}>
      <UserLayout items={res.data} />
    </ProtectRoute>
  );
}
