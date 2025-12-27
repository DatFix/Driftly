import { HashtagApis } from "@/api";
import BaseModal from "@/components/modals/BaseModal";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IHashtag } from "@/interfaces/public/IHashtag.interface";
import { IPost } from "@/interfaces/public/IPost.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const SUGGESTED = ["viral", "like", "trending", "fyp", "xuhuong", "love"];

export default function HashtagModal({
  open,
  setOpen,
  rhf,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  rhf: SimFormReturn<IPost>;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [suggested, setSuggested] = useState<IHashtag[]>([]);

  useEffect(() => {
    if (open) {
      async function fetchSuggested() {
        const res = await HashtagApis.getMulti();
        setSuggested(res.data);
      }
      fetchSuggested();
    }
  }, [open]);

  // Load data từ form khi mở modal
  useEffect(() => {
    const current = rhf.getValues("hashtags") || [];
    setSelected(current);
  }, [open]);

  const toggleHashtag = (tag: string) => {
    let updated: string[];

    if (selected.includes(tag)) {
      updated = selected.filter((t) => t !== tag);
    } else {
      updated = [...selected, tag];
    }

    setSelected(updated);
    rhf.setValue("hashtags", updated, { shouldDirty: true });
  };

  // Tạo hashtag mới nếu nhấn Enter
  const handleCreateNew = () => {
    let tag = query.trim().toLowerCase();

    if (!tag) return;

    // Loại bỏ ký tự đặc biệt
    tag = tag.replace(/[^a-zA-Z0-9_]/g, "");

    if (!tag) return;

    if (!selected.includes(tag)) {
      toggleHashtag(tag);
    }

    setQuery(""); // clear input
  };

  return (
    <BaseModal open={open} onOpenChange={setOpen} title="Hashtag">
      {/* Danh sách hashtag đã chọn */}
      <div className="flex flex-wrap gap-2 mb-3">
        {selected.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 text-[12px] bg-(--color-primary) text-white rounded-full cursor-pointer"
            onClick={() => toggleHashtag(tag)}
          >
            #{tag} ✕
          </span>
        ))}

        {selected.length === 0 && (
          <p className="text-sm text-(--color-text)">Chưa chọn hashtag nào</p>
        )}
      </div>

      <Command>
        <CommandInput
          placeholder="Nhập hoặc tìm hashtag..."
          value={query}
          onValueChange={setQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCreateNew();
            }
          }}
        />

        <CommandList>
          <CommandEmpty>Không tìm thấy hashtag</CommandEmpty>

          {suggested.length > 0 && (
            <CommandGroup heading="Đề xuất">
              {suggested &&
                suggested.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => toggleHashtag(tag.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span>#{tag.name}</span>
                      {selected.includes(tag.name) && (
                        <span className="text-(--color-primary) text-[12px]">
                          <Check className="text-(--color-primary)" />
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          )}

          {/* Nếu search không nằm trong đề xuất → cho phép tạo mới */}
          {query.trim() && !suggested.includes(query.trim() as any) && (
            <CommandGroup heading="Tạo mới">
              <CommandItem onSelect={handleCreateNew}>
                <span>Thêm #{query.trim()}</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </BaseModal>
  );
}
