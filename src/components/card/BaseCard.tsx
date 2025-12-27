import { ReactNode } from "react";

export default function BaseCard({
  children,
  border = false,
  padding = 15,
  radius = 5,
  shadow = true,
}: {
  children: ReactNode;
  border?: boolean;
  padding?: number;
  radius?: number;
  shadow?: boolean;
}) {
  return (
    <div
      className={`bg-(--color-card) ${
        shadow ? "shadow-[0_10px_30px_rgba(0,0,0,0.05)]" : ""
      } ${border ? "border border-(--color-dark-light)" : ""}`}
      style={{ padding: padding, borderRadius: radius }}
    >
      {children}
    </div>
  );
}
