import { IPost } from "@/interfaces/public/IPost.interface";
import { useRouter } from "next/navigation";
import { BgPostContent } from "../commons/BgPostCard";
import NomalPostCard from "../commons/NomalPostCard";
import { useState } from "react";
import { PostApis } from "@/api";

export default function MainPostCard({ item }: { item: IPost }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleViewPost = async () => {
    await PostApis.updateViewCount(item?.id!);
    await router.push(`/post/${item.id}`);
  };

  return (
    <div>
      {!item.bgColor && (
        <div className="my-2 px-[15px]">
          <p
            className={`${
              expanded ? "" : "line-clamp-2"
            } whitespace-pre-line text-sm text-(--color-text)`}
          >
            {item.caption}
          </p>
          {item.caption && item.caption.length > 100 && (
            <button
              className="text-(--color-primary) hover:underline text-sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "thu gọn" : "xem thêm"}
            </button>
          )}

          <NomalPostCard item={item} />
        </div>
      )}

      {item.bgColor && (
        <div onClick={handleViewPost} className="cursor-pointer">
          <BgPostContent item={item} height="40vh" />
        </div>
      )}
    </div>
  );
}
