import { IBase } from "../others/IBase.interface";

export interface ICategory extends IBase {
  name: string;
  slug: string;
  description?: string;        // mô tả ngắn (optional)
  children?: (ICategory | null)[];      // danh mục con (đệ quy)
  isActive?: boolean;          // trạng thái
}
