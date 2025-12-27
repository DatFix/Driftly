import { IPost } from "@/interfaces/public/IPost.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import BackgroundPost from "./bg-post/BackgroundPost";
import { useEffect, useRef, useState } from "react";
import {
  ColorIcon,
  EmojiSmileIcon,
  HashtagIcon,
  PhotoIcon,
} from "@/components/icons/BaseIcon";
import NomalPost from "./nomal-post/NomalPost";
import BaseEmoji from "@/components/emoji/BaseEmoji";
import ImagePost from "./nomal-post/image-post/ImagePost";
import HashtagModal from "./hashtag/HashtagModal";
import { useWatch } from "react-hook-form";
import { HashtagApis } from "@/api";

export default function ShareStatusContent({
  rhf,
  openEmj,
  openImages,
  onOpenEmojiChange,
  item,
}: {
  rhf: SimFormReturn<IPost>;
  openEmj: boolean;
  openImages: boolean;
  onOpenEmojiChange: (value: boolean) => void;
  item?: IPost;
}) {
  const [postOption, setPostOption] = useState<boolean>(false);
  const [hashtagModal, sethHshtagModal] = useState<boolean>(false);
  const { setValue, getValues } = rhf;
  const btnImgRef = useRef<HTMLButtonElement>(null);
  const btnEmjRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openImages && btnImgRef.current) {
      const timeout = setTimeout(() => {
        btnImgRef.current?.click();
      }, 200); // chờ 200ms cho modal render xong
      return () => clearTimeout(timeout);
    }
  }, [openImages]);

  useEffect(() => {
    if (openEmj && btnEmjRef.current) {
      const timeout = setTimeout(() => {
        btnEmjRef.current?.click();
      }, 200); // chờ 200ms cho modal render xong
      return () => clearTimeout(timeout);
    }
  }, [openEmj]);

  const hashtags = useWatch({
    control: rhf.control,
    name: "hashtags",
  });

  useEffect(() => {
    const convertHashtagIdsToNames = async () => {
      if (!hashtags || hashtags.length === 0) return;

      // Nếu array toàn là string bình thường (đã là name) thì bỏ qua
      const isIdFormat = hashtags.some((tag) => tag.length === 20);
      // Firestore ID thường dài 20 ký tự

      if (!isIdFormat) return;

      const results = await Promise.all(
        hashtags.map((id) => HashtagApis.findOneById(id))
      );

      const names = results
        .map((res) => (res.data ? res.data.name : null))
        .filter(Boolean);

      setValue("hashtags", names as string[]);
    };

    convertHashtagIdsToNames();
  }, [hashtags]);

  return (
    <div className="w-full">
      <div className="overflow-y-auto scroll-smooth scroll-hidden max-h-[calc(60vh)] mt-3">
        {item?.bgColor || postOption ? (
          <BackgroundPost rhf={rhf} item={item} />
        ) : (
          <NomalPost postOption={postOption} rhf={rhf} />
        )}
      </div>

      {hashtags && hashtags?.length > 0 && (
        <div className="text-sm text-(--color-text) flex flex-wrap">
          {hashtags.map((tag) => (
            <span key={tag} className="mr-2 text-(--color-primary) text-lg">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center justify-center gap-2">
          <ImagePost>
            <button
              ref={btnImgRef}
              disabled={postOption}
              type="button"
              className=""
            >
              <PhotoIcon
                width={30}
                height={30}
                stroke={1.5}
                color={`${postOption ? "gray" : "#059669"}`}
              />
            </button>
          </ImagePost>

          <button
            type="button"
            className=" rounded-md cursor-pointer mb-1.5"
            onClick={() => setPostOption(!postOption)}
          >
            <ColorIcon
              width={32}
              height={32}
              stroke={1.5}
              color="var(--color-primary)"
            />
          </button>

          <button
            type="button"
            className=" rounded-md cursor-pointer mb-1.5"
            onClick={() => sethHshtagModal(true)}
          >
            <HashtagIcon width={32} height={32} stroke={1.5} color="#4facfe" />
          </button>
        </div>

        <HashtagModal open={hashtagModal} setOpen={sethHshtagModal} rhf={rhf} />

        <BaseEmoji
          isOpen={openEmj}
          onEmojiClick={(emoji) => {
            const currentText = getValues("caption") || "";
            setValue("caption", currentText + emoji);
          }}
          onOpenChange={onOpenEmojiChange}
        >
          <button
            ref={btnEmjRef}
            type="button"
            className="cursor-pointer rounded-md"
          >
            <EmojiSmileIcon
              stroke={1.5}
              width={32}
              height={32}
              color="#ff5e00"
            />
          </button>
        </BaseEmoji>
      </div>
    </div>
  );
}
