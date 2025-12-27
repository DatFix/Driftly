"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export interface BaseTabProps {
  key?: string | number;
  label: ReactNode;
  link?: string;
}
export default function BaseTab({
  tabKey,
  items,
}: {
  tabKey: string;
  items: BaseTabProps[];
}) {
  const router = useRouter();
  return (
    <div className="w-full bg-(--color-card) flex items-center justify-between gap-1 h-9 px-1 rounded-[3px] shadow-sm">
      {items.map((item, index) => (
        <div
          key={index}
          className={` w-1/2 cursor-pointer flex items-center justify-center rounded-[3px] py-1 text-(--color-text) text-sm ${
            item.key === tabKey
              ? "bg-linear-to-r from-[#9C69CA] to-[#FF7CAC] text-white"
              : ""
          }`}
          onClick={() => router.push(`${item.link}`)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
