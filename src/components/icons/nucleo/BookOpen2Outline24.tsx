import type { SVGProps } from "react";

export type BookOpen2Outline24Props = SVGProps<SVGSVGElement> & {
  strokeWidth?: number | string;
  corners?: "round" | "square";
};

export function BookOpen2Outline24({
  strokeWidth = 2,
  corners = "square",
  ...props
}: BookOpen2Outline24Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path d="M12 20.25V20.5V4.75V5" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" data-color="color-2" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path> <path d="M12 20.4999C15.5002 18.4997 19.4998 18.4997 23 20.4999V4.99993C19.4998 2.9997 15.5002 2.9997 12 4.99993C8.49975 2.9997 4.50025 2.99987 1 5.0001V20.4999C4.50025 18.4997 8.49975 18.4997 12 20.4999Z" stroke="currentColor" strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none" strokeLinejoin={corners === "round" ? "round" : "miter"} strokeLinecap={corners === "round" ? "round" : "square"}></path></svg>
  );
}
