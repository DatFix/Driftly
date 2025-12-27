"use client";
import { ArrowBottomIcon, UpdatedIcon } from "@/components/icons/BaseIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ThemeToggle from "../others/ThemeToggle";
import { BaseDropdown } from "@/components/dropdowns/BaseDropdown";
import LogoBrand from "../commons/LogoBrand";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { CategoryApis } from "@/api";
import { useRouter } from "next/navigation";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import { useUserStore } from "@/stores/useUserStore";
import { IImage } from "@/interfaces/public/IPost.interface";

interface MenuItemProps {
  title: string;
  url: string;
  isChildren?: boolean;
  children?: MenuItemProps[];
}

export default function MainTopNav() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [menuItems, setMenuItems] = useState<ICategory[]>([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const res = await CategoryApis.getMulti();
      setMenuItems(res);
    }
    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <div className="bg-(--color-card)">
        <div className="flex items-center justify-between max-w-7xl mx-auto animate-pulse h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-5 w-16 bg-gray-300 rounded"></div>
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
            <div className="h-5 w-14 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Khi user đã load xong
  return (
    <div className="bg-(--color-card) py-4 transition-opacity duration-500 h-20">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <LogoBrand />

        {/* Menu */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href={"/"}
            className="focus:outline-0 text-(--color-title) relative overflow-hidden group px-3 py-2 rounded-sm font-medium"
          >
            <p className="relative z-10">Trang chủ</p>
            <span className="absolute inset-0 bg-(--color-dark-light) scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
          </Link>

          {menuItems &&
            menuItems.length > 0 &&
            menuItems.map(
              (item) =>
                item.isActive === true &&
                (item.children && item.children.length > 0 ? (
                  <BaseDropdown
                    key={item.id}
                    items={item?.children.map((cat) => ({
                      label: cat?.name ?? "",
                      onClick: () => router.push(`/${cat?.slug}`),
                      // icon: <UpdatedIcon />
                    }))}
                  >
                    <Link
                      key={item.id}
                      href={item.slug}
                      className="focus:outline-0 text-(--color-title) relative overflow-hidden group px-3 py-2 rounded-sm font-medium flex items-center justify-center gap-1"
                    >
                      <p className="relative z-10">{item.name}</p>
                      <ArrowBottomIcon stroke={1} width={18} height={18} />
                      <span className="absolute inset-0 bg-(--color-dark-light) scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                    </Link>
                  </BaseDropdown>
                ) : (
                  <Link
                    key={item.id}
                    href={item.slug}
                    className="focus:outline-0 text-(--color-title) relative overflow-hidden group px-3 py-2 rounded-sm font-medium"
                  >
                    <p className="relative z-10">{item.name}</p>
                    <span className="absolute inset-0 bg-(--color-dark-light) scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                  </Link>
                ))
            )}

          <ThemeToggle />

          {/* Tài khoản */}
          {user ? (
            <Link
              href={`/profile/${user?.id}`}
              className="relative overflow-hidden group px-3 py-1.5 rounded-sm font-medium"
            >
              {/* <BaseAvatar
                url={(userData?.avatar as IImage)?.url}
                name={userData?.username}
              /> */}
              <BaseAvatar
                url={(user?.avatar as IImage)?.url}
                name={user?.username}
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-(--color-title) relative overflow-hidden group px-3 py-1 rounded-sm font-medium"
            >
              <p className="relative z-10">Tài khoản</p>
              <span className="absolute inset-0 bg-(--color-dark-light) scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
