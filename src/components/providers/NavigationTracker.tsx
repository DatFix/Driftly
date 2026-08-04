"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Đánh dấu trong sessionStorage: nếu pathname đã đổi ÍT NHẤT 1 LẦN
// trong session này (tức user đã click qua lại trong app), thì mới
// an toàn để gọi router.back(). Nếu đây là trang ĐẦU TIÊN load trong
// session (ví dụ paste link trực tiếp / mở tab mới), thì back() có thể
// đưa user ra khỏi web hoàn toàn — cần tránh.
export function NavigationTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Trang đầu tiên trong session — chưa có "lịch sử nội bộ" nào cả
      sessionStorage.setItem("hasInternalHistory", "false");
    } else {
      // Pathname đã đổi ít nhất 1 lần → chắc chắn user đang điều hướng
      // trong app, back() giờ an toàn
      sessionStorage.setItem("hasInternalHistory", "true");
    }
  }, [pathname]);

  return <>{children}</>;
}