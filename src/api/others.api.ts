import { db } from "@/configs/firebase.config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { UserApis } from ".";
import { IBaseGetMulti } from "@/interfaces/others/IBaseReturn.interface";

export async function fetchPreview(url: string) {
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
  const json = await res.json();
  return {
    title: json.data?.title ?? "",
    description: json.data?.description ?? "",
    image: json.data?.image?.url ?? null,
    raw: json.data,
  };
}

export async function removeFile(publicId: string, resourceType: "image" | "video" = "image") {
  try {
    const res = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, resourceType }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Delete failed");

    console.log("Delete result:", data); // { result: 'ok' } nếu xóa thành công
    return data;
  } catch (err) {
    console.error("Remove file failed:", err);
    throw err;
  }
}

export async function suggestFollowing(userId: string):Promise<IBaseGetMulti> {
  try {
    const userRef = collection(db, "users");

    const q = query(
      userRef,
      where("id", "!=", userId),
      orderBy("id")
    );

    const snapshot = await getDocs(q);

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));

    const suggestions = users.filter(
      (u) => !u.followers?.includes(userId) && u.id !== userId
    );

    return {
      data: suggestions,
      totalItems: suggestions.length
    };

  } catch (error: any) {
    console.error("❌ Error suggestFollowing:", error.message);
    return {
      data: null,
      totalItems: 0
    };
  }
}

