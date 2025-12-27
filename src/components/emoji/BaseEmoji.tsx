import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

interface BaseEmojiProps {
  children: ReactNode;
  onEmojiClick?: (emoji: string) => void; // callback để gửi emoji ra ngoài
  isOpen?: boolean; // kiểm soát mở từ cha
  onOpenChange?: (value: boolean) => void; // callback thay đổi trạng thái
}

export default function BaseEmoji({ children, onEmojiClick }: BaseEmojiProps) {
  const { theme } = useTheme();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiClick?.(emojiData.emoji);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 bg-transparent border-0" align="start">
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
        />
      </PopoverContent>
    </Popover>
  );
}
