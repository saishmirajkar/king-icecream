import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { CoverageExplorer } from "@/components/locate/CoverageExplorer";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CountUp, Parallax } from "@/components/motion/scroll";
import { Magnetic, Tilt } from "@/components/motion/interactive";
import { Sprinkles, SunRays } from "@/components/motion/decor";

export const metadata: Metadata = {
  title: "Find a Parlour Near You — 15,000+ Outlets",
  description:
    "Find a King Ice Cream parlour or retail outlet near you. Available across 15,000+ stores in Karnataka (Belagavi, Hubli, Mangaluru, Bengaluru), Goa (Panaji, Margao), Maharashtra (Kolhapur, Pune), and Kerala. Order on Zomato & Swiggy.",
  openGraph: {
    title: "Find King Ice Cream Near You",
    description: "15,000+ outlets across Karnataka, Goa, Maharashtra & Kerala. Find your nearest King Ice Cream parlour or order online via Zomato & Swiggy.",
    url: "https://www.kingicecream.com/locate",
    images: [{ url: "/images/logos/king logo.png", width: 1200, height: 630, alt: "Find King Ice Cream" }],
  },
  twitter: {
    card: "summary",
    title: "Find King Ice Cream Near You — 15,000+ Outlets",
    description: "Find your nearest King Ice Cream parlour across 4 states.",
  },
  alternates: {
    canonical: "https://www.kingicecream.com/locate",
  },
};

const channels = [
  { kicker: "Order Online", title: "Zomato", note: "Doorstep delivery in Belagavi", href: "https://www.zomato.com/belgaum/king-ice-cream-25-belgaum-locality/order", logo: "/images/logos/Zomato-Logo-700x394.png", color: "#ffd6d6" },
  { kicker: "Order Online", title: "Swiggy", note: "Cold, fast, at your door", href: "https://www.swiggy.com/city/belgaum/king-ice-cream-camp-camp-area-rest1077734", logo: "/images/logos/Swiggy_Logo_2024.webp", color: "#ffe1c7" },
  { kicker: "Retail & Parlours", title: "15,000+ Stores", note: "Plus exclusive King parlours with the full menu", href: null, logo: null, color: "#fff8e6" },
];

export default function LocatePage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero */}
      <section className="king-page-hero bg-[#ffcf4f]">
        <Sprinkles count={16} seed={27} className="opacity-60" />
        <div className="king-shell relative z-10">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-7 text-[#00799b]">15,000+ Outlets across 4 states</Reveal>
          <RevealTitle as="h1" className="king-page-title max-w-5xl" lines={["Find Us", <span key="n" className="text-[#00799b]">near you.</span>]} gap={0.12} />
          <Reveal delay={0.3}><p className="mt-8 max-w-lg text-lg font-semibold">From Belagavi to your neighbourhood, there&apos;s always a King moment close by.</p></Reveal>
          <Reveal delay={0.4} className="mt-9 flex flex-wrap items-end gap-10">
            {[{ v: "15,000+", l: "Retail outlets" }, { v: "16", l: "Key cities" }, { v: "4", l: "States" }].map(s => (
              <div key={s.l}><CountUp value={s.v} className="king-display block text-[clamp(2.4rem,4vw,3.6rem)] text-[#073c50]" /><span className="king-page-kicker !text-[.65rem] text-[#073c50]/70">{s.l}</span></div>
            ))}
          </Reveal>
        </div>
        <SunRays className="pointer-events-none absolute -bottom-[30%] right-[2%] hidden aspect-square h-[100%] text-[#fff8e6]/40 md:block" />
        <Parallax speed={60} rotate={6} className="pointer-events-none absolute -bottom-20 right-0 hidden h-[85%] w-[34%] md:block">
          <div aria-hidden="true" className="king-bob-slow relative h-full w-full rotate-12"><Image src="/images/Product Images copy/Mango Sip Up_Mockup.png" alt="" fill priority sizes="35vw" className="object-contain drop-shadow-2xl"/></div>
        </Parallax>
      </section>

      {/* Coverage map + regions */}
      <HomeSectionDivider from="#ffcf4f" to="#fff8e6" />
      <section className="py-20 md:py-32">
        <CoverageExplorer />
      </section>

      {/* Also available on */}
      <HomeSectionDivider from="#fff8e6" to="#f8bfd2" />
      <section className="bg-[#f8bfd2] py-20 md:py-28">
        <div className="king-shell">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Also available on</Reveal>
          <RevealTitle className="king-section-title mb-12" lines={["Craving it", <em key="n">right now?</em>]} />
          <Stagger className="grid gap-4 md:grid-cols-3" gap={0.1}>
            {channels.map(c => {
              const inner = (
                <>
                  <span aria-hidden="true" className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#fff8e6]/50 transition-transform duration-700 group-hover:scale-[1.8]" />
                  <span className="king-page-kicker relative mb-6 text-[#00799b]">{c.kicker}</span>
                  {c.logo ? <span className="relative block h-12 w-36"><Image src={c.logo} alt={c.title} fill sizes="144px" className="object-contain object-left" /></span> : <span className="king-display relative block text-4xl md:text-5xl">{c.title}</span>}
                  <span className="relative mt-4 block font-semibold text-[#073c50]/75">{c.note}</span>
                  {c.href && <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider">Order now <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>}
                </>
              );
              return (
                <StaggerItem key={c.title}>
                  <Tilt className="h-full rounded-[2rem]" max={5}>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="group relative block h-full overflow-hidden rounded-[2rem] p-8 md:p-10" style={{ backgroundColor: c.color }}>{inner}</a>
                      : <div className="group relative h-full overflow-hidden rounded-[2rem] p-8 md:p-10" style={{ backgroundColor: c.color }}>{inner}</div>}
                  </Tilt>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <HomeSectionDivider from="#f8bfd2" to="#00799b" />
      <section className="relative overflow-hidden bg-[#00799b] py-20 text-[#fff8e6] md:py-28">
        <Sprinkles count={12} seed={41} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-40" />
        <div className="king-shell relative">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-6 text-[#ffbf31]">Not Nearby Yet?</Reveal>
          <RevealTitle className="king-section-title mb-6" lines={[<span key="l">Can&apos;t find <span className="text-[#ffbf31]">us?</span></span>]} />
          <Reveal delay={0.2}><p className="king-prose mb-10 max-w-lg text-[#fff8e6]/80">
            We&apos;re expanding every day. If King Ice Cream isn&apos;t in your
            neighbourhood yet, let us know — or consider opening a franchise.
          </p></Reveal>
          <Reveal delay={0.3} className="flex flex-wrap gap-4">
            <Magnetic><TransitionLink href="/franchise" className="king-pill">Open a Franchise <ArrowUpRight size={18}/></TransitionLink></Magnetic>
            <Magnetic><TransitionLink href="/contact" className="king-pill king-pill--outline">Contact Us <ArrowUpRight size={18}/></TransitionLink></Magnetic>
          </Reveal>
        </div>
      </section>

      <Footer transitionFrom="#00799b" />
    </main>
  );
}
