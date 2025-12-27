import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatToISOString } from "@/utils/formatToISOString.utils";

export interface BaseDatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (value?: Date) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  size?: "small" | "medium";
}

const BaseDatePicker: React.FC<BaseDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = "Select date",
  className = "",
  size = "medium",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`form-control w-full my-2 ${className}`}>
      {label && (
        <label className="label mb-1">
          <span className="text-(--color-text) font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              `w-full focus:border-[#FF567199] focus:ring-2 focus:ring-[#FF567166] rounded-none hover:bg-transparent justify-between text-left font-normal text-(--color-text) text-md placeholder:text-(--color-dark-light) bg-(--color-card) border-2 ${
                size === "small" ? "h-10" : "h-12!"
              }`,
              error ? "border-red-500" : "border-(--color-dark-light)"
            )}
          >
            {value
              ? value instanceof Date
                ? value.toLocaleDateString()
                : new Date(value).toLocaleDateString()
              : placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="w-auto p-0 rounded-none card-shadow"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default BaseDatePicker;
