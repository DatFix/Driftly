import Image from "next/image";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import {
  FacebookIcon,
  FollowIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  SendIcon,
  SettingIcon,
  TiktokIcon,
  TiwtterIcon,
  UpdatedIcon,
  UserGroupIcon,
  UserIcon,
} from "@/components/icons/BaseIcon";
import { ReactNode, useEffect, useState } from "react";
import ProfileSettingModal from "../modal/ProfileSettingModal";
import { IUser } from "@/interfaces/public/IUser.interface";
import { IImage } from "@/interfaces/public/IPost.interface";
import { COVER_ITEMS } from "../modal/ChangeCoverImageModal";
import BaseHoverCard from "@/components/card/advance-card/BaseHoverCard";
import { OthersApis, UserApis } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import BaseConfirmAlert from "@/components/alert/BaseConfirmAlert";

export default function HeaderProfileLayout({
  item,
  totalItems,
}: {
  item: IUser;
  totalItems: number;
}) {
  const [settingModal, setSettingModal] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { user } = useAuth();

  const handleFollow = async () => {
    await UserApis.followToggle(user?.id as string, item.id as string);
  };

  return (
    <div className="w-full bg-(--color-card)">
      <div className="relative">
        <Image
          src={
            COVER_ITEMS[Number(item?.coverPhoto) - 1]?.value ||
            COVER_ITEMS[0]?.value
          }
          alt="bg-image"
          width={1000}
          height={1000}
          unoptimized={true}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 border-4 border-[#f1f1f1] rounded-full">
          <BaseAvatar
            url={(item?.avatar as IImage)?.url}
            name={item?.username}
            size={100}
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 w-full">
        <div className="flex items-center justify-start gap-5 w-1/3">
          <StatisticalItem
            icon={<SendIcon stroke={1.7} width={18} height={18} />}
            label="Bài viết"
            content={totalItems}
          />
          <StatisticalItem
            icon={<UserIcon stroke={1.7} width={18} height={18} />}
            label="Followers"
            content={item.followers?.length || 0}
          />
          <StatisticalItem
            icon={<UserGroupIcon stroke={1.7} width={18} height={18} />}
            label="Following"
            content={item.followings?.length || 0}
          />
        </div>

        <div className="w-1/3 text-center mt-7 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl text-(--color-text)">@{item.username}</p>
            {user?.id === item.id && (
              <button
                className="cursor-pointer"
                onClick={() => setSettingModal(true)}
              >
                <SettingIcon color="var(--color-primary)" />
              </button>
            )}
          </div>

          {item.id !== user?.id &&
            (item.followers?.some((followerId) => followerId === user?.id) ? (
              <button
                onClick={() => setOpenAlert(true)}
                className="px-2 py-0.5 rounded-full bg-(--color-primary) text-[12px] text-white cursor-pointer flex items-center justify-center gap-1"
              >
                <UpdatedIcon color="#FFF" width={16} height={16} /> Đang theo
                dõi
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="px-2 py-0.5 rounded-full bg-(--color-primary) text-[12px] text-white cursor-pointer flex items-center justify-center gap-1"
              >
                <FollowIcon color="#FFF" width={16} height={16} /> Theo dõi
              </button>
            ))}

          <BaseConfirmAlert
            open={openAlert}
            onOpenChange={setOpenAlert}
            onConfirm={handleFollow}
            title="Huỷ theo dõi"
            description={`Bạn có chắc chắn muốn huỷ theo dõi người dùng @${item.username} không?`}
            confirmText="Bỏ theo dõi"
          />
        </div>

        <div className="w-1/3 flex items-center justify-end gap-2">
          <SocialItem
            icon={<FacebookIcon />}
            link={item.socialLinks?.facebook ?? ""}
          />
          <SocialItem
            icon={<InstagramIcon />}
            link={item.socialLinks?.instagram ?? ""}
          />
          <SocialItem
            icon={<TiwtterIcon />}
            link={item.socialLinks?.twitter ?? ""}
          />
          <SocialItem
            icon={<GithubIcon />}
            link={item.socialLinks?.github ?? ""}
          />
          <SocialItem
            icon={<LinkedinIcon />}
            link={item.socialLinks?.linkedin ?? ""}
          />
          <SocialItem
            icon={<TiktokIcon />}
            link={item.socialLinks?.tiktok ?? ""}
          />
        </div>
      </div>

      <ProfileSettingModal
        open={settingModal}
        setOpen={setSettingModal}
        item={item}
      />
    </div>
  );
}

const StatisticalItem = ({
  icon,
  content,
  label,
}: {
  label: string;
  icon: ReactNode;
  content: number;
}) => {
  return (
    <div className="flex flex-col gap-0 items-center justify-center">
      <p className="text-(--color-text) font-medium text-xl">{content}</p>
      <div className="flex items-center justify-center gap-1"> 
        <p className="text-(--color-title) text-[14px]">{label}</p>
        {icon}
      </div>
    </div>
  );
};

const SocialItem = ({ icon, link }: { icon: ReactNode; link: string }) => {
  return (
    <div className="w-fit" hidden={!link}>
      <BaseHoverCard content={<PreviewSocialCard url={link} />}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="text-(--color-text) p-2 w-10 h-10 bg-(--color-dark-light) rounded-full flex items-center justify-center">
            {icon}
          </div>
        </a>
      </BaseHoverCard>
    </div>
  );
};

type PreviewData = {
  title: string;
  description: string;
  image: string | null;
  raw?: any;
};

const PreviewSocialCard = ({ url }: { url: string }) => {
  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (url) {
      const previewSocial = async () => {
        setLoading(true);
        const res = await OthersApis.fetchPreview(url);
        setData(res);
        setLoading(false);
      };
      previewSocial();
    }
  }, [url]);
  if (loading) return <Spinner />;
  if (!data) return null;
  return (
    <div className="flex items-center justify-start gap-2 w-full max-w-[300px]">
      <div className="w-fit">
        <img
          src={data?.image ?? ""}
          alt="image"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-(--color-title) text-sm font-semibold">
          {data.title}
        </p>
        <p className="text-(--color-text) text-[12px] line-clamp-4">
          {data.description}
        </p>
      </div>
    </div>
  );
};
