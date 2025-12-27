import { IUser } from "@/interfaces/public/IUser.interface";
import BaseAvatar from "../avatar/BaseAvatar";
import BaseHoverCard from "../card/advance-card/BaseHoverCard";
import { useAuth } from "@/context/AuthContext";
import {
  FollowIcon,
  LikeFillIcon,
  SendIcon,
  UpdatedIcon,
} from "../icons/BaseIcon";
import { getFullDay } from "@/utils/getFullDay.utils";
import { IComment } from "@/interfaces/public/IComment.interface";
import { timeSince } from "@/utils/timeSince.utils";
import { IImage } from "@/interfaces/public/IPost.interface";

export default function BaseChatBubbles({
  item,
  align = "left",
  commenter,
}: {
  item: IComment;
  align?: "left" | "right";
  commenter: IUser;
}) {
  return (
    <div
      className={`flex items-end justify-start gap-1 mb-5 ${
        align === "left" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="mb-5">
        <BaseHoverCard content={<BaseUserInfoCard item={commenter as any} />}>
          <div className="cursor-pointer">
            <BaseAvatar
              size={35}
              url={(commenter?.avatar as IImage)?.url}
              name={commenter?.username}
            />
          </div>
        </BaseHoverCard>
      </div>
      <div
        className={`flex flex-col justify-start ${
          align === "left" ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`relative flex items-center ${
            align === "left" ? "justify-start" : " justify-end"
          }`}
        >
          <div className="w-fit px-3 py-3 bg-(--color-dark) rounded-lg text-sm text-(--color-text) whitespace-pre-line">
            {item?.content}
          </div>
          <div
            className={`absolute -bottom-2 w-4 h-4 bg-(--color-dark) ${
              align === "left" ? "left-0" : "right-0"
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
        </div>

        <div
          className={`pl-2 pr-1 gap-2 mt-0.5 w-full flex items-center justify-between ${
            align === "left" ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex items-center justify-start gap-2 ${
              align === "left" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <p className="text-[12px] text-(--color-text)">
              {timeSince(item?.createdAt)}
            </p>
            <button className="text-[12px] text-(--color-text) font-medium">
              Thích
            </button>
            <button className="text-[12px] text-(--color-text) font-medium">
              Trả lời
            </button>
          </div>

          <div className="flex items-center justify-start gap-1 text-[13px] text-(--color-text)">
            {item.likes?.length ?? 0}
            <div className="w-4 h-4 rounded-full bg-(--color-primary) flex items-center justify-center">
              <div className="mb-0.5">
                <LikeFillIcon width={10} height={10} color="#FFF" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BaseUserInfoCard = ({ item }: { item: IUser }) => {
  const { user } = useAuth();
  return (
    <div className="w-full relative max-w-[350px]">
      <div className="flex items-start justify-start gap-2">
        <BaseAvatar
          url={(item?.avatar as IImage)?.url}
          name={item?.username}
          size={60}
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-(--color-title) capitalize">{item?.username}</h3>

          <div>
            {user?.id === item?.id ? (
              <button className="px-2 py-0.5 text-sm shadow-md cursor-pointer hover:shadow-none text-white bg-(--color-primary) rounded-[3px] w-fit flex items-center justify-center gap-1">
                <UpdatedIcon width={18} height={18} color="#FFF" />
                Trang cá nhân
              </button>
            ) : (
              <div className="flex items-center justify-start gap-1">
                <button className="px-2 py-0.5 text-sm shadow-md cursor-pointer hover:shadow-none text-white bg-(--color-primary) rounded-[3px] w-fit flex items-center justify-center gap-1">
                  <FollowIcon width={18} height={18} color="#FFF" />
                  Follow
                </button>
                <button className="px-2 py-0.5 text-sm shadow-md cursor-pointer hover:shadow-none text-white bg-(--color-primary) rounded-[3px] w-fit flex items-center justify-center gap-1">
                  <SendIcon width={18} height={18} color="#FFF" />
                  Nhắn tin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-1 mt-2">
        {/* <div className="flex items-center justify-between gap-2">
          <RowItem label="Follower" content={100} />
          <RowItem label="Following" content={100} />
          <RowItem label="Like" content={100} />
        </div> */}
        <RowItem label="Tiểu sử:" content={item?.bio} />
        <RowItem label="Bài viết:" content={item?.posts?.length} />
        <RowItem label="Ngày tham gia:" content={getFullDay(item?.createdAt)} />
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
