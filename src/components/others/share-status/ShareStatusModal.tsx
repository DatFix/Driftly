"use client";
import BaseCard from "@/components/card/BaseCard";
import { BaseDropdown } from "@/components/dropdowns/BaseDropdown";
import {
  ArrowBottomIcon,
  EmojiSmileIcon,
  GlobalIcon,
  LockIcon,
  PhotoIcon,
  UserCheckIcon,
} from "@/components/icons/BaseIcon";
import BaseModal from "@/components/modals/BaseModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import {
  EPostPrivacy,
  EPostPrivacyVN,
} from "@/context/enums/EPostPrivacy.enum";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import ShareStatusContent from "./sections/ShareStatusContent";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IImage, IPost } from "@/interfaces/public/IPost.interface";
import { SubmitHandler } from "react-hook-form";
import GroupButton from "@/components/buttons/group-button/GroupButton";
import { PostApis, UserApis } from "@/api";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { upload } from "@/utils/cloudinary";
import BaseAvatar from "@/components/avatar/BaseAvatar";

interface PrivacyItem {
  key: EPostPrivacy;
  icon: ReactNode;
}

export default function ShareStatusModal() {
  const rhf = useSimRhf<IPost>();
  const { reset, handleSubmit, setValue } = rhf;
  const { user } = useAuth();
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [openWithEmj, setOpenWithEmj] = useState<boolean>(false);
  const [openWithImages, setOpenWithImages] = useState<boolean>(false);
  const router = useRouter();
  const [privacy, setPrivacy] = useState<PrivacyItem>({
    key: EPostPrivacy.PUBLIC,
    icon: <GlobalIcon width={18} height={18} />,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<IPost> = async (data) => {
    setLoading(true);
    const media = [...(data.images ?? []), ...(data.videos ?? [])] as any;
    const uploads = await Promise.all(media.map(upload));
    const images = uploads.filter((f) => f.type === "image");
    const videos = uploads.filter((f) => f.type === "video");
    const formatData: IPost = {
      ...data,
      author: user?.id ?? "",
      images: images ?? [],
      videos: videos ?? [],
    };

    const res = await PostApis.create(formatData);
    setLoading(false);
    if (res.statusCode === 201) {
      showSuccessToast(res.message);
      reset();
      setOpenPost(false);
    } else {
      showErrorToast(res.message);
    }
  };

  useEffect(() => {
    if (!openPost) reset();
  }, [openPost]);

  if (!user) return;

  return (
    <div className="md:mb-5 mb-0.5">
      <BaseCard radius={5}>
        <div className="flex flex-row items-center justify-between gap-2">
          <div
            className="w-fit md:w-[5%] cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <BaseAvatar
              url={(user?.avatar as IImage)?.url}
              name={user?.username}
            />
          </div>

          <div
            className="flex-1 w-3/5 md:w-full"
            onClick={() => setOpenPost(true)}
          >
            <input
              className="w-full px-5 py-2 rounded-full border border-(--color-dark-light) focus:outline-(--color-primary)! placeholder:text-(--color-text)"
              placeholder={`@${user?.username}, Hãy chia sẻ suy nghĩ của bạn.`}
            />
          </div>

          <div className="w-fit md:w-[8%] flex flec-row items-center justify-end gap-1">
            <button
              className="cursor-pointer"
              onClick={() => {
                setOpenPost(true), setOpenWithImages(true);
              }}
            >
              <PhotoIcon width={28} height={28} stroke={1.5} color="#059669" />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                setOpenPost(true), setOpenWithEmj(true);
              }}
            >
              <EmojiSmileIcon
                width={31}
                height={31}
                stroke={1.5}
                color="#ff5e00"
              />
            </button>
          </div>
        </div>

        <BaseModal
          open={openPost}
          onOpenChange={(value) => {
            setOpenPost(value);
            setOpenWithEmj(value);
            setOpenWithImages(value);
            if (!value) {
              reset();
            } 
          }}
          title="Tạo bài viết"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-row items-center justify-start gap-1">
              <BaseAvatar
                url={(user?.avatar as IImage)?.url}
                name={user?.username}
                size={60}
              />
              <div>
                <p className="text-(--color-text) pl-0.5">{user?.username}</p>
                <BaseDropdown
                  className="border border-(--color-dark-light)"
                  items={[
                    {
                      label: "Công khai",
                      icon: <GlobalIcon stroke={1.5} />,
                      onClick: () => {
                        setPrivacy({
                          key: EPostPrivacy.PUBLIC,
                          icon: <GlobalIcon width={18} height={18} />,
                        }),
                          setValue("privacy", EPostPrivacy.PUBLIC);
                      },
                    },
                    {
                      label: "Chỉ những ai theo dõi bạn",
                      icon: <UserCheckIcon stroke={1.5} />,
                      onClick: () => {
                        setPrivacy({
                          key: EPostPrivacy.FOLLOWERS,
                          icon: <UserCheckIcon width={18} height={18} />,
                        }),
                          setValue("privacy", EPostPrivacy.FOLLOWERS);
                      },
                    },
                    {
                      label: "Chỉ mình tôi",
                      icon: <LockIcon stroke={1.5} />,
                      onClick: () => {
                        setPrivacy({
                          key: EPostPrivacy.PRIVATE,
                          icon: <LockIcon width={18} height={18} />,
                        }),
                          setValue("privacy", EPostPrivacy.PRIVATE);
                      },
                    },
                  ]}
                >
                  <button className="text-(--color-text) flex flex-row gap-1 items-center justify-center text-sm bg-(--color-dark-light) px-2 py-0.5 rounded-md cursor-pointer">
                    {privacy.icon} {EPostPrivacyVN[privacy.key]}
                    <ArrowBottomIcon width={15} height={15} />
                  </button>
                </BaseDropdown>
              </div>
            </div>

            <ShareStatusContent
              rhf={rhf}
              openImages={openWithImages}
              openEmj={openWithEmj}
              onOpenEmojiChange={(value) => setOpenWithEmj(value)}
            />
            <GroupButton
              disable={loading}
              submitText="Đăng"
              isloading={loading}
              onCancel={() => {
                reset(), setOpenPost(false), setOpenWithEmj(false);
                setOpenWithImages(false);
              }}
            />
          </form>
        </BaseModal>
      </BaseCard>
    </div>
  );
}
