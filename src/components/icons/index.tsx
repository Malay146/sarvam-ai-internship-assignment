// Icons: Nucleo Core, outline, 24px (licensed: Nucleo Pro). The ONLY icon source for the Sarvam system.
// Defaults follow components.md §3: stroke 1.5, round caps/joins. Components were copied from the local
// Nucleo install into this repo (never import from ~/.nucleo). Add new icons the same way.
import type { SVGProps } from "react";
import { ArrowRightOutline24 } from "./nucleo/ArrowRightOutline24";
import { ArrowUpOutline24 } from "./nucleo/ArrowUpOutline24";
import { ArrowUpRightOutline24 } from "./nucleo/ArrowUpRightOutline24";
import { BookOpenOutline24 } from "./nucleo/BookOpenOutline24";
import { BooksOutline24 } from "./nucleo/BooksOutline24";
import { CalendarClockOutline24 } from "./nucleo/CalendarClockOutline24";
import { ChartBarTrendUpOutline24 } from "./nucleo/ChartBarTrendUpOutline24";
import { CheckOutline24 } from "./nucleo/CheckOutline24";
import { ChevronDownOutline24 } from "./nucleo/ChevronDownOutline24";
import { CircleCheckOutline24 } from "./nucleo/CircleCheckOutline24";
import { CircleDashedOutline24 } from "./nucleo/CircleDashedOutline24";
import { ClockOutline24 } from "./nucleo/ClockOutline24";
import { GlobeOutline24 } from "./nucleo/GlobeOutline24";
import { HeartbeatOutline24 } from "./nucleo/HeartbeatOutline24";
import { InboxArrowDownOutline24 } from "./nucleo/InboxArrowDownOutline24";
import { LockOutline24 } from "./nucleo/LockOutline24";
import { MagnifierOutline24 } from "./nucleo/MagnifierOutline24";
import { MediaPlayOutline24 } from "./nucleo/MediaPlayOutline24";
import { MegaphoneOutline24 } from "./nucleo/MegaphoneOutline24";
import { MenuBarsOutline24 } from "./nucleo/MenuBarsOutline24";
import { PlugOutline24 } from "./nucleo/PlugOutline24";
import { ShieldCheckOutline24 } from "./nucleo/ShieldCheckOutline24";
import { SparkleOutline24 } from "./nucleo/SparkleOutline24";
import { SpinnerLoaderOutline24 } from "./nucleo/SpinnerLoaderOutline24";
import { SuitcaseOutline24 } from "./nucleo/SuitcaseOutline24";
import { TargetOutline24 } from "./nucleo/TargetOutline24";
import { UserOutline24 } from "./nucleo/UserOutline24";
import { XmarkOutline24 } from "./nucleo/XmarkOutline24";

export type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number | string; corners?: "round" | "square"; size?: number };
type NucleoIcon = (p: SVGProps<SVGSVGElement> & { strokeWidth?: number | string; corners?: "round" | "square" }) => React.JSX.Element;
function make(C: NucleoIcon, name: string) {
  const Icon = ({ strokeWidth = 1.5, corners = "round", size, width, height, ...rest }: IconProps) =>
    <C strokeWidth={strokeWidth} corners={corners} width={width ?? size ?? 24} height={height ?? size ?? 24} {...rest} />;
  Icon.displayName = name;
  return Icon;
}

export const ArrowRight = make(ArrowRightOutline24, "ArrowRight");
export const ArrowUp = make(ArrowUpOutline24, "ArrowUp");
export const ArrowUpRight = make(ArrowUpRightOutline24, "ArrowUpRight");
export const Check = make(CheckOutline24, "Check");
export const ChevronDown = make(ChevronDownOutline24, "ChevronDown");
export const Circle = make(CircleDashedOutline24, "Circle");
export const CircleCheck = make(CircleCheckOutline24, "CircleCheck");
export const Menu = make(MenuBarsOutline24, "Menu");
export const Globe = make(GlobeOutline24, "Globe");
export const Sparkles = make(SparkleOutline24, "Sparkles");
export const Search = make(MagnifierOutline24, "Search");
export const UserRound = make(UserOutline24, "UserRound");
export const LoaderCircle = make(SpinnerLoaderOutline24, "LoaderCircle");
export const BarChart3 = make(ChartBarTrendUpOutline24, "BarChart3");
export const BriefcaseBusiness = make(SuitcaseOutline24, "BriefcaseBusiness");
export const Clock = make(ClockOutline24, "Clock");
export const HeartPulse = make(HeartbeatOutline24, "HeartPulse");
export const Inbox = make(InboxArrowDownOutline24, "Inbox");
export const Megaphone = make(MegaphoneOutline24, "Megaphone");
export const Play = make(MediaPlayOutline24, "Play");
export const Target = make(TargetOutline24, "Target");
export const X = make(XmarkOutline24, "X");
export const BookOpen = make(BookOpenOutline24, "BookOpen");
export const CalendarClock = make(CalendarClockOutline24, "CalendarClock");
export const Library = make(BooksOutline24, "Library");
export const Plug = make(PlugOutline24, "Plug");
export const ShieldCheck = make(ShieldCheckOutline24, "ShieldCheck");
export const Lock = make(LockOutline24, "Lock");
