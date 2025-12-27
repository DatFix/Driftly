import { IPost } from "@/interfaces/public/IPost.interface";

export const BgPostContent = ({
  item,
  height = "60vh",
}: {
  item: IPost;
  height?: string;
}) => {
  return (
    <div
      className="w-full text-center flex items-center justify-center text-white text-2xl md:text-3xl font-bold mt-3"
      style={{
        background: item.bgColor,
        whiteSpace: "pre-line",
        height: height,
      }}
    >
      <p className="max-w-[80%] md:max-w-[90%]">{item.caption}</p>
    </div>
  );
};
