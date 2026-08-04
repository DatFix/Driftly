"use client";
import { BgPostContent } from "@/components/card/post-card/commons/BgPostCard";
import CommentBox from "@/components/card/post-card/commons/CommentBox";
import FooterPostCard from "@/components/card/post-card/sections/FooterPostCard";
import HeaderPostCard from "@/components/card/post-card/sections/HeaderPostCard";
import BaseChatBubbles from "@/components/chat/BaseChatBubbles";
import {
  CloseIcon,
  CommentIcon,
  ZoomIcon,
  ZoomOutIcon,
} from "@/components/icons/BaseIcon";
import { IPost } from "@/interfaces/public/IPost.interface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoBrand from "../../nav/commons/LogoBrand";
import { useAuth } from "@/context/AuthContext";

export default function PostDetailsLayout({ item }: { item: IPost }) {
  const files = [...(item.images ?? []), ...(item.videos ?? [])];
  const [index, setIndex] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleBack = () => {
    const hasInternalHistory =
      sessionStorage.getItem("hasInternalHistory") === "true";

    if (hasInternalHistory) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (!item) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-2 bg-(--color-background) z-10">
        <p className="text-lg font-medium text-(--color-text)">
          Không tìm thấy bài viết
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto md:overflow-hidden md:flex-row items-start justify-between gap-0 md:gap-5 mx-auto fixed inset-0 bg-(--color-background) z-10 transition-opacity duration-600">
      <div
        className={`bg-(--color-card) md:bg-(--color-background) md:h-screen transition-all duration-500 ${
          openDrawer ? "w-full md:w-[calc(100vw-500px)] " : "w-screen"
        }`}
      >
        <div className="hidden md:block">
          <button
            className="fixed top-5 left-5 cursor-pointer z-70"
            onClick={handleBack}
          >
            <CloseIcon width={40} height={40} />
          </button>
        </div>

        <div className="sticky top-0 left-0 bg-(--color-card) z-9999 pb-2 flex items-center justify-start md:hidden">
          <button className="w-fit cursor-pointer mt-4" onClick={handleBack}>
            <ChevronLeft
              width={40}
              height={40}
              strokeWidth={1}
              className="text-(--color-text)"
            />
          </button>
          <HeaderPostCard item={item} />
        </div>

        <div className="w-full md:max-w-5xl bg-(--color-card) md:h-screen mx-auto flex flex-col items-center justify-center">
          <div className="block md:hidden w-full">
            <p
              className={`whitespace-pre-line text-(--color-text) text-sm mt-2 mb-1 px-[15px] ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {item.caption}
            </p>
            {item.caption && item.caption.length > 100 && (
              <button
                className="text-(--color-primary) hover:underline text-sm px-[15px]"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "thu gọn" : "xem thêm"}
              </button>
            )}
          </div>
          {item.bgColor && <BgPostContent height="60vh" item={item} />}
          {!item.bgColor &&
          ((item.images && item.images?.length > 0) ||
            (item.videos && item.videos?.length > 0)) ? (
            <div className="w-full h-auto md:h-screen relative">
              <button
                disabled={index === 0}
                hidden={files.length === 1}
                className="hidden md:block absolute top-[50%] left-[1%] bg-(--color-card) border border-(--color-dark-light) rounded-full p-2 cursor-pointer disabled:opacity-0"
                onClick={() => setIndex(index - 1)}
              >
                <ChevronLeft className="text-(--color-text)" />
              </button>
              <div className="hidden md:block">
                {renderMedia(files?.[index])}
              </div>
              <div className="md:hidden flex flex-col gap-2">
                {files && files.map((item) => renderMedia(item))}
              </div>
              <button
                disabled={files.length === index + 1}
                hidden={files.length === 1}
                className="hidden md:block absolute top-[50%] right-[1%] bg-(--color-card) border border-(--color-dark-light) rounded-full p-2 cursor-pointer disabled:opacity-0"
                onClick={() => setIndex(index + 1)}
              >
                <ChevronRight className="text-(--color-text)" />
              </button>
            </div>
          ) : (
            <div hidden={!!item.bgColor} className="hidden md:block">
              <LogoBrand clickEnable={false} width={60} height={60} />
            </div>
          )}
        </div>
      </div>

      <div
        className={`relative h-screen bg-(--color-card) transition-all duration-500 ease-in-out transform ${
          openDrawer
            ? "translate-x-0 opacity-100 w-full md:w-[500px]"
            : "translate-x-full opacity-0 w-0"
        }`}
      >
        <div
          className={`${
            openDrawer ? "opacity-100" : "opacity-0"
          } h-[calc(100vh-12rem)] overflow-y-auto`}
        >
          <div className="hidden md:block">
            <HeaderPostCard item={item} />
            <p
              className={`whitespace-pre-line text-(--color-text) text-sm mt-3 px-[15px] ${
                expanded ? "" : "line-clamp-2"
              }`}
            >
              {item.caption}
            </p>
            {item.caption && item.caption.length > 100 && (
              <button
                className="text-(--color-primary) hover:underline text-sm px-[15px]"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "thu gọn" : "xem thêm"}
              </button>
            )}
            {/* {item.caption && item.caption.length > 200 && (
             
            )} */}
          </div>
          <FooterPostCard item={item} />

          {/* show comments heheh */}
          <div className="flex flex-col px-[15px] my-10">
            {item.comments && item.comments?.length > 0 ? (
              item.comments.map((c) => (
                <BaseChatBubbles key={c.id} item={c} commenter={c.commenter} />
              ))
            ) : (
              <div className="text-center flex flex-col items-center justify-center text-sm text-(--color-text)">
                <CommentIcon stroke={1} width={50} height={50} />
                <p>Chưa có bình luận nào!</p>
                <p>Bạn hãy trở thành người bình luận đầu tiên</p>
              </div>
            )}
          </div>

          {user && <CommentBox postId={item.id!} />}
        </div>
      </div>

      <button
        className={`absolute top-5 cursor-pointer transition-all duration-500 ${
          openDrawer ? "right-[520px]" : "right-5"
        }`}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        {openDrawer ? (
          <ZoomIcon width={30} height={30} stroke={1} />
        ) : (
          <ZoomOutIcon width={30} height={30} stroke={1} />
        )}
      </button>
    </div>
  );
}

const renderMedia = (item: { url: string; type: string; id: string }) => {
  if (item.type === "video") {
    return (
      <video
        key={item.id}
        src={item.url}
        controls
        className="object-contain h-auto md:h-screen w-full"
      />
    );
  }
  return (
    <Image
      key={item.id}
      src={item.url}
      width={1000}
      height={1000}
      alt="image"
      className="object-contain h-auto md:h-screen w-full"
      objectFit="contain"
    />
  );
};
