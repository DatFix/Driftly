import { PostApis } from "@/api";
import PostDetailsLayout from "@/layouts/home/home-page/post-details/PostDetailsLayout";

export default async function PostDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await PostApis.findOneById(id);
  return <PostDetailsLayout item={res.data} />;
}
