import type { SVGProps } from "react";

export type BooksOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function BooksOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: BooksOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><rect x="3" y="3" width={7} height={18} stroke="currentColor" strokeWidth={strokeWidth} fill="none" data-cap="butt" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "butt"}></rect> <path d="M6.5 7V11" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M10 17L3 17" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <rect x="11" y="3.81174" width={7} height={18} transform="rotate(-15 11 3.81174)" stroke="currentColor" strokeWidth={strokeWidth} fill="none" data-cap="butt" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "butt"}></rect> <path d="M15.416 6.76956L16.4513 10.6333" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M21.3849 15.5229L14.6235 17.3347" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
