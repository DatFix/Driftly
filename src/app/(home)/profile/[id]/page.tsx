import { UserApis } from "@/api";
import ProfileLayout from "@/layouts/home/profiles/ProfileLayout";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await UserApis.findOneById(id);
  return <ProfileLayout item={res.data} />;
}
