"use server";
import { db } from "@/configs/firebase.config";
import { EPostPrivacy } from "@/context/enums/EPostPrivacy.enum";
import {
  IBaseCreate,
  IBaseGetMulti,
  IBaseGetOne,
  IBaseUpdate,
} from "@/interfaces/others/IBaseReturn.interface";
import { IPost } from "@/interfaces/public/IPost.interface";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { CommentApis, HashtagApis, UserApis } from ".";
import { now } from "@/utils/now.utils";

export const create = async (data: IPost): Promise<IBaseCreate> => {
  const now = new Date().toISOString();

  try {
    let hashtagData = [] as any;
    if (Array.isArray(data.hashtags) && data.hashtags.length) {
      hashtagData = await Promise.all(
        data.hashtags.map((tag) =>
          HashtagApis.create({ name: tag, popularity: 1 }),
        ),
      );
    }

    const res = await addDoc(collection(db, "posts"), {
      caption: data.caption ?? "",
      privacy: data.privacy ?? EPostPrivacy.PUBLIC,
      bgColor: data.bgColor ?? "",
      author: data.author,
      commentsCount: 0,
      viewsCount: 0,
      likes: [],
      images: data.images ?? [],
      videos: data.videos ?? [],
      createdAt: now,
      updatedAt: now,
      hashtags: hashtagData.map((h: any) => h.data?.id),
    });

    revalidatePath("/");

    return {
      data: { id: res.id },
      statusCode: 201,
      message: "Tạo bài viết thành công",
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi tạo:", error);

    return {
      statusCode: 500,
      message: error?.message || "Lỗi khi tạo bài viết",
      data: null,
    };
  }
};

export const getMulti = async (
  privacy: EPostPrivacy = EPostPrivacy.PUBLIC,
): Promise<IBaseGetMulti> => {
  try {
    const queries = query(
      collection(db, "posts"),
      where("privacy", "==", privacy),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(queries);

    const posts: IPost[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as IPost),
    }));

    const postWithAuthor = await Promise.all(
      posts.map(async (item) => {
        const author = await UserApis.findOneById(String(item?.author)); // <— SỬA Ở ĐÂY
        const totalCmt = await CommentApis.getMulti(item?.id ?? ""); // <— SỬA Ở ĐÂY
        return {
          ...item,
          authorData: author.data || null,
          commentsCount: totalCmt.totalItems,
        };
      }),
    );

    return {
      data: postWithAuthor,
      totalItems: posts.length,
    };
  } catch (error: any) {
    console.error("❌ Lỗi khi lấy dữ liệu:", error);
    return {
      data: [],
      totalItems: 0,
    };
  }
};

export const findOneById = async (id: string): Promise<IBaseGetOne> => {
  try {
    const comments = await CommentApis.getMulti(id);
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { data: null };

    const snapData = docSnap.data() as IPost;

    const post: IPost & { comments: any } = {
      id: docSnap.id,
      ...snapData,
      comments: comments.data,
    };
    const author = await UserApis.findOneById(String(post.author));

    return {
      data: {
        ...post,
        authorData: author.data || null,
      },
    };
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
    return { data: null };
  }
};

interface ILiker {
  id: string;
  name: string;
  avatar?: string;
}

export const likePost = async (postId: string, userId: string) => {
  const now = new Date().toISOString();

  // Lấy thông tin post
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) throw new Error("Post not found");

  const post = postSnap.data() as IPost;

  // Lấy thông tin user (liker)
  const user = await UserApis.findOneById(userId);
  if (!user) throw new Error("User not found");

  const liker: ILiker = {
    id: user.data.id,
    name: user.data.username!,
    avatar: user.data.avatar,
  };

  // Kiểm tra user đã like chưa
  const hasLiked = post.likes?.some((l) => l.id === userId);

  // Toggle like: thêm hoặc xóa user khỏi likes
  await updateDoc(postRef, {
    likes: hasLiked ? arrayRemove(liker) : arrayUnion(liker),
    updatedAt: now,
  });

  // Revalidate nếu dùng Next.js
  revalidatePath("/posts");

  return {
    success: true,
    postId,
    liked: !hasLiked,
    likes: hasLiked
      ? post.likes?.filter((l) => l.id !== userId) || []
      : [...(post.likes || []), liker],
  };
};

export const updateViewCount = async (postId: string) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    // Guard: nếu document không tồn tại (ví dụ id giả từ fake feed),
    // bỏ qua thay vì crash
    if (!docSnap.exists()) {
      console.warn(`⚠️ Post ${postId} không tồn tại, bỏ qua updateViewCount`);
      return {};
    }

    const post = docSnap.data() as IPost;
    await updateDoc(docRef, {
      viewsCount: Number(post.viewsCount ?? 0) + 1,
      updatedAt: now(),
    });
    revalidatePath("/posts");
    return {};
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật", error);
    throw error;
  }
};

export const update = async (id: string, data: IPost): Promise<IBaseUpdate> => {
  try {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: now(),
    });
    revalidatePath("/posts");
    return {
      data: null,
      statusCode: 200,
      message: "Cập nhật bài viết thành công",
    };
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật", error);
    return {
      data: null,
      statusCode: 500,
      message: "Lỗi khi cập nhật bài viết",
    };
  }
};

export const getMultiByAuthor = async (
  authorId: string,
  viewerId: string | null,
): Promise<IBaseGetMulti> => {
  try {
    let queries;

    const postsRef = collection(db, "posts");
    const authorData = await UserApis.findOneById(authorId);

    // 🟩 1. Nếu người xem là chính tác giả → lấy hết bài viết
    if (viewerId === authorId) {
      queries = query(
        postsRef,
        where("author", "==", authorId),
        orderBy("createdAt", "desc"),
      );
    } else if (
      authorData?.data.followers?.some(
        (followerId: any) => followerId === viewerId,
      )
    ) {
      // 🟩 2. Người xem đã follow tác giả → lọc theo followers
      queries = query(
        postsRef,
        where("author", "==", authorId),
        where("privacy", "in", [EPostPrivacy.PUBLIC, EPostPrivacy.FOLLOWERS]),
        orderBy("createdAt", "desc"),
      );
    } else {
      // 🟩 3. Người xem không phải tác giả → lọc theo privacy
      queries = query(
        postsRef,
        where("author", "==", authorId),
        where("privacy", "==", EPostPrivacy.PUBLIC),
        orderBy("createdAt", "desc"),
      );
    }

    const snapshot = await getDocs(queries);

    const posts: IPost[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as IPost),
    }));

    // 🟩 Lấy thông tin bổ sung
    const postWithAuthor = await Promise.all(
      posts.map(async (item) => {
        const author = await UserApis.findOneById(String(item.author));
        const totalCmt = await CommentApis.getMulti(item.id ?? "");

        return {
          ...item,
          authorData: author.data || null,
          commentsCount: totalCmt.totalItems,
        };
      }),
    );

    return {
      data: postWithAuthor,
      totalItems: posts.length,
    };
  } catch (error) {
    console.error("❌ Error getMultiByAuthor:", error);
    return { data: [], totalItems: 0 };
  }
};

export const getPostsByFollowings = async (
  viewerId: string,
): Promise<IBaseGetMulti> => {
  try {
    const viewerData = await UserApis.findOneById(viewerId);
    if (!viewerData?.data?.followings?.length) {
      return { data: [], totalItems: 0 };
    }
    const postsRef = collection(db, "posts");
    const queries = query(
      postsRef,
      where("author", "in", viewerData.data.followings),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(queries);
    const posts: IPost[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as IPost),
    }));
    // 🟩 Lấy thông tin bổ sung
    const postWithAuthor = await Promise.all(
      posts.map(async (item) => {
        const author = await UserApis.findOneById(String(item.author));
        const totalCmt = await CommentApis.getMulti(item.id ?? "");
        return {
          ...item,
          authorData: author.data || null,
          commentsCount: totalCmt.totalItems,
        };
      }),
    );
    return {
      data: postWithAuthor,
      totalItems: posts.length,
    };
  } catch (error) {
    console.error("❌ Error getPostsByFollowings:", error);
    return { data: [], totalItems: 0 };
  }
};

export const getPostsByHashtag = async (
  hashtagId: string,
): Promise<IBaseGetMulti> => {
  try {
    const postsRef = collection(db, "posts");

    const queries = query(
      postsRef,
      where("hashtags", "array-contains", hashtagId),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(queries);

    const posts: IPost[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as IPost),
    }));

    // Lấy author + tổng comment song song
    const postWithAuthor = await Promise.all(
      posts.map(async (item) => {
        const [author, totalCmt] = await Promise.all([
          UserApis.findOneById(String(item.author)),
          CommentApis.getMulti(item.id ?? ""),
        ]);

        return {
          ...item,
          authorData: author.data || null,
          commentsCount: totalCmt.totalItems || 0,
        };
      }),
    );

    return {
      data: postWithAuthor,
      totalItems: postWithAuthor.length,
    };
  } catch (error: any) {
    console.error("❌ Error getPostsByHashtag:", error);
    return { data: [], totalItems: 0 };
  }
};
