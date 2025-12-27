import { IBase } from "../others/IBase.interface";

export interface IRole extends IBase {
  // id?: string,
  name: string;
  description?: string;
  permissions: string[];
}
