import { IPost } from "@/interfaces/public/IPost.interface";

// Không cần nhúng data vào URL nữa — bài giả sẽ được tái tạo lại y hệt
// từ chính id (nhờ seed Faker theo id), nên href luôn gọn gàng cho cả 2 loại
export function getPostDetailHref(item: IPost): string {
  return `/post/${item.id}`;
}