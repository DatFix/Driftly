"use client";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { CSSProperties, useRef, useEffect, KeyboardEvent } from "react";

interface BaseTextareaRhfProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
  style?: CSSProperties;
  minHeight?: number; // chiều cao tối thiểu (tùy chọn)
  onSubmit?: () => void; // ✅ callback khi nhấn Enter
  focus?: boolean;
}

export default function BaseTextareaRhf<T extends FieldValues>({
  name,
  control,
  placeholder = "Nhập nội dung...",
  rows = 1,
  maxLength = 1000,
  className = "",
  style,
  minHeight = 40,
  onSubmit, // ✅ thêm props
  focus = true,
}: BaseTextareaRhfProps<T>) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 🔹 Hàm auto resize chiều cao
  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  // 🔹 Xử lý phím Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit(); // ✅ submit form thật
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          spellCheck={false}
          {...field}
          ref={(e) => {
            textareaRef.current = e;
            field.ref(e);
          }}
          onChange={(e) => {
            field.onChange(e);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown} // ✅ thêm handler
          autoFocus={focus}
          style={style}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`w-full resize-none overflow-hidden outline-none text-(--color-text) ${className}`}
        />
      )}
    />
  );
}
