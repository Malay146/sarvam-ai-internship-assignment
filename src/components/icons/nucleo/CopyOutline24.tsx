import type { SVGProps } from "react";

export type CopyOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function CopyOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: CopyOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M5 1H19" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M21 5H3V22H21V5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
