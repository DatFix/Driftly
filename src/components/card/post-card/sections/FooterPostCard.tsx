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
import { showWarningToast } from "@/utils/toast.utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function FooterPostCard({ item }: { item: IPost }) {
  const { user } = useAuth();
  const router = useRouter();

  const hanldleLikePost = async () => {
    if (!user) {
      showWarningToast("Đăng nhập để tham gia tương tác với bài viết");
      return;
    }
    try {
      await PostApis.likePost(String(item?.id), String(user?.id));
      const sound = new Audio("/sounds/like-sound.wav");
      sound.play();
      console.log("Like thành công bài viết", item?.id);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleViewPost = async () => {
    await router.push(`/post/${item.id}`);
    if (!user) return;
    await PostApis.updateViewCount(item?.id!);
  };

  const liked = item.likes?.some((l) => l.id === user?.id);

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
            {item.likeCount === 0
              ? liked && item.likes
                ? item.likes?.length > 1
                  ? item.likes.includes(user?.id as any)
                    ? `Bạn và ${formatCount(
                        (item.likes?.length as any) - 1
                      )} người khác`
                    : formatCount(item.likes?.length) ?? 0
                  : "Bạn là người thích đầu tiên"
                : formatCount(item.likes?.length) ?? 0
              : formatCount(item.likeCount)}
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
