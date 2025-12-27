import BaseModal from "@/components/modals/BaseModal";
import { COVER_IMAGES } from "@/constants/images/images.constant";
import { IUser } from "@/interfaces/public/IUser.interface";
import Image from "next/image";

export type CoverItem = {
  key: number;
  value: any;
};

export const COVER_ITEMS: CoverItem[] = [
  { key: 1, value: COVER_IMAGES.cover_1 },
  { key: 2, value: COVER_IMAGES.cover_2 },
  { key: 3, value: COVER_IMAGES.cover_3 },
  { key: 4, value: COVER_IMAGES.cover_4 },
  { key: 5, value: COVER_IMAGES.cover_5 },
  { key: 6, value: COVER_IMAGES.cover_6 },
  { key: 7, value: COVER_IMAGES.cover_7 },
  { key: 8, value: COVER_IMAGES.cover_8 },
  { key: 9, value: COVER_IMAGES.cover_9 },
  { key: 10, value: COVER_IMAGES.cover_10 },
];

export default function ChangeCoverImageModal({
  open,
  setOpen,
  setCoverPhoto,
  currentCover,
  item,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCoverPhoto: (cover: CoverItem) => void;
  currentCover: CoverItem;
  item: IUser;
}) {
  return (
    <BaseModal
      open={open}
      onOpenChange={setOpen}
      width="2xl"
      visiableBtn={false}
      title=" "
    >
      <div className="flex flex-wrap items-center justify-start">
        {COVER_ITEMS.map((item) => (
          <Image
            key={item.key}
            src={item.value}
            width={1000}
            height={1000}
            alt="cover_photo"
            className={`w-1/4 h-20 p-1 ${
              currentCover.key === item.key
                ? "border-4  border-(--color-primary)"
                : "border-transparent"
            }`}
            onClick={() => setCoverPhoto(item)}
          />
        ))}
      </div>
    </BaseModal>
  );
}
