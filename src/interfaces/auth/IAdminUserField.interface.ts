import { IBase } from "../others/IBase.interface";

export interface IAdminUserField extends IBase {
    name: string,
    email: string,
    password: string,
    role?: string
}