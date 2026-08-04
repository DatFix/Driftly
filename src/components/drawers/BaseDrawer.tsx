"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../icons/BaseIcon";

interface BaseDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  placement?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
}

export default function BaseDrawer({
  open,
  onClose,
  title,
  children,
  placement = "right",
  width = "auto",
  height = "300px",
}: BaseDrawerProps) {
  const [mounted, setMounted] = useState(false);

  // Hook 1 — luôn được gọi ở mọi lần render, không đặt sau bất kỳ return nào
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hook 2 — cũng luôn được gọi, kể cả khi mounted=false hay open=false.
  // addEventListener bên trong an toàn vì chỉ chạy sau khi effect thực thi,
  // tức là đã ở phía client rồi, không ảnh hưởng gì tới SSR.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Early return đặt SAU khi tất cả hook đã được khai báo xong —
  // đảm bảo số lượng hook gọi luôn giống nhau ở mọi lần render
  if (!mounted) return null;

  return createPortal(
    <>
      {/* Overlay mờ nền */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-9999 transition-opacity duration-600 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer chính */}
      <div
        className={`fixed bg-(--color-background) shadow-xl z-9999 transition-transform duration-600 ease-in-out
    ${placement === "right" ? "top-0 right-0 h-full" : ""}
    ${placement === "left" ? "top-0 left-0 h-full" : ""}
    ${placement === "bottom" ? "bottom-0 left-0 w-full" : ""}
    ${placement === "top" ? "top-0 left-0 w-full" : ""}
    ${
      open
        ? "translate-x-0 translate-y-0"
        : placement === "right"
          ? "translate-x-full"
          : placement === "left"
            ? "-translate-x-full"
            : placement === "bottom"
              ? "translate-y-full"
              : "-translate-y-full"
    }
  `}
        style={{
          width:
            placement === "left" || placement === "right" ? width : undefined,
          height:
            placement === "top" || placement === "bottom" ? height : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2">
          {title ? (
            <h3 className="text-lg font-semibold text-(--color-title)">
              {title}
            </h3>
          ) : (
            <div></div>
          )}
          <button onClick={onClose} className="transition cursor-pointer">
            <CloseIcon width={40} height={40} />
          </button>
        </div>

        {/* Nội dung */}
        <div className="px-4 overflow-y-auto">{children}</div>
      </div>
    </>,
    document.body
  );
}