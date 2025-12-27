import { PostApis } from "@/api";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import GroupButton from "@/components/buttons/group-button/GroupButton";
import { BaseDropdown } from "@/components/dropdowns/BaseDropdown";
import {
  ArrowBottomIcon,
  GlobalIcon,
  LockIcon,
  UserCheckIcon,
} from "@/components/icons/BaseIcon";
import BaseModal from "@/components/modals/BaseModal";
import ShareStatusContent from "@/components/others/share-status/sections/ShareStatusContent";
import { useAuth } from "@/context/AuthContext";
import {
  EPostPrivacy,
  EPostPrivacyVN,
} from "@/context/enums/EPostPrivacy.enum";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IImage, IPost } from "@/interfaces/public/IPost.interface";
import { showSuccessToast } from "@/utils/toast.utils";
import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

interface PrivacyItem {
  key: EPostPrivacy;
  icon: ReactNode;
}

export default function EditPostModal({
  open,
  setOpen,
  item,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: IPost;
}) {
  const { user } = useAuth();
  const rhf = useSimRhf<IPost>();
  const { reset, handleSubmit, setValue } = rhf;
  const [loading, setLoading] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<PrivacyItem>({
    key: item?.privacy ?? EPostPrivacy.PUBLIC,
    icon:
      item?.privacy === EPostPrivacy.PUBLIC ? (
        <GlobalIcon width={18} height={18} />
      ) : item?.privacy === EPostPrivacy.FOLLOWERS ? (
        <UserCheckIcon width={18} height={18} />
      ) : (
        <LockIcon width={18} height={18} />
      ),
  });
  const [openWithEmj, setOpenWithEmj] = useState<boolean>(false);
  const [openWithImages, setOpenWithImages] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item]);

  const onSubmit: SubmitHandler<IPost> = async (data) => {
    try {
      setLoading(true);
      const res = await PostApis.update(item.id as string, data);
      if (res.statusCode === 200) {
        showSuccessToast(res.message);
        setOpen(false);
        reset();
      }
      setLoading(false);
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật bài viết:", error);
    }
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          reset();
        }
      }}
      title="Chỉnh sửa bài viết"
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
          item={item}
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
            setOpen(false);
            reset();
          }}
        />
      </form>
    </BaseModal>
  );
}
