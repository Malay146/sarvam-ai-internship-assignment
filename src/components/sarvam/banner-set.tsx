// The submission banner set = banners/briefs.json (the same file the exporter and the builder's "Save" use).
import briefs from "../../../banners/briefs.json";
import { FORMATS, type BannerFormat } from "./banners";
import type { BannerSpec } from "./composer";

export type BannerEntry = { id: string; formats: { meta: BannerFormat; linkedin: BannerFormat }; spec: BannerSpec };
export const BANNER_BRIEFS = briefs as BannerEntry[];
export const sizeOfFormat = (f: BannerFormat) => FORMATS[f];
