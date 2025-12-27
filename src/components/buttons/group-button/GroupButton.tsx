import { Spinner } from "@/components/ui/spinner";
import BaseButton from "../base-button/BaseButton";

export default function GroupButton({
  onCancel,
  submitText = "Xác nhận",
  cancelText = "Hủy",
  isloading,
  disable = false,
}: {
  submitText?: string;
  cancelText?: string;
  onCancel: () => void;
  isloading?: boolean;
  disable?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <BaseButton
        type="button"
        onClick={onCancel}
        size="small"
        className="bg-(--color-dark) h-9 w-fit min-w-20 px-3 border border-(--color-dark-light) shadow-none! text-(--color-title) text-sm active:opacity-80"
      >
        {cancelText}
      </BaseButton>
      <BaseButton
        disable={disable || isloading}
        type="submit"
        size="small"
        className="bg-(--color-primary) disabled:bg-[#FF567180] h-9 w-fit min-w-20 px-3  shadow-none! text-white text-sm active:opacity-80"
      >
        {isloading ? <Spinner /> : submitText}
      </BaseButton>
    </div>
  );
}
