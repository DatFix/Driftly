import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function BaseConfirmAlert({
  open,
  onOpenChange,
  title = "Bạn có chắn muốn thực hiện hành động này?",
  description = "Nếu xác nhận, hành động sẽ được thực hiện và không thể hoàn tác!",
  cancelText = "Hủy",
  confirmText = "Xác nhận",
  onConfirm,
  trigger,
}: {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="bg-(--color-card) border-0 shadow-lg">
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="text-(--color-title)">
              {title}
            </AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription className="text-(--color-text)">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer bg-(--color-card) text-(--color-text) border border-(--color-dark-light) hover:bg-(--color-card) hover:text-(--color-text) hover:opacity-80">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-(--color-primary) hover:bg-(--color-primary) hover:opacity-80"
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
