import { CommentApis } from "@/api";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import { SendIcon } from "@/components/icons/BaseIcon";
import BaseTextareaRhf from "@/components/inputs/base-textarea/BaseTextareaRhf";
import { useAuth } from "@/context/AuthContext";
import { useSimRhf } from "@/hooks/useSimRhf.hook";
import { IComment } from "@/interfaces/public/IComment.interface";
import { IImage } from "@/interfaces/public/IPost.interface";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import { useTransition } from "react";

export default function CommentBox({ postId }: { postId: string }) {
  const { user } = useAuth();
  const { control, watch, handleSubmit, reset } = useSimRhf<IComment>({
    defaultValues: {
      content: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: IComment) => {
    startTransition(async () => {
      if (!data.content?.trim()) {
        return;
      }
      const res = await CommentApis.create(postId, String(user?.id), data);
      if (res.statusCode === 201) {
        showSuccessToast(res.message);
        reset();
      } else {
        showErrorToast(res.message);
      }
    });
  };

  return (
    <div className="bg-(--color-card) min-h-40 w-full absolute bottom-0 right-0 pt-3.5 pb-3 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start justify-start gap-2"
      >
        <BaseAvatar size={35} name={user?.username} url={(user?.avatar as IImage)?.url} />
        <BaseTextareaRhf
          rows={5}
          control={control}
          name="content"
          placeholder="Viết bình luận"
          className="bg-(--color-dark-light) px-3 pt-3 pb-10 h-32 rounded-lg"
        />

        <button
          type="submit"
          // disabled={!watch("content")}
          className="absolute disabled:cursor-not-allowed disabled:opacity-50 bottom-5 right-10 cursor-pointer"
        >
          <SendIcon
            stroke={1.5}
            color={
              watch("content") ? "var(--color-primary)" : "var(--color-text)"
            }
          />
        </button>
      </form>
    </div>
  );
}
