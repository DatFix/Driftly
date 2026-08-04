"use client";

import { PostApis } from "@/api";
import {
  CommentIcon,
  LikeFillIcon,
  LikeOutlineIcon,
  LinkIcon,
} from "@/components/icons/BaseIcon";
import { useAuth } from "@/context/AuthContext";
import { IPost } from "@/interfaces/public/IPost.interface";
import { formatCount } from "@/utils/formatCount.utils";
import { showSuccessToast, showWarningToast } from "@/utils/toast.utils";
import { isFakePostId } from "@/utils/fake-post.util";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function FooterPostCard({ item }: { item: IPost }) {
  const { user } = useAuth();
  const router = useRouter();

  const isFakePost = isFakePostId(String(item.id));

  // Bài thật: nguồn dữ liệu là mảng `likes` (Firestore không lưu likeCount).
  // Bài fake: không có mảng likes thật, chỉ có con số `likeCount` ảo.
  const [likes, setLikes] = useState(item.likes ?? []);
  const [fakeLiked, setFakeLiked] = useState(false);
  const [fakeLikeCount, setFakeLikeCount] = useState(item.likeCount ?? 0);

  useEffect(() => {
    if (isFakePost) {
      setFakeLikeCount(item.likeCount ?? 0);
      setFakeLiked(false);
    } else {
      setLikes(item.likes ?? []);
    }
  }, [item.id, item.likes, item.likeCount, isFakePost]);

  const liked = isFakePost
    ? fakeLiked
    : likes.some((l) => String(l.id) === String(user?.id));
  const likeCount = isFakePost ? fakeLikeCount : likes.length;

  const hanldleLikePost = async () => {
    if (!user) {
      showWarningToast("Đăng nhập để tham gia tương tác với bài viết");
      return;
    }

    const nextLiked = !liked;

    if (isFakePost) {
      setFakeLiked(nextLiked);
      setFakeLikeCount((c) => c + (nextLiked ? 1 : -1));
      const sound = new Audio("/sounds/like-sound.wav");
      sound.play();
      return;
    }

    const prevLikes = likes;
    setLikes(
      nextLiked
        ? [...likes, user]
        : likes.filter((l) => String(l.id) !== String(user.id)),
    );

    try {
      await PostApis.likePost(String(item?.id), String(user?.id));
      const sound = new Audio("/sounds/like-sound.wav");
      sound.play();
    } catch (error) {
      setLikes(prevLikes);
      console.log("Error", error);
    }
  };

  const handleViewPost = async () => {
    await router.push(`/post/${item.id}`);
    if (!user || isFakePost) return;
    await PostApis.updateViewCount(item.id as string);
  };

  return (
    <div className="flex flex-col px-1 md:px-[15px] pt-2.5 pb-2 w-full">
      <div className="flex items-center justify-between mb-2 mx-2 md:mx-0">
        <div className="flex items-center justify-start gap-1">
          <div className="w-6 h-6 rounded-full bg-(--color-primary) flex items-center justify-center">
            <div className="mb-0.5 ml-0.5">
              <LikeFillIcon width={14} height={14} color="#FFF" />
            </div>
          </div>
          <p className="text-sm text-(--color-text)">
            {likeCount === 0
              ? 0
              : liked
                ? likeCount > 1
                  ? `Bạn và ${formatCount(likeCount - 1)} người khác`
                  : "Bạn là người thích đầu tiên"
                : formatCount(likeCount)}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 text-sm text-(--color-text)">
          <p>{item.commentsCount || item.comments?.length || 0} bình luận</p>
          <p>{item.viewsCount} lượt xem</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ActionBtn
          name="Thích"
          icon={
            liked ? (
              <LikeFillIcon
                width={27}
                height={27}
                color="var(--color-primary)"
              />
            ) : (
              <LikeOutlineIcon width={27} height={27} stroke={1.5} />
            )
          }
          onClick={hanldleLikePost}
        />
        <ActionBtn
          name="Bình luận"
          icon={<CommentIcon width={27} height={27} stroke={1.5} />}
          onClick={handleViewPost}
        />
        <ActionBtn
          name="Chia sẻ"
          icon={<LinkIcon width={27} height={27} stroke={1.5} />}
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/post/${item.id}`,
            );
            showSuccessToast("Đã sao chép liên kết bài viết vào clipboard");
          }}
        />
      </div>
    </div>
  );
}

const ActionBtn = ({
  name,
  icon,
  onClick,
}: {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="px-4 py-1 flex items-center justify-center gap-1 w-1/3 hover:bg-(--color-dark-light) rounded-sm cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      {icon}
      <p className="text-(--color-text) text-sm md:text-md">{name}</p>
    </button>
  );
};
