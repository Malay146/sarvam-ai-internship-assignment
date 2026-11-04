// Indus Cowork roles: shared data (server + client).
import type { ComponentType, SVGProps } from "react";
import { BriefcaseFill, ChartFill, MegaphoneFill, TargetFill, UserFill } from "@/components/icons";

type Ic = ComponentType<SVGProps<SVGSVGElement>>;
export type Tone = "indigo" | "orange" | "green" | "rose";
/* Roles [verified: sarvam.ai/indus-cowork]; the request and plan lines are illustrative, written from each role's description. */
export const ROLES: { key: string; role: string; icon: Ic; tone: Tone; ask: string; plan: string[]; result: string; apps: string[] }[] = [
  { key: "sales", role: "Sales Outbound", icon: TargetFill, tone: "indigo", ask: "Work the new inbound list before EOD and draft outreach.",
    plan: ["Research each account", "Score contacts on intent", "Draft email and LinkedIn in your voice", "Leave a review list"], result: "31 drafts ready for your review", apps: ["Gmail", "Google Sheets", "Slack"] },
  { key: "talent", role: "Talent Scout", icon: UserFill, tone: "rose", ask: "Find strong candidates for the backend role.",
    plan: ["Source candidates", "Screen against the role", "Draft warm outreach", "Hand over a shortlist"], result: "A shortlist, ready for your review", apps: ["Gmail", "Notion", "Google Calendar"] },
  { key: "media", role: "Paid Media", icon: MegaphoneFill, tone: "green", ask: "Keep an eye on spend across this week's campaigns.",
    plan: ["Watch spend and cost per result", "Flag wasted budget", "Recommend the moves", "Wait for your yes"], result: "3 changes waiting for your yes", apps: ["Google Sheets", "Slack", "BigQuery"] },
  { key: "product", role: "Product Performance", icon: ChartFill, tone: "orange", ask: "Write this week's funnel readout.",
    plan: ["Pull the funnel", "Spot the drop-offs", "Explain the reason, not just the number", "Draft the weekly readout"], result: "Weekly readout drafted for review", apps: ["PostHog", "Metabase", "Notion"] },
  { key: "cos", role: "Chief of Staff", icon: BriefcaseFill, tone: "indigo", ask: "Chase the owners on this week's blockers.",
    plan: ["Find the open blockers", "Chase each owner", "Prepare your review", "Record every decision"], result: "Review pack and decision log ready", apps: ["Slack", "Linear", "Google Docs"] },
];
