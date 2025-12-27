"use client";
import { TextareaHTMLAttributes } from "react";

interface BaseTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function BaseTextarea(props: BaseTextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full resize-none overflow-y-auto border-none outline-none text-(--color-text) ${props.className ?? ""}`}
    />
  );
}
