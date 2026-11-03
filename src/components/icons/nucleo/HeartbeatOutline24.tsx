import type { SVGProps } from "react";

export type HeartbeatOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function HeartbeatOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: HeartbeatOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M19.4409 15C20.9155 13.2352 22 11.2744 22 9.378C22 6.408 19.588 4 16.616 4C14.656 4 13.192 5.228 12 6.606C10.81 5.226 9.344 4 7.384 4C4.41 4 2 6.408 2 9.378C2 11.2744 3.08448 13.2352 4.55913 15" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M2 19H8L10 15.1111L14 22.1111L16 19H22" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
