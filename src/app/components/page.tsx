import { BookOpen, CalendarClock, Globe, Library, Plug, ShieldCheck, Sparkles } from "@/components/icons";
import {
  Button, ButtonRow, CardGrid, Checklist, Chip, CtaCard, Eyebrow, Faq, FeatureRow, Footer, IconTile,
  CoworkDashboard, EmblemArt, EmblemCard, FactCard, SYSTEM_NAV, FeatureBento, ScheduleDashboard, TileCard, GatewayFrame, GlowCard, MockChecklist, MockPlan, MockResearch, MockReview, Motif, Nav, SectionHeader, Steps, Timeline, TrustBand, HeroGlow,
} from "@/components/sarvam";
import { FLOWER_PRESETS, MEDALLION_PRESETS, flowerPath, glowSVG, medallionPath } from "@/lib/shapes";
import "./showcase.css";

export const metadata = { title: "Components · Sarvam design system" };

function Block({ id, name, note, children }: { id: string; name: string; note: string; children: React.ReactNode }) {
  return (
    <section id={id} className="sr-container cs-block">
      <div className="cs-label">
        <code>{name}</code>
        <span className="sr-meta">{note}</span>
      </div>
      {children}
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Indus Cowork page" ctaHref="/" />
      <main className="cs-page sr-under-nav">
        <HeroGlow />
        <header className="sr-container cs-intro">
          <Motif />
          <Eyebrow>Sarvam design system</Eyebrow>
          <h1 className="sr-display-product">Components</h1>
          <p className="sr-lead">
            Every component reads from <code>tokens.css</code> and follows <code>components.md</code>. Resize the window: each one rearranges at
            768 and 1024, and every sibling set keeps equal heights and line counts.
          </p>
        </header>

        <Block id="buttons" name="Button · Chip" note="Pill, 44px min tap height, inset bevel, press scale 0.97 (verified)">
          <div className="cs-row">
            <ButtonRow>
              <Button>Talk to Us</Button>
              <Button variant="secondary">See how it works</Button>
              <Button variant="ghost" arrow>Explore the Trust Center</Button>
            </ButtonRow>
            <ButtonRow>
              <Button size="lg" display>Talk to Us</Button>
              <Button size="lg" variant="secondary" display>See how it works</Button>
            </ButtonRow>
            <ButtonRow>
              <Chip>Sales Outbound</Chip><Chip tone="indigo">Go-to-market</Chip><Chip tone="orange">Paid Media</Chip><Chip tone="green">Completed in 3m 40s</Chip>
            </ButtonRow>
          </div>
          <div className="cs-dark">
            <ButtonRow><Button variant="on-dark">Talk to Us</Button><Button variant="secondary">See how it works</Button></ButtonRow>
          </div>
        </Block>

        <Block id="icons" name="IconTile" note="Stroke icons only (24 grid, 1.5 stroke). Icon ≥ 3:1 against its tile, fixing Sarvam's same-tone pairs">
          <div className="cs-contrast">
            <div className="cs-contrast__col">
              <Eyebrow mono>Sarvam (same tone)</Eyebrow>
              <div className="cs-contrast__tiles">
                <span className="sr-icon-tile" style={{ background: "var(--color-sr-indigo-100)", color: "var(--color-sr-indigo-500)" }}><Sparkles strokeWidth={1.5} /></span>
                <span className="sr-icon-tile" style={{ background: "var(--color-sr-orange-100)", color: "var(--color-sr-orange-800)" }}><Globe strokeWidth={1.5} /></span>
                <span className="sr-icon-tile" style={{ background: "var(--color-sr-green-100)", color: "var(--color-sr-green-600)" }}><Library strokeWidth={1.5} /></span>
              </div>
              <span className="sr-meta">2.9 · 3.0 · 2.6 : 1. Below the 3:1 minimum for graphics</span>
            </div>
            <div className="cs-contrast__col">
              <Eyebrow mono>Ours</Eyebrow>
              <div className="cs-contrast__tiles">
                <IconTile icon={Sparkles} tone="indigo" /><IconTile icon={Globe} tone="orange" /><IconTile icon={Library} tone="green" />
                <IconTile icon={Plug} tone="neutral" />
              </div>
              <span className="sr-meta">7.3 · 5.3 · 5.1 : 1. Same hue, one shade family darker</span>
            </div>
          </div>
        </Block>

        <Block id="headers" name="SectionHeader" note="chapter: left on phone, centred from 768 · split: stacked on phone, 1.2fr / 1fr from 768">
          <SectionHeader eyebrow="Indus Cowork" eyebrowTone="accent" title="It runs the whole task, start to finish." lead="Every teammate plans, researches and checks its own work, so you hand off the outcome and not the steps." />
          <SectionHeader variant="split" large eyebrow="Connected to your work" title="Plugs into the stack you already run on" lead="Connect the tools your team already uses. With more than 100 connectors, teammates work where your work lives." />
        </Block>

        <Block id="cards" name="Card · CardGrid" note="1 col phone → horizontal cards on tablet → 3 cols with subgrid from 1024">
          <CardGrid name="building blocks" cards={[
            { icon: Sparkles, eyebrow: "Skills", title: "Teach it once", desc: "Write it once and every teammate can use and improve it." },
            { icon: CalendarClock, eyebrow: "Scheduled tasks", title: "Runs on its own", desc: "Set a report once and it arrives on its own every morning." },
            { icon: BookOpen, eyebrow: "Knowledge base", title: "Never forgets", desc: "Store your context once and every task can draw on it." },
          ]} />
        </Block>

        <Block id="mesh" name="Mesh surfaces" note="Sarvam's verified recipes: 3-layer mesh glow, light card mesh, dark orbs, night. All with grain">
          <div className="cs-mesh-grid">
            {[["sr-mesh sr-mesh--indigo", "mesh · indigo"], ["sr-mesh sr-mesh--sunset", "mesh · sunset"], ["sr-mesh sr-mesh--green", "mesh · green"], ["sr-mesh sr-mesh--marigold", "mesh · marigold"], ["sr-mesh sr-mesh--indigo-deep", "mesh · indigo deep"]].map(([c, n]) => (
              <figure key={n} className="cs-mesh"><div className={c} /><figcaption className="sr-meta">{n}</figcaption></figure>
            ))}
            <figure className="cs-mesh"><div style={{ background: "var(--mesh-card-light)" }} /><figcaption className="sr-meta">card · light mesh</figcaption></figure>
            <figure className="cs-mesh"><div style={{ background: "var(--mesh-orb-indigo)" }} /><figcaption className="sr-meta">orb · indigo</figcaption></figure>
            <figure className="cs-mesh"><div className="sr-gradient-night" /><figcaption className="sr-meta">night (CTA)</figcaption></figure>
          </div>
        </Block>

        <Block id="gateway" name="GatewayFrame" note="Studio shapes as windows: onto a gradient, a tint, or product UI. Inset frame line optional">
          <div className="cs-gateways">
            <GatewayFrame id="g1" shape="Domed door" surface="sr-gradient-dusk" frameInk="light" label="Gateway window onto the dusk gradient" />
            <GatewayFrame id="g2" shape="Mihrab" surface="sr-gradient-indigo-glow" frameInk="light" label="Mihrab window onto indigo glow" />
            <GatewayFrame id="g3" shape="Ogee cross" surface="sr-tint-orange" frameInk="dark" label="Ogee cross onto an orange tint" />
            <GatewayFrame id="g4" shape="Framed jharokha" label="Jharokha window onto product UI">
              <div className="sr-tint-indigo" style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", padding: "18% 14%" }}>
                <MockChecklist label="To-do" items={[{ text: "Gather the inputs", state: "done" }, { text: "Draft the outline", state: "active" }]} />
              </div>
            </GatewayFrame>
          </div>
        </Block>

        <Block id="dashboards" name="CoworkDashboard · ScheduleDashboard" note="Working dashboards. Click a teammate, a follow-up, type a message, approve. The schedule's clock fires tasks; toggle, run now, approve or decline. Idle demos loop on their own">
          <CoworkDashboard />
          <ScheduleDashboard />
        </Block>

        <Block id="features" name="FeatureRow" note="Each panel shows a different moment of the work (plan → research → review), not the same card three times · phone: visual first · 768+: visual right, never alternating">
          <div className="sr-feature-stack" data-siblings="feature rows">
            <FeatureRow tone="indigo" title="Plans the work first." body="It turns your request into a to-do list and works through it." checklist={["Breaks the task into steps", "Orders the work itself", "Tracks progress as it goes"]} cta={<ButtonRow><Button>Talk to Us</Button></ButtonRow>}
              visual={<MockPlan />} />
            <FeatureRow tone="orange" title="Researches on its own." body="Web search is built in, so it finds what it needs as it works." checklist={["Searches the web as it works", "Pulls from your connected apps", "Re-plans when it learns more"]} cta={<ButtonRow><Button>Talk to Us</Button></ButtonRow>}
              visual={<MockResearch />} />
            <FeatureRow tone="green" title="Checks its own work." body="It reviews its own work and fixes weak spots before you see it." checklist={["Reviews its own output", "Refines until it is right", "Returns it for your approval"]} cta={<ButtonRow><Button>Talk to Us</Button></ButtonRow>}
              visual={<MockReview />} />
          </div>
        </Block>

        <Block id="bento" name="FeatureBento" note="Variant: one wide tile + two equal tiles (subgrid rows) · phone: stacked · same three moments, a denser layout">
          <FeatureBento items={[
            { tone: "indigo", title: "It plans before it starts", body: "Your request becomes a to-do list it works through in order.", visual: <MockPlan /> },
            { tone: "orange", title: "It researches", body: "Web search is built in, so the plan stays current as it works.", visual: <MockResearch /> },
            { tone: "green", title: "It checks its work", body: "It sources every claim, then comes back to ask for your yes.", visual: <MockReview /> },
          ]} />
        </Block>

        <Block id="tiles" name="TileCard" note="Crisp glow tile (sharp gradient rim + fine inner highlight, 1px edges) beside a title and one line · stacked until 1280, then 3 across">
          <div className="sr-tile-row" data-siblings="deployment tiles">
            <TileCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Ogee cross"]), "lavender", "t1")} title="Sarvam Cloud" desc="Fully managed and scales on its own. Fastest to value." />
            <TileCard svg={glowSVG(flowerPath(FLOWER_PRESETS["Rosette"]), "rose", "t2")} title="Private Cloud (VPC)" desc="Inside your own security perimeter, managed by Sarvam." />
            <TileCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "leaf", "t3")} title="On-Premises" desc="Full control and air-gapped, for regulated industries." />
          </div>
        </Block>

        <Block id="emblems" name="EmblemArt · EmblemCard" note="Our assets only: a named gradient + grain · echo rings (the emblem's own gateway/medallion/lotus outline repeated outward, fading, with a soft glow) · a crisp white emblem with an inner shadow · the icon in the surface's accessible shade">
          <div className="sr-card-row" data-siblings="emblem cards">
            <EmblemCard art={<EmblemArt id="e1" shape={{ family: "medallion", preset: "Ogee cross" }} icon={Globe} surface="lavender" />} eyebrow="Languages" title="Built for India" desc="Teammates work in the very languages your teams already use." />
            <EmblemCard art={<EmblemArt id="e2" shape={{ family: "flower", preset: "Lotus" }} icon={Sparkles} surface="dawn" />} eyebrow="Sovereign" title="Runs on Sarvam" desc="Runs on Sarvam's own models, with data residency kept in India." />
            <EmblemCard art={<EmblemArt id="e3" shape={{ family: "medallion", preset: "Lantern medallion" }} icon={ShieldCheck} surface="leaf" />} eyebrow="Trust" title="Your yes first" desc="Nothing ships until you approve it, and every single step is logged." />
          </div>
          <div className="cs-emblem-banner"><EmblemArt id="e4" shape={{ family: "gateway", preset: "Domed door" }} icon={Sparkles} surface="indigo" aspect={2.4} label="Gateway emblem on indigo glow" /></div>
        </Block>

        <Block id="card-variants" name="GlowCard · FactCard" note="Card variants: a soft studio shape as the header, or one verified fact set large (no invented numbers)">
          <div className="sr-card-row" data-siblings="glow cards">
            <GlowCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Ogee cross"]), "lavender", "gc1", true, "crisp", 16 / 10, 0.66)} eyebrow="Skills" title="Teach it once" desc="Write it down once and every teammate can use and improve it." />
            <GlowCard svg={glowSVG(flowerPath(FLOWER_PRESETS["Kamal"]), "rose", "gc2", true, "crisp", 16 / 10, 0.66)} eyebrow="Scheduled tasks" title="Runs on its own" desc="Set a report up once and it arrives on its own every morning." />
            <GlowCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "leaf", "gc3", true, "crisp", 16 / 10, 0.66)} eyebrow="Knowledge base" title="Never forgets" desc="Store your context once and every chat and task can draw on it." />
          </div>
          <div className="sr-card-row sr-card-row--facts" data-siblings="fact cards">
            <FactCard fact="100+" label="Connected apps" note="Works with Gmail, Slack, Notion, GitHub, Jira, BigQuery and more." />
            <FactCard fact="Your yes" label="Before it ships" note="Sending, merging and any changes always wait for your approval." />
            <FactCard fact="India" label="Data residency" note="Data for Indian deployments is stored in India, under your control." />
          </div>
        </Block>

        <Block id="steps" name="Steps" note="Phone: stacked with a connecting line · 768+: 3 columns, numbers on top (subgrid rows)">
          <Steps steps={[
            { title: "Hand over the task", body: "Message a teammate in Slack or Indus Chat, the way you would a colleague." },
            { title: "It works on its own", body: "It searches the web and uses your apps to work out each next step by itself." },
            { title: "You approve the result", body: "It reviews its own output, then brings the finished work back for your yes." },
          ]} />
        </Block>

        <Block id="timeline" name="Timeline" note="Phone: vertical · tablet: 2 columns · 1024+: horizontal line with 5 events">
          <Timeline events={[
            { time: "06:00", title: "Cluster check", body: "Health report waiting before anyone on the team logs on." },
            { time: "08:00", title: "Standup digest", body: "Yesterday across all your tools, summarised in Slack." },
            { time: "12:00", title: "Inbox, cleared", body: "Replies drafted and parked, the two for you flagged." },
            { time: "17:00", title: "Spend watch", body: "Wasted budget caught early, with a fix ready to approve." },
            { time: "Fri", title: "Weekly readout", body: "The numbers and the reasons behind them, for review." },
          ]} />
        </Block>

        <Block id="trust" name="TrustBand" note="sr-indigo-950 panel (verified) · points 1 → 2 columns · title left from 1024">
          <TrustBand title="Sovereign by default" lead="Powerful teammates you can hand real work to, without handing over control." points={[
            { title: "Your data stays with you", body: "Knowledge and task history stay together in your own workspace." },
            { title: "Nothing ships without you", body: "Sending, merging and changes always wait for your approval first." },
            { title: "Every task leaves a trail", body: "Review what each teammate did, step by step, in a live record." },
            { title: "Built on Sarvam's stack", body: "Runs on Sarvam's own models, with data residency in India." },
          ]} />
        </Block>

        <Block id="faq" name="Faq" note="Native details/summary · 44px min rows · chevron rotates (300ms, emphasized ease)">
          <div className="cs-narrow">
            <Faq items={[
              { q: "How can my team get access?", a: "Indus Cowork is not generally available yet. Talk to us about your team's workflows and access." },
              { q: "How is Indus Cowork different from a chat assistant?", a: "A chat assistant answers a question. A Cowork teammate plans the work, acts inside your apps and brings the result back for your approval." },
              { q: "Which apps can a teammate connect to?", a: "More than 100 connectors across productivity, data and engineering tools, plus your own custom connectors." },
            ]} />
          </div>
        </Block>

        <Block id="cta" name="CtaCard" note="Verified night gradient #13121e → #a5bbfc + grain · dark pill CTA (white glass on the light bottom fails contrast)">
          <CtaCard title="Meet your first teammate." cta={<Button size="lg">Talk to Us</Button>} />
        </Block>

        <Block id="checklist" name="Checklist" note="Stroke check icons in the tone's accessible shade">
          <div className="cs-checks">
            <Checklist tone="indigo" items={["Breaks the task into steps", "Orders the work itself"]} />
            <Checklist tone="orange" items={["Searches the web as it works", "Pulls from your apps"]} />
            <Checklist tone="green" items={["Reviews its own output", "Returns it for approval"]} />
          </div>
        </Block>
      </main>
      <Footer />
    </>
  );
}

