"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface BaseModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode; // nút mở modal
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode; // nội dung modal
  className?: string;
  visiableBtn?: boolean;
  width?: "1xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

export default function BaseModal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className,
  visiableBtn = true,
  width = "1xl",
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        width={width}
        className={`${className} border-0 bg-(--color-card) shadow-lg`}
        showCloseButton={visiableBtn}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-(--color-title)">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-(--color-text)">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
