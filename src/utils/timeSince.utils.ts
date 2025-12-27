export function timeSince(dateString: string | Date | any): string {
  const now = new Date();
  const past = new Date(dateString);
  const diff = now.getTime() - past.getTime(); // chênh lệch ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days === 1) return "hôm qua";

  // Hiển thị định dạng ngày nếu > 1 ngày
  return past.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
