import { CategoryApis } from "@/api";
import { ProtectRoute } from "@/components/others/routes/ProtectRoute";
import CategoryLayout from "@/layouts/auth/admin/dashboard/categories/CategoryLayout";

export default async function CategoryPage() {
  const res = await CategoryApis.getMulti();
  return (
    <ProtectRoute permissions={["category.view"]}>
      <CategoryLayout items={res} />
    </ProtectRoute>
  );
}
