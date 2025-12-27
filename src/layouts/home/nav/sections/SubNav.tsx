import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TiwtterIcon,
} from "@/components/icons/BaseIcon";
import { useIpLocation } from "@/hooks/others/useIpLocation";
import Link from "next/link";
import { ReactNode } from "react";

export default function SubNav() {
  const location = useIpLocation();
  return (
    <div className="w-full bg-linear-to-r from-[#5686FF] to-[#FF5671] py-2">
      <div className="max-w-7xl flex items-center justify-between mx-auto px-5 lg:px-0">
        <div className="items-center justify-start gap-2 hidden md:flex">
          <LinkItem
            href="#"
            content={<TiwtterIcon color="#FFF" width={20} height={20} />}
          />
          <LinkItem
            href="#"
            content={<FacebookIcon color="#FFF" width={20} height={20} />}
          />
          <LinkItem
            href="#"
            content={<InstagramIcon color="#FFF" width={20} height={20} />}
          />
          <LinkItem
            href="#"
            content={<TelegramIcon color="#FFF" width={20} height={20} />}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          {location && (
            <p className="text-white text-sm font-medium">{location} - </p>
          )}
          <p className="text-white text-sm font-medium">
            {new Date().toLocaleDateString("VN-vi")}
          </p>
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
