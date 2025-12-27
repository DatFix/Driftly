import BaseDrawer from "@/components/drawers/BaseDrawer";
import {
  FacebookIcon,
  InstagramIcon,
  LogoIcon,
  MenuIcon,
  TelegramIcon,
  TiwtterIcon,
} from "@/components/icons/BaseIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode, useState } from "react";
import MenuDrawer from "../commons/MenuDrawer";
import LogoBrand from "../commons/LogoBrand";

export default function MainScrollNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-(--color-card) py-5 fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="items-center justify-start gap-2 hidden md:flex">
          <LinkItem href="#" content={<TiwtterIcon width={20} height={20} />} />
          <LinkItem
            href="#"
            content={<FacebookIcon width={20} height={20} />}
          />
          <LinkItem
            href="#"
            content={<InstagramIcon width={20} height={20} />}
          />
          <LinkItem
            href="#"
            content={<TelegramIcon width={20} height={20} />}
          />
        </div>

        <LogoBrand />

        <div>
          <div className="cursor-pointer" onClick={() => setOpen(true)}>
            <MenuIcon width={40} height={40} />
          </div>
          <MenuDrawer open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

const LinkItem = ({ content, href }: { content: ReactNode; href: string }) => {
  return (
    <Link
      href={href}
      className="hover:-translate-y-1 transition-all duration-200"
    >
      {content}
    </Link>
  );
};
