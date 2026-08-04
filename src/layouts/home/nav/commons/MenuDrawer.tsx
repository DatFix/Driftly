import BaseDrawer from "@/components/drawers/BaseDrawer";
import { LogoIcon } from "@/components/icons/BaseIcon";
import LogoBrand from "./LogoBrand";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/auth/ICategory.interface";
import { CategoryApis } from "@/api";
import Link from "next/link";
import ThemeToggle from "../others/ThemeToggle";
import BaseAvatar from "@/components/avatar/BaseAvatar";
import { useAuth } from "@/context/AuthContext";
import { IImage } from "@/interfaces/public/IPost.interface";

export default function MenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [menuItems, setMenuItems] = useState<ICategory[]>([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchMenuItems() {
      const res = await CategoryApis.getMulti();
      setMenuItems(res);
    }
    fetchMenuItems();
  }, []);

  return (
    <BaseDrawer open={open} onClose={onClose} placement="left" >
      <div className="md:mx-10">
        <LogoBrand />
        <h1 className="text-md font-medium my-2 bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Đăng tải theo phong cách của bạn
        </h1>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item) => (
            <Link
              onClick={onClose}
              key={item.id}
              href={item.slug}
              className="focus:outline-0 text-(--color-title) relative overflow-hidden group px-3 py-2 rounded-sm font-medium"
            >
              <p className="relative z-10">{item.name}</p>
              <span className="absolute inset-0 bg-(--color-dark-light) scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            </Link>
          ))}
      </div>
    </BaseDrawer>
  );
}

export function MenuDrawerSkeleton({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BaseDrawer open={open} onClose={onClose} placement="left" width="450px">
      <div className="md:mx-10">
        <LogoBrand />
        <h1 className="text-md font-medium my-2 bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Đăng tải theo phong cách của bạn
        </h1>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="px-5 py-3 bg-(--color-card-hover) animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    </BaseDrawer>
  );
}
