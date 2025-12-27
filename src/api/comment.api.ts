"use server"
import { db } from "@/configs/firebase.config";
import { IBaseCreate, IBaseGetMulti } from "@/interfaces/others/IBaseReturn.interface";
import { IComment } from "@/interfaces/public/IComment.interface";
import { now } from "@/utils/now.utils";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { UserApis } from ".";

export const create = async (postId: string, commenterId: string ,data: IComment):Promise<IBaseCreate> => {
     try {
        const res = await addDoc(collection(db, 'comments'),{
            content: data.content,
            postId: postId,
            commenter: commenterId,
            createdAt: now(),
            updatedAt: now(),
        })
        revalidatePath("/post");
        return{
            data: {id: res.id},
            message: "Đã đăng bình luận",
            statusCode: 201
        }
     } catch (error: any) {
        console.log("Lỗi tạo comment", error);

         return{
            data: null,
            message: error?.message  || "Lỗi đăng tải bình luận",
            statusCode: 500
         }
     }
}

export const getMulti = async (postId: string):Promise<IBaseGetMulti> => {
    try {
        const queries = query(
            collection(db, "comments"),
            where("postId", "==", postId),
            orderBy("createdAt", "desc")
        )

        const res = await getDocs(queries);

        const comments: IComment[] = res.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as IComment)
        }))

        const commentsWithUser = await Promise.all(
        comments.map(async (item) => {
            const commenter = await UserApis.findOneById(String(item?.commenter)); // <— SỬA Ở ĐÂY
            return {
            ...item,
            commenter: commenter.data || null,
            };
        })
        );

        return{
            data: commentsWithUser,
            totalItems: comments.length
        }
    } catch (error: any) {
        console.error("❌ Lỗi khi lấy dữ liệu:", error);
    return {
      data: [],
      totalItems: 0,
    };
    }
}