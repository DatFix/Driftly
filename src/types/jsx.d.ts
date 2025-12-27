import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        direction?: "up" | "down" | "left" | "right";
        loop?: string | number;
        width?: string | number;
        height?: string | number;
      };
    }
  }
}
