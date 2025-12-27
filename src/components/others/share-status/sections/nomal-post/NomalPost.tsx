import { PhotoIcon } from "@/components/icons/BaseIcon";
import BaseTextareaRhf from "@/components/inputs/base-textarea/BaseTextareaRhf";
import { BaseUpload } from "@/components/upload/BaseUpload";
import { IPost } from "@/interfaces/public/IPost.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";

export default function NomalPost({
  rhf,
  postOption,
}: {
  rhf: SimFormReturn<IPost>;
  postOption: boolean;
}) {
  const { control, setValue, getValues } = rhf;

  async function handleFileSelect(files: File[]) {
    if (!files.length) return;

    const images = files.filter((f) => f.type.includes("image"));
    const videos = files.filter((f) => f.type.includes("video"));
    setValue("images", [...(getValues("images") || []), ...images]);
    setValue("videos", [...(getValues("videos") || []), ...videos]);
  }

  return (
    <div className="my-5">
      <BaseTextareaRhf
        name="caption"
        control={control}
        placeholder="Chia sẻ cảm nghĩ của bạn."
        maxLength={10000}
      />

      <BaseUpload
        multiple
        accept="image/*,video/*"
        onFileSelect={handleFileSelect}
      >
        <button disabled={postOption} type="button" className={`hidden`}>
          <PhotoIcon stroke={1.5} color={postOption ? "gray" : "green"} />
        </button>
      </BaseUpload>
    </div>
  );
}
