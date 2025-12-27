import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

export default function BaseHoverCard({
  content,
  children,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-fit">{content}</HoverCardContent>
    </HoverCard>
  );
}
