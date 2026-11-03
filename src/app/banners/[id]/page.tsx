// Raw banner at its exact pixel size (used by scripts/export-banners.mjs).
import { notFound } from "next/navigation";
import { BANNERS } from "@/components/sarvam";

export default async function BannerRaw({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = BANNERS.find((x) => x.id === id);
  if (!b) notFound();
  return <div id="banner" style={{ position: "absolute", top: 0, left: 0 }}>{b.render()}</div>;
}
