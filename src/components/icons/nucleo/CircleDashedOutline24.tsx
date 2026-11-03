import type { SVGProps } from "react";

export type CircleDashedOutline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function CircleDashedOutline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: CircleDashedOutline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="m3.633,6.52c-.334.511-.626,1.061-.869,1.645-.243.585-.426,1.179-.552,1.777" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m9.959,2.209c-.598.125-1.193.307-1.778.549-.585.242-1.135.533-1.647.866" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m17.48,3.633c-.511-.334-1.061-.626-1.645-.869-.585-.243-1.179-.426-1.777-.552" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m21.791,9.959c-.125-.598-.307-1.193-.549-1.778-.242-.585-.533-1.135-.866-1.647" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m20.367,17.48c.334-.511.626-1.061.869-1.645.243-.585.426-1.179.552-1.777" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m14.041,21.791c.598-.125,1.193-.307,1.778-.549.585-.242,1.135-.533,1.647-.866" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m6.52,20.367c.511.334,1.061.626,1.645.869.585.243,1.179.426,1.777.552" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} data-color="color-2" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path><path d="m2.209,14.041c.125.598.307,1.193.549,1.778.242.585.533,1.135.866,1.647" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth={strokeWidth} strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
