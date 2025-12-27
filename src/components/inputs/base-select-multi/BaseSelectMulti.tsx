import React, { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface BaseSelectOption {
  label: string;
  value: string;
}

export interface BaseSelectMultiProps {
  label?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  required?: boolean;
  options: BaseSelectOption[];
  className?: string;
  size?: "small" | "medium";
  showClearButton?: boolean;
}

const BaseSelectMulti: React.FC<BaseSelectMultiProps> = ({
  label,
  placeholder = "Chọn...",
  value = [],
  onChange,
  error,
  required = false,
  options,
  className = "",
  size = "medium",
  showClearButton = true,
}) => {
  const [open, setOpen] = useState(false);

  const toggleValue = (val: string) => {
    const newValues = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange?.(newValues);
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const selectedCount = selectedOptions.length;

  // ✨ Chỉ hiển thị tối đa 2 label, còn lại hiển thị "+n"
  const displayLabels =
    selectedCount === 0
      ? ""
      : selectedCount <= 3
      ? selectedOptions.map((opt) => opt.label).join(", ")
      : `${selectedOptions
          .slice(0, 3)
          .map((o) => o.label)
          .join(", ")} +${selectedCount - 3}`;

  return (
    <div className="form-control w-full my-2">
      {label && (
        <label className="label">
          <span className="text-(--color-text) font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              "focus:border-[#FF567199] focus:ring-2 focus:ring-[#FF567166] flex items-center justify-between w-full  border-2 px-3 text-(--color-text) bg-(--color-card) overflow-hidden",
              size === "small" ? "h-10" : "h-12",
              error ? "border-red-500" : "border-(--color-dark-light)",
              className
            )}
          >
            <span
              className={cn(
                "truncate text-left flex-1",
                !displayLabels && "text-gray-400"
              )}
            >
              {displayLabels || placeholder}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {showClearButton && selectedCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="hover:bg-(--color-dark-light) rounded-none p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0 border-0 card-shadow rounded-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandInput className="rounded-none" placeholder="Tìm kiếm..." />
            <CommandList>
              <CommandEmpty>
                <p className="text-(--color-text)">Không tìm thấy.</p>
              </CommandEmpty>
              <CommandGroup>
                {options.map((opt) => {
                  const isSelected = value.includes(opt.value);
                  return (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => {
                        toggleValue(opt.value);
                        setOpen(true);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className="cursor-pointer rounded-none"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-none border border-(--color-dark-light)",
                          isSelected
                            ? "bg-(--color-primary) text-white border-(--color-primary)"
                            : "bg-white"
                        )}
                      >
                        {isSelected && <Check className="h-4 w-4 text-white" />}
                      </div>
                      {opt.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default BaseSelectMulti;
