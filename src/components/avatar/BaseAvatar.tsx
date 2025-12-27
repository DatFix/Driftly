import { getInitials } from "@/utils/getInitials.utils";
import { UserIcon } from "../icons/BaseIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function BaseAvatar({
  url,
  size = 40,
  name,
}: {
  url?: string;
  size?: number;
  name?: string;
}) {
  return (
    <Avatar
      className="bg-(--color-primary)"
      style={{ width: size, height: size }}
    >
      <AvatarImage src={url || ""} alt="avatar" className="object-cover" />
      <AvatarFallback className="scale-[0.99]">
        {!name || name?.trim() === "" ? (
          <UserIcon
            width={size - 10}
            height={size - 10}
            stroke={1.5}
            color="#FFF"
          />
        ) : name?.includes("user") ? (
          <UserIcon
            width={size - 10}
            height={size - 10}
            stroke={1.5}
            color="#FFF"
          />
        ) : (
          <p className="text-white">{getInitials(name)}</p>
        )}
      </AvatarFallback>
    </Avatar>
  );
}
