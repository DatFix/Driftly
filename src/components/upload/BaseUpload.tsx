import { showWarningToast } from "@/utils/toast.utils";
import { ReactNode, useEffect, useState } from "react";

interface BaseUploadProps {
  onFileSelect?: (files: File[]) => void;
  children: ReactNode;
  multiple?: boolean;
  accept?: string;
  acceptPreview?: boolean;
}

export function BaseUpload({
  onFileSelect,
  children,
  multiple = false,
  accept = "image/*,video/*", // ✅ cho phép cả ảnh & video
  acceptPreview = true,
}: BaseUploadProps) {
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const MAX_FILES = 5;
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    // ✅ Giới hạn tổng file (bao gồm cả cũ + mới)
    const totalFiles = previews.length + files.length;
    if (totalFiles > MAX_FILES && multiple) {
      showWarningToast(`Chỉ được tải lên tối đa ${MAX_FILES} tệp.`);
      return;
    }

    // ✅ Lọc theo kích thước và loại file
    const validFiles = files.filter((file) => {
      if (file.type.startsWith("image/") && file.size > MAX_IMAGE_SIZE) {
        showWarningToast(`Ảnh "${file.name}" vượt quá 5MB.`);
        return false;
      }
      if (file.type.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
        showWarningToast(`Video "${file.name}" vượt quá 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setFileNames((prev) => [...prev, ...validFiles.map((f) => f.name)]);
    onFileSelect?.(validFiles);

    // ✅ Tạo preview
    const newPreviews = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // ✅ Dọn dẹp URL khi component unmount hoặc previews thay đổi
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  // ✅ Hàm render ảnh hoặc video
  const renderMedia = (item: { url: string; type: string }, i: number) => {
    if (item.type === "video") {
      return (
        <video
          key={i}
          src={item.url}
          controls
          className="object-cover w-full h-full rounded-lg"
        />
      );
    }
    return (
      <img
        key={i}
        src={item.url}
        alt={fileNames[i]}
        className="object-cover w-full h-full rounded-lg"
      />
    );
  };

  return (
    <div className="">
      <div className="flex flex-col gap-3" hidden={!acceptPreview}>
        {previews.length > 0 && (
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {/* 1 file */}
            {previews.length === 1 && (
              <div className="w-full h-[400px]">
                {renderMedia(previews[0], 0)}
              </div>
            )}

            {/* 2 file */}
            {previews.length === 2 && (
              <div className="flex gap-2 w-full">
                {previews.map((item, i) => (
                  <div key={i} className="w-[48%] h-[400px]">
                    {renderMedia(item, i)}
                  </div>
                ))}
              </div>
            )}

            {/* 3 file */}
            {previews.length === 3 && (
              <div className="flex gap-2 w-full">
                <div className="w-1/2 h-[400px]">
                  {renderMedia(previews[0], 0)}
                </div>
                <div className="grid grid-cols-1 gap-2 w-1/2">
                  {previews.slice(1).map((item, i) => (
                    <div key={i + 1} className="h-[196px]">
                      {renderMedia(item, i + 1)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4 file trở lên */}
            {previews.length >= 4 && (
              <div className="grid grid-cols-2 gap-2 w-full">
                {previews.slice(0, 4).map((item, i) => (
                  <div key={i} className="relative w-full h-[200px]">
                    {renderMedia(item, i)}
                    {i === 3 && previews.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 text-white text-3xl font-semibold flex items-center justify-center rounded-lg">
                        +{previews.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        onClick={() => document.getElementById("fileInput")?.click()}
        className="cursor-pointer"
      >
        {children}
      </div>

      <input
        id="fileInput"
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
}
