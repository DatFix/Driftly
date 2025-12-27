import { db } from "@/configs/firebase.config";
import { IBaseCreate, IBaseGetMulti, IBaseGetOne } from "@/interfaces/others/IBaseReturn.interface";
import { IHashtag } from "@/interfaces/public/IHashtag.interface";
import { now } from "@/utils/now.utils";
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";

export const create = async (data: IHashtag): Promise<IBaseCreate> => {
    try {
        // 1. Kiểm tra hashtag tồn tại
        const q = query(
            collection(db, "hashtags"),
            where("name", "==", data.name)
        );
        const snap = await getDocs(q);

        // 2. Nếu tồn tại → update popularity
        if (!snap.empty) {
            const docRef = snap.docs[0].ref;
            const currentPopularity = snap.docs[0].data().popularity || 0;

            await updateDoc(docRef, {
                popularity: currentPopularity + 1,
                updatedAt: now(),
            });

            return {
                statusCode: 200,
                message: "Hashtag đã tồn tại – Tăng popularity",
                data: { id: docRef.id },
            };
        }

        // 3. Nếu chưa tồn tại → tạo mới
        const res = await addDoc(collection(db, "hashtags"), {
            name: data.name,
            popularity: data.popularity || 0,
            createdAt: now(),
            updatedAt: now(),
        });

        return {
            data: { id: res.id },
            statusCode: 201,
            message: "Tạo hashtag thành công",
        };

    } catch (error: any) {
        console.error("❌ Lỗi khi tạo hoặc cập nhật hashtag:", error);
        return {
            statusCode: 500,
            message: error?.message || "Lỗi khi tạo hashtag",
            data: null,
        };
    }
};

export const getMulti = async ():Promise<IBaseGetMulti> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'hashtags'));
        const hashtags: IHashtag[] = querySnapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data() as IHashtag
            }
        ));
        return {
            data: hashtags,
            totalItems: hashtags.length,
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách hashtags:", error);
        return {
            data: [],
            totalItems: 0,
        }
    }
}

export const findOneById = async(id: string):Promise<IBaseGetOne> => {
    try {
        const docRef = doc(db, 'hashtags', id)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return { data: null };

        const snapData = docSnap.data() as IHashtag;
        
            const hashtag: IHashtag = {
              id: docSnap.id,
              ...snapData,
            };
        
            return {
              data: hashtag,
            };
        
    } 
    catch (error) {
        console.error("Lỗi khi lấy hashtag:", error);
        return {
            data: null,
        }
    }
}

export const findByPopularity = async(limitCount: number = 5):Promise<IBaseGetMulti> => {
    try {
        const queries = query(  
            collection(db, "hashtags"),
            where("popularity", ">", 0),
            orderBy("popularity", "desc"),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(queries);   
        const hashtags: IHashtag[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as IHashtag),
        }));
        return {
            data: hashtags,
            totalItems: hashtags.length,
        };
    } catch (error) {
        console.error("Lỗi khi lấy danh sách hashtags theo độ phổ biến:", error);
        return {
            data: [],
            totalItems: 0,
        };
    }
}
