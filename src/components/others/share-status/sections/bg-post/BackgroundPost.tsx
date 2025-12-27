import BaseTextareaRhf from "@/components/inputs/base-textarea/BaseTextareaRhf";
import { BG_COLORS } from "@/constants/background/bg-colors.constant";
import { IPost } from "@/interfaces/public/IPost.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import { useEffect, useState } from "react";

export default function BackgroundPost({
  rhf,
  item,
}: {
  rhf: SimFormReturn<IPost>;
  item?: IPost;
}) {
  const [bgColor, setBgColor] = useState<string>(item?.bgColor || BG_COLORS[0]);
  const { control, setValue } = rhf;

  useEffect(() => {
    setValue("bgColor", bgColor);
  }, [bgColor, setValue]);

  return (
    <div className="w-full">
      <div className="mt-3 flex flex-col items-center justify-center">
        <BaseTextareaRhf
          name="caption"
          control={control}
          placeholder="Chia sẻ cảm nghĩ của bạn."
          rows={5}
          maxLength={150}
          className="text-center pt-[10%] px-5 text-2xl text-white"
          style={{ background: bgColor }}
        />
      </div>

      <div className="flex w-[460px] overflow-x-auto overflow-y-hidden items-center gap-2 px-2 py-2 mt-3 mb-5 scrollbar-none ">
        {BG_COLORS.map((item, index) => {
          const isActive = item === bgColor;
          return (
            <div
              key={index}
              className={`shrink-0 w-7 h-7 rounded-full cursor-pointer transition-transform duration-200 ${
                isActive ? "scale-125" : "hover:scale-105"
              }`}
              style={{ background: item }}
              onClick={() => setBgColor(item)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
