import { ReactNode } from "react";

export default function BaseTag({
  type = "outline",
  border = 4,
  color = "#FF5671",
  children,
}: {
  type?: "outline" | "fill";
  border?: number;
  color?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="w-fit px-3 py-0.5"
      style={{ backgroundColor: `${color}1A`, borderRadius: `${border}px` }}
    >
      <p className={`text-sm`} style={{ color: color }}>
        {children}
      </p>
    </div>
  );
}
