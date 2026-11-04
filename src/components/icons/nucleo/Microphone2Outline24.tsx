import type { SVGProps } from "react";

export type Microphone2Outline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function Microphone2Outline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: Microphone2Outline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M16 11L16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6L8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M20 11V11C20 15.4183 16.4183 19 12 19V19C7.58172 19 4 15.4183 4 11V11" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M12 19V22" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
