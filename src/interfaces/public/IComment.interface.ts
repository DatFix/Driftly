import { IBase } from "../others/IBase.interface";
import { IUser } from "./IUser.interface";

export interface IComment extends IBase {
    content: string,
    postId: string,
    children?: IComment[],  
    likes?: IUser[]
    commenter: IUser
}