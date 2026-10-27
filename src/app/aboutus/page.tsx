import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { TimelineSection } from "@/app/sections/TimelineSection";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CountUp, Parallax, ScrollWords } from "@/components/motion/scroll";
import { Magnetic } from "@/components/motion/interactive";
import { Marquee, SpinBadge, Sprinkles, SunRays } from "@/components/motion/decor";

export const metadata: Metadata = {
  title: "Our Story — 20 Years of Dairy Mastery",
  description:
    "From manufacturing Kwality Walls for Hindustan Unilever to launching our own premium brand — King Ice Cream by Vijaykant Dairy & Food Products Ltd., Belagavi. 40,000+ farmer families, 1,500+ villages, 100% pure milk.",
  openGraph: {
    title: "Our Story — King Ice Cream",
    description: "Two decades of dairy mastery. From HUL partnership to India's fastest-growing premium ice cream brand. 40,000+ farmer families, zero palm oil.",
    url: "https://www.kingicecream.com/aboutus",
    images: [{ url: "/images/logos/king logo.png", width: 1200, height: 630, alt: "King Ice Cream Story" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — King Ice Cream",
    description: "Two decades of dairy mastery. From HUL partnership to India's fastest-growing premium ice cream brand.",
  },
  alternates: {
    canonical: "https://www.kingicecream.com/aboutus",
  },
};

const stats = [
  { num: "2L+", label: "Litres procured daily" },
  { num: "1,500+", label: "Villages in network" },
  { num: "40K+", label: "Farmer families" },
  { num: "15K+", label: "Retail outlets" },
];

const promises = [
  { num: "01", title: "Pure Milk, No Compromise", desc: "Fresh milk from 1,500+ villages. No palm oil. No vegetable fat." },
  { num: "02", title: "HUL-Grade Manufacturing", desc: "World-class cold chain, FSSAI compliance, 1 lakh L/day capacity." },
  { num: "03", title: "Farmer-First Philosophy", desc: "40,000+ families supported. Fair prices. Six chilling centres." },
  { num: "04", title: "Tradition Meets Today", desc: "From matka kulfi to Gudbud — delivered across 15,000+ stores." },
];

export default function AboutUsPage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero */}
      <section className="king-page-hero flex min-h-[80svh] items-center bg-[#00799b] text-[#fff8e6]">
        <Sprinkles count={14} seed={9} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-50" />
        <div className="king-shell relative z-10">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-7 text-[#ffbf31]">Our Story</Reveal>
          <RevealTitle as="h1" className="king-page-title max-w-[1000px]" lines={["Two decades of", "dairy mastery.", "One crown to", <em key="r">rule them all.</em>]} gap={0.1} />
        </div>
        <div className="absolute -right-[16%] -bottom-[22%] h-[55vw] w-[55vw] rounded-full bg-[#ffbf31] opacity-20" aria-hidden="true" />
        <SunRays className="pointer-events-none absolute -right-[8%] bottom-[-20%] hidden aspect-square h-[90%] text-[#ffbf31]/25 lg:block" />
        <Parallax speed={70} rotate={6} className="pointer-events-none absolute -right-12 bottom-[-12%] hidden h-[85%] w-[36%] lg:block">
          <div aria-hidden="true" className="king-bob-slow relative h-full w-full rotate-12"><Image src="/images/Product Images copy/Matka Kulfi_Render.png" alt="" fill priority sizes="35vw" className="object-contain drop-shadow-2xl"/></div>
        </Parallax>
        <SpinBadge text="Since 2004 • Proudly Belagavi • " className="absolute bottom-[12%] right-[34%] z-10 hidden h-32 w-32 bg-[#fff8e6] text-[#073c50] shadow-[6px_8px_0_rgba(4,55,72,.25)] lg:grid">
          <span className="king-display block text-center text-3xl leading-none">20<span className="block text-[.6rem] tracking-[.2em]">YEARS</span></span>
        </SpinBadge>
      </section>

      {/* Opening statement */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="py-20 md:py-32">
        <div className="king-shell max-w-5xl">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-8 text-[#00799b]">The Beginning</Reveal>
          <ScrollWords className="font-heading text-xl font-semibold leading-[1.45] text-[#073c50] sm:text-2xl md:text-4xl" text="Before King Ice Cream ever reached your hands, we spent years perfecting the craft for someone else — producing millions of litres to the exacting standards of India’s largest FMCG company." />
          <RevealTitle as="p" className="king-section-title mt-12 text-[#073c50]" lines={["We didn’t start from scratch.", <span key="m" className="text-[#00799b]">We started from mastery.</span>]} />
        </div>
      </section>

      {/* Stats */}
      <HomeSectionDivider from="#fff8e6" to="#ffcf4f" />
      <section className="relative overflow-hidden bg-[#ffcf4f] py-14 md:py-20">
        <Sprinkles count={10} seed={31} className="opacity-50" />
        <Stagger className="king-shell relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5" gap={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="group rounded-[2rem] bg-[#fff8e6]/55 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-[#fff8e6] md:p-10">
              <CountUp value={stat.num} className="king-display block text-5xl text-[#073c50] md:text-7xl" />
              <span className="mt-4 block h-[3px] w-10 rounded-full bg-[#00799b] transition-all duration-500 group-hover:w-20" />
              <p className="king-page-kicker mt-4 text-[#073c50]/75">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Origin story */}
      <HomeSectionDivider from="#ffcf4f" to="#fff8e6" />
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="king-shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Origin</Reveal>
            <RevealTitle className="king-section-title" lines={["Rooted in", <em key="b">Belagavi.</em>]} />
            <Reveal delay={0.25} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#c9e4ef] px-5 py-3 text-sm font-black">
              <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00799b] opacity-60"/><span className="relative h-3 w-3 rounded-full bg-[#00799b]"/></span>
              Neginhal, Bailhongal · 12-acre campus
            </Reveal>
          </div>
          <Reveal delay={0.15} className="md:col-span-7">
            <p className="king-prose mb-5">
              Our 12-acre campus sits in Neginhal, Bailhongal, beside the fertile banks
              of the Malaprabha river. What began as a modest 5,000 litres per day
              operation in 2004 has grown into a dairy network spanning{" "}
              <span className="font-black text-[#00799b]">1,500+ villages</span>{" "}
              across Karnataka, Maharashtra, Goa, and Kerala.
            </p>
            <p className="king-prose text-[#073c50]/75">
              Our sister brand Adityaa Milk is a household name across North Karnataka
              and Goa. With a revenue of{" "}
              <span className="font-black text-[#073c50]">Rs. 304 Crore in FY25</span>,
              King Ice Cream is the crown jewel of the Vijaykant Dairy empire.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Promise */}
      <HomeSectionDivider from="#fff8e6" to="#06495d" />
      <section className="relative overflow-hidden bg-[#06495d] py-20 text-[#fff8e6] md:py-32">
        <Sprinkles count={10} seed={13} colors={["#ffbf31", "#f8bfd2"]} className="opacity-30" />
        <div className="king-shell relative">
          <div className="mb-12 max-w-3xl sm:mb-16">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#ffbf31]">Our Promise</Reveal>
            <RevealTitle className="king-section-title" lines={[<span key="l">What we <span className="text-[#ffbf31]">stand for.</span></span>]} />
          </div>
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {promises.map((item) => (
              <StaggerItem key={item.num} className="group relative h-full overflow-hidden rounded-[2rem] border border-[#fff8e6]/15 bg-[#fff8e6]/[.06] p-7 transition-colors duration-500 hover:text-[#073c50] md:p-9">
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-[#ffbf31] transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="king-display relative mb-10 block text-5xl text-[#ffbf31] transition-colors duration-500 group-hover:text-[#073c50]">{item.num}</span>
                <h3 className="relative mb-3 text-xl font-black leading-snug">{item.title}</h3>
                <p className="relative text-sm leading-relaxed opacity-75">{item.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <HomeSectionDivider from="#06495d" to="#c9e4ef" />
      <TimelineSection />
      <HomeSectionDivider from="#c9e4ef" to="#f8bfd2" />

      {/* Reach + Community */}
      <section className="relative overflow-hidden bg-[#f8bfd2] pt-20 md:pt-32">
        <div className="king-shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Reach &amp; Community</Reveal>
            <RevealTitle className="king-section-title mb-6" lines={["More than", <em key="j">just ice cream.</em>]} />
            <Reveal delay={0.2}><p className="text-xl font-black leading-tight sm:text-2xl">
              <CountUp value="15,000+" /> outlets.
              <br />
              <span className="text-[#00799b]">4 states and growing.</span>
            </p></Reveal>
          </div>
          <Reveal delay={0.15} className="space-y-5 md:col-span-7">
            <p className="king-prose">
              Every King Ice Cream you enjoy supports{" "}
              <span className="font-black">40,000+ farming families</span>. Our daily
              procurement of 2,00,000 litres flows through six chilling centres, creating
              thousands of rural livelihoods.
            </p>
            <p className="king-prose text-[#073c50]/75">
              Proudly made in Belagavi since 2004. Whether you&apos;re a customer, a farmer
              partner, or a retailer — you are part of the King family.
            </p>
            <Magnetic><TransitionLink href="/franchise" className="king-pill king-pill--teal mt-4">Join the family <ArrowUpRight size={18}/></TransitionLink></Magnetic>
          </Reveal>
        </div>
        <Marquee speed={1.7} className="mt-20 border-t-2 border-[#073c50]/10 py-5 md:mt-28">
          {["Karnataka", "Goa", "Maharashtra", "Kerala"].map(t => <span key={t} className="flex items-center gap-8 pr-8 text-[clamp(1.8rem,3.4vw,3rem)] font-black uppercase tracking-[-.03em]">{t}<span className="text-[#00799b]">✦</span></span>)}
        </Marquee>
      </section>

      <Footer transitionFrom="#f8bfd2" />
    </main>
  );
}
