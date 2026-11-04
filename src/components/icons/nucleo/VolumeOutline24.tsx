import type { SVGProps } from "react";

export type VolumeOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function VolumeOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: VolumeOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M20 22L12 17H5C3.89543 17 3 16.1046 3 15V12V9C3 7.89543 3.89543 7 5 7H12L20 2V22Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
