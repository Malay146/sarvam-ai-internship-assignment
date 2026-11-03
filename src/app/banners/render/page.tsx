// Raw render of one banner spec at exact size: /banners/render?f=portrait&id=x&b=<base64url JSON spec>
import { Suspense } from "react";
import { Banner, type BannerSpec } from "@/components/sarvam";
import type { BannerFormat } from "@/components/sarvam/banners";

type Search = Promise<{ b?: string; f?: string; id?: string }>;

// searchParams is request data: read it inside Suspense so the route shell can still prerender (cacheComponents).
async function Render({ searchParams }: { searchParams: Search }) {
  const { b, f = "portrait", id = "x" } = await searchParams;
  const spec = JSON.parse(Buffer.from(b ?? "", "base64url").toString("utf8")) as BannerSpec;
  return <div id="banner" style={{ position: "absolute", top: 0, left: 0 }}><Banner spec={spec} format={f as BannerFormat} id={id} /></div>;
}

export default function Page({ searchParams }: { searchParams: Search }) {
  return <Suspense fallback={null}><Render searchParams={searchParams} /></Suspense>;
}
