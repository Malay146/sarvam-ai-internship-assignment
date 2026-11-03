import { Eyebrow, Nav, SYSTEM_NAV } from "@/components/sarvam";
import Maker from "./Maker";
import "../banners.css";

export const metadata = { title: "Make a banner · Sarvam design system" };

export default function MakePage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="All banners" ctaHref="/banners" />
      <main className="sr-container bn-page sr-under-nav">
        <header className="bn-intro">
          <Eyebrow>Banner builder</Eyebrow>
          <h1 className="sr-display-product">Build a banner without a prompt</h1>
          <p className="sr-lead">Start from a situation, then change any part: background, device, shape, text treatment, wordmark. One headline and at most one supporting line. Every format updates live. Rules: <code>recipes/banner-builder.md</code>.</p>
        </header>
        <Maker />
      </main>
    </>
  );
}
