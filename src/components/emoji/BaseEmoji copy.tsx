import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { ReactNode, useState, useRef, useEffect } from "react";

interface BaseEmojiProps {
  children: ReactNode;
  onEmojiClick?: (emoji: string) => void; // callback để gửi emoji ra ngoài
  isOpen?: boolean; // kiểm soát mở từ cha
  onOpenChange?: (value: boolean) => void; // callback thay đổi trạng thái
}

export default function BaseEmoji({
  children,
  onEmojiClick,
  isOpen = false,
  onOpenChange,
}: BaseEmojiProps) {
  const [open, setOpen] = useState(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Đồng bộ khi prop thay đổi
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // 🔹 Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        onOpenChange?.(false); // báo ngược ra cha
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  // 🔹 Khi click emoji
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiClick?.(emojiData.emoji);
    // ❌ Không tự tắt — để user quyết định
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        onClick={() => {
          const newState = !open;
          setOpen(newState);
          onOpenChange?.(newState); // báo cho cha biết
        }}
      >
        {children}
      </div>

      {open && (
        <div className={`absolute bottom-full left-0 mb-2 z-1000`}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
          />
        </div>
      )}
    </div>
  );
}
