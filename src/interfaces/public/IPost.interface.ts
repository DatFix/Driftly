import { EPostPrivacy } from "@/context/enums/EPostPrivacy.enum";
import { IBase } from "../others/IBase.interface";
import { IUser } from "./IUser.interface";
import { IComment } from "./IComment.interface";

export interface IImage{
    id: string,
    width?: number,
    height?: number,
    type: string,
    size: number,
    url: string
    duration?: number,
}

export interface IVideo{
    id: string,
    width?: number,
    height?: number,
    duration?: number,
    type: string,
    size: number,
    url: string
}

export interface IPost extends IBase {
    caption?: string,
    privacy: EPostPrivacy,
    images?: IImage[],
    videos?: IVideo[],
    bgColor?: string,
    likes?: IUser[];
    likeCount?: number;
    commentsCount?: number;
    author: string;
    viewsCount?: number;
    comments?: IComment[]
    authorData?: IUser | null;
    hashtags?: string[];
}