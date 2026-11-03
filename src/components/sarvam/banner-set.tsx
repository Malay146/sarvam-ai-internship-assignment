// The submission banner set (all Indus Cowork). Same three campaigns on Meta and LinkedIn, rearranged per format.
import type { ReactNode } from "react";
import { CampaignBanner, CommunityBanner, FORMATS, ProductBanner, type BannerFormat } from "./banners";

export type BannerSpec = { id: string; platform: "Meta" | "LinkedIn"; expression: "Campaign" | "Product" | "Community"; format: BannerFormat; render: () => ReactNode };
export const BANNERS: BannerSpec[] = [
  { id: "meta-1-launch", platform: "Meta", expression: "Campaign", format: "portrait", render: () => <CampaignBanner format="portrait" /> },
  { id: "meta-2-plans", platform: "Meta", expression: "Product", format: "portrait", render: () => <ProductBanner format="portrait" /> },
  { id: "meta-3-slack", platform: "Meta", expression: "Community", format: "square", render: () => <CommunityBanner format="square" /> },
  { id: "linkedin-1-launch", platform: "LinkedIn", expression: "Campaign", format: "landscape", render: () => <CampaignBanner format="landscape" /> },
  { id: "linkedin-2-plans", platform: "LinkedIn", expression: "Product", format: "landscape", render: () => <ProductBanner format="landscape" /> },
  { id: "linkedin-3-slack", platform: "LinkedIn", expression: "Community", format: "landscape", render: () => <CommunityBanner format="landscape" /> },
];
export const sizeOf = (b: BannerSpec) => FORMATS[b.format];
