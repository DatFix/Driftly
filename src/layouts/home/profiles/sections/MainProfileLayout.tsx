import BaseCard from "@/components/card/BaseCard";
import PostCard from "@/components/card/post-card/PostCard";
import {
  BirthdayIcon,
  CalenderIcon,
  ComputerIcon,
  GenderIcon,
  GlobalIcon,
  LocationIcon,
} from "@/components/icons/BaseIcon";
import ShareStatusModal from "@/components/others/share-status/ShareStatusModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { IPost } from "@/interfaces/public/IPost.interface";
import { IUser } from "@/interfaces/public/IUser.interface";
import { EGenderVN } from "@/types/gender.type";
import { getFullDay } from "@/utils/getFullDay.utils";
import { ReactNode } from "react";

export default function MainProfileLayout({
  item,
  posts,
}: {
  item: IUser;
  posts: IPost[];
}) {
  const { user } = useAuth();

  return (
    <div className="w-full flex items-start justify-between gap-2 mt-5">
      <div className="w-1/3">
        <BaseCard radius={5}>
          <div>
            <h5 className="text-(--color-title)">Giới thiệu</h5>
            <p className="text-sm text-(--color-text)">
              {item?.bio ?? "Chưa có tiểu sử"}
            </p>

            <div className="mt-3 flex flex-col gap-4">
              <BioRowItem
                icon={<BirthdayIcon stroke={1.5} width={22} height={22} />}
                label="Ngày sinh"
                content={getFullDay(item.birthday)}
              />
              <BioRowItem
                icon={<GenderIcon stroke={1.5} width={22} height={22} />}
                label="Giới tính"
                content={EGenderVN[item?.gender!]}
              />
              <BioRowItem
                icon={<ComputerIcon stroke={1.5} width={22} height={22} />}
                label="Website"
                content={item?.website ?? ""}
              />
              <BioRowItem
                icon={<LocationIcon stroke={1.5} width={22} height={22} />}
                label="Nơi sinh sống"
                content={item?.location!}
              />
              <BioRowItem
                icon={<GlobalIcon stroke={1.5} width={22} height={22} />}
                label="Trang web cá nhân"
                content={item?.website!}
              />
              <BioRowItem
                icon={<CalenderIcon stroke={1.5} width={22} height={22} />}
                label="Ngày tham gia"
                content={getFullDay(item.createdAt)}
              />
            </div>
          </div>
        </BaseCard>
      </div>
      <div className="w-2/3">
        {user?.id === item.id && <ShareStatusModal />}

        <div className="flex flex-col gap-5">
          {posts && posts.length > 0 ? (
            posts.map((item) => <PostCard item={item} key={item.id} />)
          ) : (
            <p className="text-(--color-text) mt-5">Chưa có bài viết nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const BioRowItem = ({
  icon,
  label,
  content,
}: {
  icon: ReactNode;
  label: string;
  content: string;
}) => {
  if (!content) {
    return;
  }
  return (
    <div className="flex items-center justify-start gap-1">
      <Tooltip>
        <TooltipTrigger>{icon}</TooltipTrigger>
        <TooltipContent className="z-50">
          <p className="text-sm text-(--color-text)">{label}</p>
        </TooltipContent>
      </Tooltip>

      <p className="text-sm text-(--color-text)"> {content}</p>
    </div>
  );
};
