"use client";
import PostCardSekeleton from "@/components/skeleton/PostCardSekeleton";
import { IPost } from "@/interfaces/public/IPost.interface";
import RightHomeLayout from "../home-page/sections/right-section/RightHomeLayout";
import PostCard from "@/components/card/post-card/PostCard";

export default function HashtagLayout({ items }: { items: IPost[] }) {
  if (items === null) {
    return (
      <div className="max-w-7xl mx-auto h-[calc(100vh-8.5rem)] overflow-y-hidden scroll-hidden">
        <div className="w-2/3 flex flex-col gap-5">
          {[...Array(2)].map((_, index) => (
            <PostCardSekeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto flex items-start justify-between gap-5">
      <div className="flex flex-col gap-5 w-2/3">
        {items && items.length > 0
          ? items.map((item) => <PostCard item={item} key={item.id} />)
          : "Chưa có bài viết nào"}
      </div>
      <div className="h-screen w-1/3">
        <RightHomeLayout />
      </div>
    </div>
  );
}
