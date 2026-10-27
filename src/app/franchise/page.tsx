import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { FranchiseForm } from "./FranchiseForm";
import {
  ArrowUpRight,
  Check,
  TrendingUp,
  ShieldCheck,
  Truck,
  GraduationCap,
} from "lucide-react";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CountUp, DrawLine, Parallax } from "@/components/motion/scroll";
import { Magnetic, Tilt } from "@/components/motion/interactive";
import { Sprinkles, SunRays } from "@/components/motion/decor";

export const metadata: Metadata = {
  title: "Franchise Opportunities — Own a King Ice Cream Parlour",
  description:
    "Open a King Ice Cream franchise. Backed by Vijaykant Dairy's 20 years of dairy expertise, HUL-grade manufacturing, end-to-end supply chain, and a brand already in 15,000+ outlets across 4 states. Apply today.",
  openGraph: {
    title: "Own a King Ice Cream Franchise",
    description: "Partner with India's fastest-growing premium ice cream brand. HUL-grade quality, proven demand across 15,000+ outlets, full training & supply chain support.",
    url: "https://www.kingicecream.com/franchise",
    images: [{ url: "/images/logos/king logo.png", width: 1200, height: 630, alt: "King Ice Cream Franchise" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Own a King Ice Cream Franchise",
    description: "Partner with India's fastest-growing premium ice cream brand. HUL-grade quality, 15,000+ outlets, full support.",
  },
  alternates: {
    canonical: "https://www.kingicecream.com/franchise",
  },
};

const benefits = [
  {
    icon: ShieldCheck,
    title: "HUL-Grade Quality",
    desc: "Our facility manufactured for Hindustan Unilever. You get the same world-class product and processes.",
    color: "#c9e4ef",
  },
  {
    icon: TrendingUp,
    title: "Proven Demand",
    desc: "15,000+ retail outlets already serving King Ice Cream across 4 states. The brand is growing fast.",
    color: "#f8bfd2",
  },
  {
    icon: Truck,
    title: "End-to-End Supply",
    desc: "Cold chain logistics, marketing support, and consistent stock from our 1 lakh litres/day facility.",
    color: "#ffd6b7",
  },
  {
    icon: GraduationCap,
    title: "Full Training & Support",
    desc: "From store setup to staff training to launch marketing — we walk with you every step.",
    color: "#ddd0ee",
  },
];

const steps = [
  { step: "01", title: "Submit Interest", desc: "Fill the form with your details and preferred location." },
  { step: "02", title: "Discovery Call", desc: "We discuss investment, location needs and your questions." },
  { step: "03", title: "Site & Agreement", desc: "We help finalise location, agreement and store design." },
  { step: "04", title: "Launch", desc: "Training, stock delivery and launch marketing support." },
];

export default function FranchisePage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero */}
      <section className="king-page-hero flex min-h-[80svh] items-center bg-[#00799b] text-[#fff8e6]">
        <Sprinkles count={14} seed={19} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-50" />
        <div className="king-shell relative z-10">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-7 text-[#ffbf31]">Partner With Us</Reveal>
          <RevealTitle as="h1" className="king-page-title max-w-[1100px]" lines={["Own a King", <em key="p">Ice Cream Parlour</em>]} gap={0.12} />
          <Reveal delay={0.3}><p className="king-prose mt-8 max-w-lg text-[#fff8e6]/85">
            Join India&apos;s fastest-growing premium ice cream brand — backed
            by 20 years of Vijaykant Dairy&apos;s manufacturing excellence.
          </p></Reveal>
          <Reveal delay={0.4} className="mt-9 flex flex-wrap items-center gap-6">
            <Magnetic><a href="#enquiry" className="king-pill">Apply now <ArrowUpRight size={18}/></a></Magnetic>
            <div className="flex gap-8">
              {[{ v: "15,000+", l: "Outlets" }, { v: "4", l: "States" }, { v: "48 hr", l: "Response" }].map(s => (
                <div key={s.l}><CountUp value={s.v} className="king-display block text-3xl text-[#ffbf31]" /><span className="king-page-kicker !text-[.62rem] text-[#fff8e6]/70">{s.l}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
        <SunRays className="pointer-events-none absolute -bottom-[25%] -right-[6%] hidden aspect-square h-[95%] text-[#ffbf31]/20 lg:block" />
        <Parallax speed={70} rotate={5} className="pointer-events-none absolute -bottom-20 -right-10 hidden h-[85%] w-[35%] lg:block">
          <div aria-hidden="true" className="king-bob-slow relative h-full w-full rotate-12"><Image src="/images/Product Images copy/700ml_Alphonso Mango.png" alt="" fill priority sizes="36vw" className="object-contain drop-shadow-2xl"/></div>
        </Parallax>
      </section>

      {/* Why Franchise with King */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="bg-[#fff8e6] py-20 md:py-32">
        <div className="king-shell mb-12">
          <div className="max-w-2xl">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Why Partner With Us</Reveal>
            <RevealTitle className="king-section-title" lines={["Built on twenty years of", <em key="d">dairy mastery.</em>]} />
          </div>
        </div>

        <Stagger className="king-shell grid gap-4 sm:grid-cols-2" gap={0.1}>
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <Tilt className="h-full rounded-[2rem]" max={5}>
                <div className="group relative h-full overflow-hidden rounded-[2rem] p-7 md:p-10" style={{ backgroundColor: b.color }}>
                  <span aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#fff8e6]/40 transition-transform duration-700 group-hover:scale-[2.2]" />
                  <div className="relative mb-8 grid h-16 w-16 place-items-center rounded-full bg-[#073c50] text-[#fff8e6] transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110">
                    <b.icon className="h-7 w-7" />
                  </div>
                  <h3 className="king-display relative mb-3 text-3xl leading-tight md:text-4xl">{b.title}</h3>
                  <p className="king-prose relative max-w-sm text-[#073c50]/75">{b.desc}</p>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How it works */}
      <HomeSectionDivider from="#fff8e6" to="#ffcf4f" />
      <section className="relative overflow-hidden bg-[#ffcf4f] py-20 md:py-32">
        <Sprinkles count={10} seed={23} className="opacity-50" />
        <div className="king-shell relative mb-14">
          <div className="max-w-2xl">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">The Journey</Reveal>
            <RevealTitle className="king-section-title" lines={["From enquiry to", <em key="o">opening day.</em>]} />
          </div>
        </div>

        <div className="king-shell relative">
          <DrawLine className="absolute left-[12%] right-[12%] top-[38px] hidden h-[3px] lg:block" />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.15}>
            {steps.map((s) => (
              <StaggerItem key={s.step} className="relative">
                <div className="relative z-10 mx-auto mb-6 grid h-[78px] w-[78px] place-items-center rounded-full bg-[#073c50] text-[#ffbf31] shadow-[0_0_0_8px_#ffcf4f] lg:mx-0 lg:ml-[calc(50%-39px)]">
                  <span className="king-display text-3xl">{s.step}</span>
                </div>
                <div className="group h-full rounded-[1.75rem] bg-[#fff8e6] p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(7,60,80,.12)] md:p-8">
                  <h3 className="mb-2 text-xl font-black leading-snug">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#073c50]/75">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Enquiry Form */}
      <HomeSectionDivider from="#ffcf4f" to="#06495d" />
      <section id="enquiry" className="relative scroll-mt-24 overflow-hidden bg-[#06495d] py-20 text-[#fff8e6] md:py-32">
        <Sprinkles count={10} seed={37} colors={["#ffbf31", "#f8bfd2"]} className="opacity-30" />
        <div className="king-shell relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-6 text-[#ffbf31]">Franchise Enquiry</Reveal>
            <RevealTitle className="king-section-title mb-6" lines={[<span key="l">Get <span className="text-[#ffbf31]">started.</span></span>]} />
            <Reveal delay={0.2}><p className="king-prose mb-10 max-w-lg text-[#fff8e6]/80">
              Fill in your details and our franchise team will get back to you
              within 48 hours.
            </p></Reveal>
            <Stagger className="hidden space-y-4 lg:block" gap={0.1} delay={0.2}>
              {["A brand already loved in 15,000+ stores", "Stock, training and marketing from day one", "A team that answers within 48 hours"].map(t => (
                <StaggerItem key={t} className="flex items-center gap-4 font-bold"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffbf31] text-[#073c50]"><Check size={18} strokeWidth={3}/></span>{t}</StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15}><FranchiseForm /></Reveal>
        </div>
      </section>

      <Footer transitionFrom="#06495d" />
    </main>
  );
}
