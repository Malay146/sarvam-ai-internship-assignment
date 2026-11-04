import { Eyebrow, Footer, Nav, SYSTEM_NAV } from "@/components/sarvam";
import Studio from "./Studio";
import "./studio.css";

export const metadata = { title: "Studio · Sarvam design system" };

export default function StudioPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Indus Cowork page" ctaHref="/" />
      <main className="sr-container st-page sr-under-nav">
        <header className="st-intro">
          <Eyebrow>Tool</Eyebrow>
          <h1 className="sr-display-product">Pattern studio</h1>
          <p className="sr-lead">
            Generate gateway shapes, line motifs and scroll dividers from Sarvam&apos;s visual language. Preview them as windows onto the brand surfaces,
            then export SVG or a clip-path for banners and pages. These are the only shape families the system allows: one hero device per piece, and
            patterns only where asked. Rules: <code>imagery.md</code> §2–3.
          </p>
        </header>
        <Studio />
      </main>
      <Footer />
    </>
  );
}
