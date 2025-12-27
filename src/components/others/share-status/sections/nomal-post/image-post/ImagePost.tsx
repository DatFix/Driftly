import { BaseUpload } from "@/components/upload/BaseUpload";
import { ReactNode } from "react";

export default function ImagePost({ children }: { children: ReactNode }) {
  return (
    <div>
      <BaseUpload
        multiple
        accept="image/*,video/*" 
        onFileSelect={(files) => console.log("Các ảnh đã chọn:", files)}
      >
        {children}
      </BaseUpload>
    </div>
  );
}
