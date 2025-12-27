import BaseAvatar from "@/components/avatar/BaseAvatar";
import { PhotoIcon, UploadIcon, UserIcon } from "@/components/icons/BaseIcon";
import { BaseUpload } from "@/components/upload/BaseUpload";
import { IUser } from "@/interfaces/public/IUser.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChangeCoverImageModal, {
  COVER_ITEMS,
  CoverItem,
} from "../../modal/ChangeCoverImageModal";
import { IImage } from "@/interfaces/public/IPost.interface";
import ProfileHeading from "../../commons/heading/ProfileHeading";

export default function ProfilePhotoTab({
  rhf,
  item,
}: {
  rhf: SimFormReturn<IUser>;
  item: IUser;
}) {
  const { setValue } = rhf;
  const [preview, setPreview] = useState<string>("");
  const [coverPhoto, setCoverPhoto] = useState<CoverItem | undefined>(
    COVER_ITEMS[Number(item?.coverPhoto) - 1]
  );
  const [changeCover, setChangeCover] = useState<boolean>(false);

  const handleSelectAvatar = async (avatar: File[]) => {
    if (!avatar || avatar.length === 0) return;
    const file = avatar[0];
    const url = URL.createObjectURL(file);
    setValue("avatar", file);
    setPreview(url);
    // URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setValue("coverPhoto", coverPhoto?.key);
  }, [coverPhoto, setValue]);

  return (
    <div>
      <div className="w-full">
        <ProfileHeading icon={<UserIcon />} title="Ảnh đại diện" />

        <div className="flex items-center justify-center w-fit mx-auto relative group">
          <BaseAvatar
            url={preview || (item?.avatar as IImage)?.url}
            name={item?.username}
            size={100}
          />
          <div className="absolute">
            <BaseUpload
              accept="image/*"
              onFileSelect={handleSelectAvatar}
              acceptPreview={false}
            >
              <div className="w-[100px] h-[100px] hidden group-hover:flex bg-black/70 cursor-pointer transition-all duration-200 rounded-full  items-center justify-center">
                <UploadIcon color="#FFF" />
              </div>
            </BaseUpload>
          </div>
        </div>
      </div>

      <div className="w-full">
        <ProfileHeading icon={<PhotoIcon />} title="Ảnh bìa" />
        <div className="mt-3 relative group">
          <Image
            src={coverPhoto?.value}
            alt="bg-image"
            width={1000}
            height={1000}
            className="w-full h-[250px] object-cover"
          />
          <div
            className="absolute top-0 left-0 w-full h-[250px] hidden group-hover:flex bg-black/60 cursor-pointer transition-all duration-200 items-center justify-center"
            onClick={() => setChangeCover(true)}
          >
            <UploadIcon color="#FFF" />
          </div>
        </div>
      </div>

      <ChangeCoverImageModal
        item={item}
        open={changeCover}
        setOpen={setChangeCover}
        setCoverPhoto={setCoverPhoto}
        currentCover={coverPhoto!}
      />
    </div>
  );
}
