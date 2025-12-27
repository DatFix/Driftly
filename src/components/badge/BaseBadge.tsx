import React, { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface BaseBadgeProps {
  count?: number | string;
  children: ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive";
  className?: string;
}

export default function BaseBadge({
  count,
  children,
  variant = "default",
  className = "",
}: BaseBadgeProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      {children}
      {count !== undefined && count !== null && (
        <Badge
          variant={variant}
          className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-xs rounded-full flex items-center justify-center font-mono tabular-nums"
        >
          {count}
        </Badge>
      )}
    </div>
  );
}
