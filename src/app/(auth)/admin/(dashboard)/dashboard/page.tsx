import { ProtectRoute } from "@/components/others/routes/ProtectRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectRoute permissions={["dashboard.view"]}>
      <div>This is Admin Dashboard Page</div>
    </ProtectRoute>
  );
}
