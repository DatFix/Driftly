export interface IPermissionItem {
  code: string;
  name: string;
}

export interface IPermission {
  // id: string;
  name: string;
  items: IPermissionItem[];
}
