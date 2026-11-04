import type { SVGProps } from "react";

export type Mobile2Outline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function Mobile2Outline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: Mobile2Outline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M17 2L7.00003 2C5.89546 2 5.00003 2.89543 5.00003 4L5.00003 20C5.00003 21.1046 5.89546 22 7.00003 22L17 22C18.1046 22 19 21.1046 19 20L19 4C19 2.89543 18.1046 2 17 2Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M13.4397 5.12062L10.5603 5.12062C10.527 5.12062 10.5 5.09362 10.5 5.06031C10.5 5.027 10.527 5 10.5603 5L13.4397 5C13.473 5 13.5 5.027 13.5 5.06031C13.5 5.09362 13.473 5.12062 13.4397 5.12062Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M12 19C12.6904 19 13.25 18.4404 13.25 17.75C13.25 17.0596 12.6904 16.5 12 16.5C11.3096 16.5 10.75 17.0596 10.75 17.75C10.75 18.4404 11.3096 19 12 19Z" fill="currentColor" data-color="color-2" data-cap="butt" data-stroke="none"></path></svg>
  );
}
