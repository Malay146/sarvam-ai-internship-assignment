import type { SVGProps } from "react";

export type NewspaperOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function NewspaperOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: NewspaperOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><line x1="9" y1="13" x2="17" y2="13" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></line><line x1="9" y1="17" x2="17" y2="17" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></line><rect x="9" y="7" width={8} height={2} fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></rect><path d="m3,21h16c1.105,0,2-.895,2-2V3H5v15.893c0,.996-.681,1.92-1.664,2.08-1.253.204-2.336-.758-2.336-1.973v-6" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-cap="butt" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "butt"}></path></svg>
  );
}
