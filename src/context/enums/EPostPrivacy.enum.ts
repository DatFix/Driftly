export enum EPostPrivacy {
  PUBLIC = "public",
  FOLLOWERS = "followers",
  PRIVATE = "private",
}

export const EPostPrivacyVN:Record<EPostPrivacy, string> = {
  [EPostPrivacy.PUBLIC] : "Công khai",
  [EPostPrivacy.FOLLOWERS] : "Người theo dõi",
  [EPostPrivacy.PRIVATE] : "Chỉ mình tôi",
}