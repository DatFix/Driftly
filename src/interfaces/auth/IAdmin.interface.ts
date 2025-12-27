import { IBase } from "../others/IBase.interface";
import { IRole } from "./IRole.interface";

export interface IAdmin extends IBase {
    avatar?: string,
    username: string,
    email: string,
    password?: string,
    isActive?: boolean,
    role?: string
}