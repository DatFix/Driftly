import BaseModal from "@/components/modals/BaseModal";
import { useEffect, useState, useTransition } from "react";
import GroupButton from "@/components/buttons/group-button/GroupButton";
import { IUser } from "@/interfaces/public/IUser.interface";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { SubmitHandler } from "react-hook-form";
import { upload } from "@/utils/cloudinary";
import ProfileTab, { ProfileTabProps } from "../commons/tab/ProfileTab";
import ProfilePhotoTab from "../sections/tabs/ProfilePhotoTab";
import ProfileAccountTab from "../sections/tabs/ProfileAccountTab";
import ProfileSecurityTab from "../sections/tabs/ProfileSecurityTab";
import { InfoIcon, PhotoIcon, SheidIcon } from "@/components/icons/BaseIcon";
import { UserApis } from "@/api";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { IImage } from "@/interfaces/public/IPost.interface";
import { formatToISOString } from "@/utils/formatToISOString.utils";
import { editUserSession } from "@/actions/auth";
import { useAuth } from "@/context/AuthContext";

const TabItems: ProfileTabProps[] = [
  {
    label: (
      <div className="flex items-center justify-start gap-1">
        <PhotoIcon color="currentColor" /> Hình ảnh
      </div>
    ),
    key: "photo",
  },
  {
    label: (
      <div className="flex items-center justify-start gap-1">
        <InfoIcon color="currentColor" /> Thông tin cá nhân
      </div>
    ),
    key: "account",
  },
  {
    label: (
      <div className="flex items-center justify-start gap-1">
        <SheidIcon color="currentColor" /> Bảo mật
      </div>
    ),
    key: "security",
  },
];

export default function ProfileSettingModal({
  open,
  setOpen,
  item,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: IUser;
}) {
  const [activeTab, setActiveTab] = useState<"photo" | "account" | "security">(
    "photo"
  );
  const rhf = useSimRhf<IUser>();
  const { reset, handleSubmit } = rhf;
  const [isPending, startTransition] = useTransition();
  const { setUser } = useAuth();

  useEffect(() => {
    if (open && item) {
      reset(item);
    }
  }, [open, item]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    startTransition(async () => {
      let uploadedAvatar: string | IImage | undefined;

      if (data.avatar instanceof File) {
        uploadedAvatar = await upload(data.avatar);
      }

      const formatData = {
        ...data,
        avatar: uploadedAvatar || data.avatar,
        birthday: formatToISOString(data?.birthday) as any,
      };

      const res = await UserApis.update(String(item.id), formatData);
      if (res.statusCode === 200) {
        setOpen(false);
        showSuccessToast(res.message);
        setUser?.(res.data);
        editUserSession(res.data);
      } else {
        showErrorToast(res.message);
      }
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      width="3xl"
      title="Chỉnh sửa trang cá nhân"
    >
      <ProfileTab
        items={TabItems}
        value={activeTab}
        onChange={(key) => setActiveTab(key as any)}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[60vh] w-full overflow-y-auto"
      >
        {activeTab === "photo" && <ProfilePhotoTab rhf={rhf} item={item} />}
        {activeTab === "account" && <ProfileAccountTab rhf={rhf} />}
        {activeTab === "security" && <ProfileSecurityTab />}

        <GroupButton
          isloading={isPending}
          submitText="Cập nhật"
          onCancel={() => {
            reset(), setOpen(false);
          }}
        />
      </form>
    </BaseModal>
  );
}
