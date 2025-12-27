"use client";
import { useAuth } from "@/context/AuthContext";
import { useUserStore } from "@/stores/useUserStore";
import { showSuccessToast } from "@/utils/toast.utils";
import { useRouter } from "next/navigation";
import HeaderProfileLayout from "./sections/HeaderProfileLayout";
import MainProfileLayout from "./sections/MainProfileLayout";
import { IUser } from "@/interfaces/public/IUser.interface";
import { useEffect, useState } from "react";
import { IPost } from "@/interfaces/public/IPost.interface";
import { PostApis } from "@/api";
import PostCardSekeleton from "@/components/skeleton/PostCardSekeleton";

export default function ProfileLayout({ item }: { item: IUser }) {
  const { userLogout, user } = useAuth();
  const { clearUserData } = useUserStore();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [toalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    if (item) {
      async function fetchPosts() {
        const res = await PostApis.getMultiByAuthor(
          String(item?.id),
          String(user?.id)
        );
        setPosts(res.data);
        setTotalPosts(res.totalItems);
      }
      fetchPosts();
    }
  }, [item]);

  const router = useRouter();
  const handleLogout = async () => {
    await userLogout();
    clearUserData();
    router.refresh();
    showSuccessToast("Đăng xuất thành công!");
  };

  if (!item || !posts || !user)
    return (
      <div className="max-w-7xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col items-start justify-start overflow-y-hidden scroll-hidden relative">
        <div className="relative w-full">
          <div className="w-full bg-(--color-dark-light) h-80 animate-pulse"></div>
          <div className="w-28 h-28 bg-(--color-tooltip) rounded-full absolute top-64 left-1/2 -translate-x-1/2 z-50 border-4 border-(--color-dark-light)"></div>
        </div>

        <div className="flex items-center justify-between h-20 w-full">
          <div className="flex items-center justify-start gap-5 w-1/3 animate-pulse">
            <div className="w-24 h-5 bg-(--color-dark-light) animate-pulse"></div>
            <div className="w-24 h-5 bg-(--color-dark-light) animate-pulse"></div>
            <div className="w-24 h-5 bg-(--color-dark-light) animate-pulse"></div>
          </div>

          <div className="w-1/3 flex items-center justify-center mt-14">
            <div className="w-32 h-5 bg-(--color-dark-light) animate-pulse "></div>
          </div>

          <div className="flex items-center justify-end gap-5 w-1/3">
            <div className="w-10 h-10 bg-(--color-dark-light) animate-pulse rounded-full"></div>
            <div className="w-10 h-10 bg-(--color-dark-light) animate-pulse rounded-full"></div>
            <div className="w-10 h-10 bg-(--color-dark-light) animate-pulse rounded-full"></div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-5 w-full mt-5">
          <div className="p-5 bg-(--color-dark-light) w-1/3">
            <div className="flex flex-col items-start justify-start gap-1 mb-3">
              <div className="w-20 h-5 bg-(--color-dark-light)"></div>
              <div className="flex flex-col items-start justify-start gap-1 w-full">
                <div className="w-full bg-(--color-dark-light) h-3"></div>
                <div className="w-32 bg-(--color-dark-light) h-3"></div>
              </div>
            </div>
            <div className="flex items-start justify-start mt-2 gap-2">
              <div className="w-5 h-5 bg-(--color-dark-light)"></div>
              <div className="w-24 h-5 bg-(--color-dark-light)"></div>
            </div>
            <div className="flex items-start justify-start mt-2 gap-2">
              <div className="w-5 h-5 bg-(--color-dark-light)"></div>
              <div className="w-10 h-5 bg-(--color-dark-light)"></div>
            </div>
            <div className="flex items-start justify-start mt-2 gap-2">
              <div className="w-5 h-5 bg-(--color-dark-light)"></div>
              <div className="w-16 h-5 bg-(--color-dark-light)"></div>
            </div>
            <div className="flex items-start justify-start mt-2 gap-2">
              <div className="w-5 h-5 bg-(--color-dark-light)"></div>
              <div className="w-32 h-5 bg-(--color-dark-light)"></div>
            </div>
            <div className="flex items-start justify-start mt-2 gap-2">
              <div className="w-5 h-5 bg-(--color-dark-light)"></div>
              <div className="w-14 h-5 bg-(--color-dark-light)"></div>
            </div>
          </div>
          <div className="w-2/3">
            <PostCardSekeleton />
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <HeaderProfileLayout item={item} totalItems={toalPosts} />
      <MainProfileLayout item={item} posts={posts} />
    </div>
  );
}
