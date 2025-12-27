import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

export default function BaseButton({
  children,
  className = "",
  onClick,
  size = "medium",
  type = "button",
  isloading = false,
  disable = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  size?: "small" | "medium";
  type?: "submit" | "button";
  isloading?: boolean;
  disable?: boolean;
}) {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      type={type}
      className={
        className
          ? `${className} ${
              size === "small" ? "h-5" : "h-11"
            } flex mt-3 items-center justify-center gap-2 shadow-xl hover:shadow-xs transition-all duration-300 ease-in-out cursor-pointer`
          : `${
              size === "small" ? "h-10" : "h-11"
            } px-3 mt-3 flex items-center justify-center gap-2 w-fit bg-(--color-primary) text-white shadow-lg  hover:shadow-xs transition-all duration-300 ease-in-out cursor-pointer active:translate-x-0.5 active:translate-y-1`
      }
    >
      {isloading ? <Spinner /> : children}
    </button>
  );
}
