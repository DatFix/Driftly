"use client";
import { PostApis } from "@/api";
import PostCard from "@/components/card/post-card/PostCard";
import PostCardSekeleton from "@/components/skeleton/PostCardSekeleton";
import { useAuth } from "@/context/AuthContext";
import { IPost } from "@/interfaces/public/IPost.interface";
import { useEffect, useState } from "react";
import RightHomeLayout from "../home-page/sections/right-section/RightHomeLayout";

export default function FollowingLayout() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  useEffect(() => {
    async function fetchPostFollowing() {
      if (!user) {
        return;
      }

      const res = await PostApis.getPostsByFollowings(user?.id);
      setPosts(res.data);
    }
    fetchPostFollowing();
  }, []);

  if (posts === null) {
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
        {posts && posts.length > 0
          ? posts.map((item) => <PostCard item={item} key={item.id} />)
          : "Chưa có bài viết nào"}
      </div>
      <div className="h-screen w-1/3">
        <RightHomeLayout />
      </div>
    </div>
  );
}
