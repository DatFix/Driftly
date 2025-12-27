export const generateSlug = (text: string): string => {
  if (!text) return "";

  return text
    .toLowerCase() // chuyển về chữ thường
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xoá dấu tiếng Việt
    .replace(/đ/g, "d") // thay đ → d
    .replace(/[^a-z0-9\s-]/g, "") // xoá ký tự đặc biệt
    .trim() // xoá khoảng trắng đầu/cuối
    .replace(/\s+/g, "-") // thay khoảng trắng → gạch nối
    .replace(/-+/g, "-"); // gộp nhiều gạch nối liền nhau
};
