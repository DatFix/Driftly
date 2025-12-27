"use client";
import { IPost } from "@/interfaces/public/IPost.interface";
import LeftHomeLayout from "./sections/left-section/LeftHomeLayout";
import RightHomeLayout from "./sections/right-section/RightHomeLayout";

export default function HomeLayout({
  items,
  totalItems,
}: {
  items: IPost[];
  totalItems: number;
}) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-5 max-w-7xl mx-auto relative">
      <div className="w-full md:w-2/3">
        <LeftHomeLayout items={items} totalItems={totalItems} />
      </div>
      <div className="w-full md:w-1/3 h-screen rounded-md sticky top-24">
        <RightHomeLayout />
      </div>
    </div>
  );
}
