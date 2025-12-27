import { PostApis } from "@/api";
import HashtagLayout from "@/layouts/home/hashtag/HashtagLayout";

export default async function HashtagPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await PostApis.getPostsByHashtag(id);
  return <HashtagLayout items={res.data} />;
}
