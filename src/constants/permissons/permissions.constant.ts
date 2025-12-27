export const PERMISSIONS = [
  {
    name: "Người dùng",
    code: "user",
    children: [
      { name: "Tạo người dùng", code: "user.create" },
      { name: "Sửa người dùng", code: "user.update" },
      { name: "Xem người dùng", code: "user.view" },
      { name: "Xóa người dùng", code: "user.delete" },
    ],
  },
  {
    name: "Bài viết",
    code: "post",
    children: [
      { name: "Tạo bài viết", code: "post.create" },
      { name: "Sửa bài viết", code: "post.update" },
      { name: "Xem bài viết", code: "post.view" },
      { name: "Xóa bài viết", code: "post.delete" },
      { name: "Kiểm duyệt bài viết", code: "post.moderate" },
    ],
  },
  {
    name: "Phân quyền",
    code: "role",
    children: [
      { name: "Tạo quyền", code: "role.create" },
      { name: "Sửa quyền", code: "role.update" },
      { name: "Xem quyền", code: "role.view" },
      { name: "Xóa quyền", code: "role.delete" },
    ],
  },
  {
    name: "Danh mục",
    code: "category",
    children: [
      { name: "Tạo danh mục", code: "category.create" },
      { name: "Sửa danh mục", code: "category.update" },
      { name: "Xem danh mục", code: "category.view" },
      { name: "Xóa danh mục", code: "category.delete" },
    ],
  },
  {
    name: "Khác",
    code: "others",
    children: [
      { name: "Xem dashboard", code: "dashboard.view" },
      { name: "Truy cập admin", code: "admin.view" },
    ],
  },
] as const
