import { IPost } from "@/interfaces/public/IPost.interface";
import { useState } from "react";

export default function useEditPost() {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<IPost | null>(null);

    const handleEditOpen = (post: IPost) => {
        setEditItem(post), setEditModalOpen(true);
    }

    const handleEditClose = (post: IPost) => {
        setEditItem(null), setEditModalOpen(false);
    }

    return {
        editModalOpen,
        editItem,
        handleEditOpen,
        handleEditClose,
    }
}