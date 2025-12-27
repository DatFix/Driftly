import { ProtectRoute } from "@/components/others/routes/ProtectRoute";

export default function PostPage() {
  return (
    <ProtectRoute permissions={["post.view"]}>
      <div>PostPage</div>
    </ProtectRoute>
  );
}
