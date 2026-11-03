import type { SVGProps } from "react";

export type MegaphoneOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function MegaphoneOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: MegaphoneOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="m6,15.25v3.335c0,.443.291.833.716.959l3.626,1.074c.399.118.83-.023,1.082-.356l2.029-2.683" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" data-cap="butt" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "butt"}></path><path d="m18,20V2" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m2,14l16,5" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-cap="butt" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "butt"}></path><path d="m18,3L2,8" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-cap="butt" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "butt"}></path><path d="m22,12.723c.595-.346,1-.984,1-1.723s-.405-1.376-1-1.723v3.445Z" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m2,7v8" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
