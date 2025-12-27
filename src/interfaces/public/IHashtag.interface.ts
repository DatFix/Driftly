import { IBase } from "../others/IBase.interface";

export interface IHashtag extends IBase {
  name: string;
  popularity: number;
}