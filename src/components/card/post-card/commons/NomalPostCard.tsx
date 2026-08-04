import { PostApis } from "@/api";
import { IPost, IVideo } from "@/interfaces/public/IPost.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NomalPostCard({ item }: { item: IPost }) {
  const files = [...(item.images ?? []), ...(item.videos ?? [])];
  const router = useRouter();

  const handleViewPost = async () => {
    if (item.id && !item.id.includes("-")) {
      await PostApis.updateViewCount(item.id);
    }
    await router.push(`/post/${item.id}`);
  };

  return (
    <div className="mt-2" onClick={handleViewPost}>
      {files.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center gap-1">
          {/* 1 file */}
          {files.length === 1 && (
            <div className="w-full h-[60vh]">
              {renderMedia(files[0], 0, true)}
            </div>
          )}

          {/* 2 file */}
          {files.length === 2 && (
            <div className="flex gap-1 w-full items-center justify-center">
              {files.map((item, i) => (
                <div key={i} className="w-[48%] h-[400px]">
                  {renderMedia(item, i)}
                </div>
              ))}
            </div>
          )}

          {/* 3 file */}
          {files.length === 3 && (
            <div className="flex gap-1 w-full">
              <div className="w-1/2 h-[400px]">{renderMedia(files[0], 0)}</div>
              <div className="grid grid-cols-1 gap-1 w-1/2">
                {files.slice(1).map((item, i) => (
                  <div key={i + 1} className="h-[198px]">
                    {renderMedia(item, i + 1)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4 file trở lên */}
          {files.length >= 4 && (
            <div className="grid grid-cols-2 gap-2 w-full">
              {files.slice(0, 4).map((item, i) => (
                <div key={i} className="relative w-full h-[250px]">
                  {renderMedia(item, i)}
                  {i === 3 && files.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 text-white text-3xl font-semibold flex items-center justify-center">
                      +{files.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const renderMedia = (item: IVideo, i: number, isSingle?: boolean) => {
  if (item.type === "video") {
    return (
      <video
        autoPlay={false}
        width={item.width}
        height={item.height}
        key={i}
        src={item.url}
        controls
        className="object-contain w-full h-full bg-black"
      />
    );
  }
  return (
    <Image
      key={i}
      src={item.url}
      width={1000}
      height={1000}
      alt={"image"}
      className={`${
        isSingle === true ? "object-contain" : "object-cover"
      } w-full h-full`}
    />
  );
};
