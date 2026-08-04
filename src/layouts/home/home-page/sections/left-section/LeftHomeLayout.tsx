"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "@/components/card/post-card/PostCard";
import ShareStatusModal from "@/components/others/share-status/ShareStatusModal";
import { IPost } from "@/interfaces/public/IPost.interface";

interface FakePostsResponse {
  data: IPost[];
  nextPage: number;
  hasMore: boolean;
}

async function fetchFakePosts(page: number): Promise<FakePostsResponse> {
  const res = await fetch(`/api/posts/fake?page=${page}&limit=10`);
  if (!res.ok) throw new Error("Không thể tải thêm bài viết");
  return res.json();
}

export default function LeftHomeLayout({
  items,
  totalItems,
}: {
  items: IPost[]; // bài viết THẬT ban đầu, lấy từ Firestore (SSR)
  totalItems: number;
}) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["fake-posts-feed"],
      queryFn: ({ pageParam }) => fetchFakePosts(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  // Luôn giữ giá trị MỚI NHẤT trong ref — để callback của observer
  // đọc được state hiện tại mà không cần tạo lại observer mỗi lần đổi
  const stateRef = useRef({ hasNextPage, isFetchingNextPage, fetchNextPage });
  useEffect(() => {
    stateRef.current = { hasNextPage, isFetchingNextPage, fetchNextPage };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Chỉ tạo IntersectionObserver ĐÚNG 1 LẦN khi component mount —
  // tránh tình trạng nhiều observer sống song song gọi fetchNextPage
  // chồng chéo nhau (nguyên nhân gây nhảy số trang lộn xộn)
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const { hasNextPage, isFetchingNextPage, fetchNextPage } =
          stateRef.current;
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // mảng rỗng — không phụ thuộc gì, chỉ chạy 1 lần duy nhất

  // Chỉ sort MỘT LẦN cho phần "bài thật + trang giả đầu tiên" — để bài
  // mới nhất (dù thật hay giả) nổi lên đầu như bạn muốn.
  // Các trang giả load thêm SAU đó thì nối thẳng vào cuối, KHÔNG sort lại
  // toàn bộ — vì sort lại mỗi lần sẽ chèn bài mới lộn vào giữa danh sách
  // (do ngày random), khiến bài mới không xuất hiện ở đáy nơi bạn đang
  // cuộn tới, tạo cảm giác "không có gì mới" dù thực ra đã fetch xong.
  const pages = data?.pages ?? [];
  const firstPageFake = pages[0]?.data ?? [];
  const restFakePages = pages.slice(1).flatMap((p) => p.data);

  const initialMerged = [...items, ...firstPageFake].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
  );

  const allPosts = [...initialMerged, ...restFakePages];

  return (
    <div className="w-full">
      <ShareStatusModal />

      <div>
        {allPosts.length > 0 ? (
          allPosts.map((item, index) => (
            <div key={item.id ?? index} className="mb-0.5 md:mb-5">
              <PostCard item={item} />
            </div>
          ))
        ) : (
          <div>Hiện chưa có bài viết nào</div>
        )}
      </div>

      {/* Cột mốc để IntersectionObserver theo dõi — đặt cuối danh sách */}
      <div ref={loadMoreRef} className="py-6 text-center text-sm text-gray-400">
        {isFetchingNextPage ? "Đang tải thêm bài viết..." : ""}
      </div>
    </div>
  );
}