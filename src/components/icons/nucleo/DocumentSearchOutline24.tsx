import type { SVGProps } from "react";

export type DocumentSearchOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function DocumentSearchOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: DocumentSearchOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M3 20H21" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M3 16H8" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M3 12H10.5H10" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M3 4H10.5H10" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M16 8L9 8H9.5" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M15 14C18.3137 14 21 11.3137 21 8C21 4.68629 18.3137 2 15 2C11.6863 2 9 4.68629 9 8C9 11.3137 11.6863 14 15 14Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M22.5 15.5L19.2198 12.2198L19.4522 12.4522" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
