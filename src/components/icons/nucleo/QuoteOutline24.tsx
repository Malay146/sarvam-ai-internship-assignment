import type { SVGProps } from "react";

export type QuoteOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function QuoteOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: QuoteOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M9 7V5.58114C9 4.6369 9.60421 3.7986 10.5 3.5V3.5" stroke="currentColor" strokeWidth={strokeWidth} data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M3 7V5.58114C3 4.6369 3.60421 3.7986 4.5 3.5V3.5" stroke="currentColor" strokeWidth={strokeWidth} data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M21 15L3 15" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M21 3H17" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M21 21L3 21" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M21 9H17" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M6 6H2V10H6V6Z" fill="currentColor" data-color="color-2" data-cap="butt" data-stroke="none"></path> <path d="M12 6H8V10H12V6Z" fill="currentColor" data-color="color-2" data-cap="butt" data-stroke="none"></path></svg>
  );
}
