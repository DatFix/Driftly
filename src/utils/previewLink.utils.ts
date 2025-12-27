import { getLinkPreview } from "link-preview-js";

export async function previewLink(url: string) {
  try {
    const res: any = await getLinkPreview(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
    });

    return {
      title: res?.title ?? "",
      description: res?.description ?? "",
      image: res?.images?.[0] ?? res?.favicons?.[0] ?? null,
      raw: res,
    };
  } catch (err) {
    console.warn("refreshSource error:", err);
    return null;
  }
}
