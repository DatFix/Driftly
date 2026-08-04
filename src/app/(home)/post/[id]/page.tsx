import { PostApis } from "@/api";
import PostDetailsLayout from "@/layouts/home/home-page/post-details/PostDetailsLayout";
import { generateFakePost, isFakePostId } from "@/utils/fake-post.util";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // id dạng UUID (có dấu "-") → chắc chắn là bài giả, tái tạo lại từ id
  // (Firestore không bao giờ sinh id theo định dạng UUID có dấu "-")
  if (isFakePostId(id)) {
    const fakePost = generateFakePost(id);
    return <PostDetailsLayout item={fakePost} />;
  }

  const res = await PostApis.findOneById(id);
  return <PostDetailsLayout item={res.data} />;
}