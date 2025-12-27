import PostCard from "@/components/card/post-card/PostCard";
import ShareStatusModal from "@/components/others/share-status/ShareStatusModal";
import { IPost } from "@/interfaces/public/IPost.interface";

export default function LeftHomeLayout({
  items,
  totalItems,
}: {
  items: IPost[];
  totalItems: number;
}) {
  return (
    <div className="w-full">
      <ShareStatusModal />

      <div className="">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="mb-0.5 md:mb-5">
              <PostCard item={item} />
            </div>
          ))
        ) : (
          <div>Hiện chưa có bài viết nào</div>
        )}
      </div>
    </div>
  );
}
