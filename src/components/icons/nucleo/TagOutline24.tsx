import type { SVGProps } from "react";

export type TagOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function TagOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: TagOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="m21.414,11.914L11.5,2H2v9.5l9.914,9.914c.781.781,2.047.781,2.828,0l6.672-6.672c.781-.781.781-2.047,0-2.828Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></circle></svg>
  );
}
