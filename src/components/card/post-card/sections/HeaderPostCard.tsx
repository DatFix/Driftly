import { BaseDropdown } from "@/components/dropdowns/BaseDropdown";
import {
  DeleteIcon,
  EditIcon,
  FollowIcon,
  GlobalIcon,
  LinkIcon,
  LockIcon,
  MoreIcon,
  SendIcon,
  UpdatedIcon,
  UserCheckIcon,
} from "@/components/icons/BaseIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  EPostPrivacy,
  EPostPrivacyVN,
} from "@/context/enums/EPostPrivacy.enum";
import { IImage, IPost } from "@/interfaces/public/IPost.interface";
import { Dot } from "lucide-react";
import BaseHoverCard from "../../advance-card/BaseHoverCard";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import { getFullDay } from "@/utils/getFullDay.utils";
import { useAuth } from "@/context/AuthContext";
import { timeSince } from "@/utils/timeSince.utils";
import { IUser } from "@/interfaces/public/IUser.interface";
import { useRouter } from "next/navigation";
import useEditPost from "../hooks/useEditPost";
import EditPostModal from "../modal/EditPostModal";
import { showSuccessToast } from "@/utils/toast.utils";

export default function HeaderPostCard({ item }: { item: IPost }) {
  const { user } = useAuth();
  const router = useRouter();

  const { editModalOpen, editItem, handleEditOpen, handleEditClose } =
    useEditPost();

  const handleCopyLink = async (content: string) => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${content}`,
    );
    showSuccessToast("Đã sao chép liên kết vào clipboard!");
  };

  return (
    <div className="flex items-center justify-start gap-2 w-full pt-[15px] px-[15px]">
      <div className="flex items-center justify-between w-full">
        <BaseHoverCard
          content={<BaseUserInfoCard item={item} user={user as any} />}
        >
          <div className="flex items-center justify-start gap-2">
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/profile/${item.authorData?.id}`)}
            >
              <BaseAvatar
                url={
                  item.isFake
                    ? (item.authorData?.avatar as any)
                    : (item.authorData?.avatar as IImage)?.url
                }
                name={item.authorData?.username}
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center justify-start">
                <p className="text-(--color-title) font-semibold">
                  {item?.authorData?.username}
                </p>
                {item?.authorData?.followers?.some(
                  (followerId) => followerId === user?.id,
                ) && (
                  <div className="flex items-center justify-center">
                    <Dot className="text-(--color-text)" size={15} />
                    <p className="text-sm text-(--color-primary) font-medium">
                      Đang theo dõi
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-start gap-0">
                <p className="text-(--color-text) text-[12px]">
                  {/* {new Date(item.createdAt ?? "").toLocaleDateString("VN-vi")} */}
                  {timeSince(item.createdAt)}
                </p>

                <Dot className="text-(--color-text)" size={10} />

                <Tooltip>
                  <TooltipTrigger>
                    {item.privacy === EPostPrivacy.PUBLIC ? (
                      <GlobalIcon stroke={1} width={14} height={14} />
                    ) : item.privacy === EPostPrivacy.FOLLOWERS ? (
                      <UserCheckIcon stroke={1} width={14} height={14} />
                    ) : (
                      <LockIcon stroke={1} width={14} height={14} />
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="z-50 text-(--color-text)">
                    {EPostPrivacyVN[item.privacy]}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </BaseHoverCard>

        <BaseDropdown
          className="border border-(--color-dark-light)"
          align="end"
          items={[
            {
              label: "Chỉnh sửa",
              icon: <EditIcon />,
              hidden: user?.id !== item.authorData?.id,
              onClick: handleEditOpen as any,
            },
            {
              label: "Xoá bài viết",
              icon: <DeleteIcon danger />,
              hidden: user?.id !== item.authorData?.id,
              danger: true,
            },
            // {
            //   label: "Huỷ theo dõi",
            //   icon: <UnFollowIcon color="var(--color-primary)" />,
            //   classNameItem: "text-(--color-primary)!",
            // },
            {
              label: "Sao chép liên kết",
              icon: <LinkIcon />,
              hidden: user?.id === item.authorData?.id,
              onClick: () => handleCopyLink(`post/${item.id}`),
            },
            // {
            //   label: "Ẩn bài viết",
            //   icon: <HiddenIcon danger={true} />,
            //   danger: true,
            //   hidden: user?.id === item.authorData?.id,
            // },
          ]}
        >
          <button className="focus:outline-none">
            <MoreIcon />
          </button>
        </BaseDropdown>
      </div>

      <EditPostModal
        open={editModalOpen}
        setOpen={handleEditClose as any}
        item={item}
      />
    </div>
  );
}

const BaseUserInfoCard = ({ item, user }: { item: IPost; user: IUser }) => {
  const router = useRouter();
  return (
    <div className="w-full relative">
      <div className="flex items-start justify-start gap-2 w-full">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/profile/${item.authorData?.id}`)}
        >
          <BaseAvatar
            url={
              item.isFake
                ? (item.authorData?.avatar as any)
                : (item.authorData?.avatar as IImage)?.url
            }
            name={item.authorData?.username}
            size={60}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-start">
            <h3 className="text-(--color-title) capitalize ">
              {item?.authorData?.username}
            </h3>
            {item?.authorData?.followers?.some(
              (followerId) => followerId === user?.id,
            ) && (
              <div className="flex items-center justify-center">
                <Dot className="text-(--color-text)" size={15} />
                <p className="text-[12px] text-(--color-primary) font-medium">
                  Đang theo dõi
                </p>
              </div>
            )}
          </div>

          <div>
            {user?.id === item?.authorData?.id ? (
              <button
                onClick={() => router.push(`/profile/${user?.id}`)}
                className="px-2 py-0.5 text-sm shadow-md cursor-pointer hover:shadow-none text-white bg-(--color-primary) rounded-[3px] w-fit flex items-center justify-center gap-1"
              >
                <UpdatedIcon width={18} height={18} color="#FFF" />
                Trang cá nhân
              </button>
            ) : (
              <div className="flex items-center justify-start gap-1">
                {item?.authorData?.followers?.some(
                  (followerId) => followerId !== user?.id,
                ) && (
                  <button className="px-2 py-0.5 text-sm shadow-md cursor-pointer hover:shadow-none text-white bg-(--color-primary) rounded-[3px] w-fit flex items-center justify-center gap-1">
                    <FollowIcon width={18} height={18} color="#FFF" />
                    Theo dõi
                  </button>
                )}
                <button className="px-2 py-0.5 text-sm shadow-md cursor-pointer hover:shadow-none text-white bg-(--color-primary) rounded-[3px] w-fit flex items-center justify-center gap-1">
                  <SendIcon width={18} height={18} color="#FFF" />
                  Nhắn tin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 w-full max-w-[350px] flex flex-col gap-1">
        {/* <div className="flex items-center justify-start gap-2">
          <RowItem label="Follower" content={100} />
          <RowItem label="Following" content={100} />
          <RowItem label="Like" content={100} />
        </div> */}
        <RowItem label="Tiểu sử:" content={item?.authorData?.bio} />
        <RowItem label="Bài viết:" content={item?.authorData?.posts?.length} />
        <RowItem
          label="Ngày tham gia:"
          content={getFullDay(item?.authorData?.createdAt)}
        />
      </div>
    </div>
  );
};

const RowItem = ({
  label,
  content,
}: {
  label: string;
  content?: string | number;
}) => {
  return (
    <div
      hidden={!content}
      className="text-[12px] flex items-start justify-start gap-1"
    >
      <p className="w-fit font-medium text-(--color-title)">{label}</p>{" "}
      <p className="flex-1 text-(--color-text)">{content}</p>
    </div>
  );
};
