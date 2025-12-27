export function getColorByName(name: string): string {
  const colors: Record<string, string> = {
    // 🔹 Chủ đề phổ biến
    "công nghệ": "#3B82F6", // xanh dương
    "đời sống": "#10B981", // xanh lá
    "giải trí": "#F59E0B", // vàng
    "thể thao": "#EF4444", // đỏ
    "du lịch": "#06B6D4", // xanh cyan
    "ẩm thực": "#F97316", // cam
    "giáo dục": "#8B5CF6", // tím
    "kinh tế": "#2563EB", // xanh navy
    "văn hóa": "#A855F7", // tím pastel
    "sức khỏe": "#16A34A", // xanh ngọc
    "thời trang": "#EC4899", // hồng
    "phim ảnh": "#EAB308", // vàng đậm
  };

  // Chuẩn hóa tên
  const lower = name.toLowerCase();

  // Tìm màu tương ứng hoặc trả màu mặc định
  for (const key in colors) {
    if (lower.includes(key)) {
      return colors[key];
    }
  }

  // Màu ngẫu nhiên nhẹ nhàng nếu không khớp
  const fallbackColors = [
    "#94A3B8", "#64748B", "#9CA3AF", "#D1D5DB", "#6B7280",
    "#4B5563", "#F4A261", "#2A9D8F", "#E76F51", "#264653"
  ];
  return fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
}
