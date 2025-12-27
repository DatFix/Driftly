"use client";

import { User, ChevronsUpDown, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CategoryIcon,
  DashboardIcon,
  LogoIcon,
  SendIcon,
  SheidIcon,
  UserGroupIcon,
} from "@/components/icons/BaseIcon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdmin } from "@/context/AdminContext";
import { showErrorToast, showSuccessToast } from "@/utils/toast.utils";
import AdminProfileDrawer from "./AdminProfileDrawer";
import { useState } from "react";

interface MenuDashboardItemsProps {
  label: string;
  icon: React.ReactNode;
  slug: string;
}

const MenuDashboardItems: MenuDashboardItemsProps[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon color="var(--color-title)" width={18} height={18} />,
    slug: "/admin/dashboard",
  },
  {
    label: "Người dùng",
    icon: <UserGroupIcon color="var(--color-title)" width={18} height={18} />,
    slug: "/admin/users",
  },
  {
    label: "Bài viết",
    icon: <SendIcon color="var(--color-title)" width={18} height={18} />,
    slug: "/admin/posts",
  },
  {
    label: "Danh mục",
    icon: <CategoryIcon color="var(--color-title)" width={18} height={18} />,
    slug: "/admin/categories",
  },
  {
    label: "Vai trò & quyền hạn",
    icon: <SheidIcon color="var(--color-title)" width={18} height={18} />,
    slug: "/admin/roles",
  },
];

export default function AdminSlideBar() {
  const pathname = usePathname();
  const { adminData, adminLogout } = useAdmin();
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await adminLogout();
      router.replace("/admin/login");
      showSuccessToast("Đăng xuất thành công");
    } catch (error) {
      showErrorToast("Đăng xuất thất bại");
      console.log("error", error);
    }
  };
  return (
    <Sidebar collapsible="icon" className="bg-(--color-background)!">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent active:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-(--color-primary) text-sidebar-primary-foreground">
                <LogoIcon color="#fff" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-(--color-title)">
                  Driftly
                </span>
                <span className="truncate text-xs text-(--color-text)">
                  Admin dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-(--color-title)">
            Platform
          </SidebarGroupLabel>
          <SidebarMenu>
            {MenuDashboardItems.map((item, index) => (
              <Link href={item.slug} key={index}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.label}
                    className={`text-(--color-title) hover:bg-(--color-dark-light) active:bg-(--color-dark-light) cursor-pointer ${
                      pathname === item.slug && "bg-(--color-dark-light)"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-(--color-text)">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="outline-0! focus:outline-0! active:outline-0! bg-(--color-card)! hover:bg-(--color-dark-light)!"
              >
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus:outline-0"
                >
                  <Avatar className="w-10 h-10 object-cover">
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-(--color-title)">
                      {adminData?.username}
                    </span>
                    <span className="truncate text-xs text-(--color-text)">
                      {adminData?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-(--color-title)" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-(--color-card) border-(--color-dark-light)"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem
                  className="text-(--color-text) hover:bg-(--color-dark-light)! hover:text-(--color-text)!"
                  onClick={() => setOpenProfile(true)}
                >
                  <User className="mr-2 size-4 text-(--color-text)" />
                  Tài khoản
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-(--color-text) hover:bg-(--color-primary)! hover:text-white!"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 size-4  hover:text-white!" />
                  Đăng xuẩt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <AdminProfileDrawer
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />
    </Sidebar>
  );
}
