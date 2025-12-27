import { ReactNode } from "react";

export default function ProfileHeading({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center justify-start gap-2">
      {icon}
      <p className="text-(--color-text)">{title}</p>
    </div>
  );
}
