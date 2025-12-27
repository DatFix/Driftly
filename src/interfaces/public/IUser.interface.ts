import { EGender } from "@/types/gender.type";
import { IBase } from "../others/IBase.interface";
import { IImage } from "./IPost.interface";

export interface IUser extends IBase {
  email: string;             // Email đăng nhập
  username?: string;          // Tên người dùng
  avatar?: string | IImage;           // Ảnh đại diện
  bio?: string;              // Mô tả ngắn về người dùng
  
  // Bài viết & tương tác
  posts?: string[];          // Danh sách ID bài viết mà user đã đăng
  likedPosts?: string[];     // Danh sách ID bài viết đã thích
  bookmarkedPosts?: string[];// Danh sách ID bài viết đã lưu
  comments?: string[];       // Danh sách ID bình luận
  followers?: string[];       // Danh sách ID người theo dõi bạn
  followings?: string[];       // Danh sách ID người bạn theo dõi

  // Thông tin hệ thống
  isVerified?: boolean;      // Đã xác minh email chưa
  isActive?: boolean;      // Đã xác minh email chưa

  // Thông tin thêm
  gender?: EGender // Giới tính
  birthday?: Date | string;          // Ngày sinh (ISO string)
  location?: string;          // Nơi ở hiện tại
  website?: string;           // Trang web cá nhân
  socialLinks?: {             // Mạng xã hội khác
    facebook?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    tiktok?: string;
  };
  coverPhoto?: number
}
