import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { ContactForm } from "./ContactForm";
import { ArrowUpRight, Clock, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { CoverageMap } from "@/components/locate/CoverageMap";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/scroll";
import { Magnetic, Tilt } from "@/components/motion/interactive";
import { SpinBadge, Sprinkles } from "@/components/motion/decor";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with King Ice Cream",
  description:
    "Reach out to King Ice Cream for queries, feedback, franchise enquiries, wholesale partnerships, or bulk orders. Call 99002 55556 or email info@kingicecream.com. Vijaykant Dairy, Belagavi.",
  openGraph: {
    title: "Contact Us — King Ice Cream",
    description: "Get in touch with King Ice Cream. Call 99002 55556, email info@kingicecream.com, or message us on WhatsApp for franchise enquiries, bulk orders, and more.",
    url: "https://www.kingicecream.com/contact",
    images: [{ url: "/images/logos/king logo.png", width: 1200, height: 630, alt: "Contact King Ice Cream" }],
  },
  twitter: {
    card: "summary",
    title: "Contact Us — King Ice Cream",
    description: "Get in touch with King Ice Cream. Call 99002 55556 or email info@kingicecream.com.",
  },
  alternates: {
    canonical: "https://www.kingicecream.com/contact",
  },
};

const methods = [
  { kicker: "Call", title: "99002 55556", note: "Mon–Sat, 9 AM to 7 PM", href: "tel:+919900255556", icon: Phone, color: "#fff8e6", external: false },
  { kicker: "Email", title: "info@kingicecream.com", note: "We reply within 48 hours", href: "mailto:info@kingicecream.com", icon: Mail, color: "#c9e4ef", external: false },
  { kicker: "Instagram", title: "@kingicecream.india", note: "Behind the scenes", href: "https://www.instagram.com/kingicecream.india/", icon: Instagram, color: "#f8bfd2", external: true },
];

export default function ContactPage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero */}
      <section className="king-page-hero flex min-h-[70svh] items-end bg-[#f8bfd2]">
        <Sprinkles count={16} seed={33} className="opacity-60" />
        <div className="king-shell relative z-10 grid w-full grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Get in Touch</Reveal>
            <RevealTitle as="h1" className="king-page-title" lines={["Let’s", <span key="t" className="text-[#00799b]">talk.</span>]} gap={0.12} />
          </div>
          <Reveal delay={0.3} className="flex items-end md:col-span-5">
            <p className="king-prose max-w-md font-semibold">
              Whether it&apos;s a flavour suggestion, franchise enquiry, wholesale
              partnership, or just a compliment about your favourite scoop —
              we&apos;re all ears.
            </p>
          </Reveal>
        </div>
        <Parallax speed={60} rotate={6} className="pointer-events-none absolute -right-12 top-10 hidden h-[65%] w-[29%] lg:block">
          <div aria-hidden="true" className="king-bob-slow relative h-full w-full rotate-12"><Image src="/images/Product Images copy/100 ml Premium cup Kesar Pista.png" alt="" fill priority sizes="30vw" className="object-contain drop-shadow-2xl"/></div>
        </Parallax>
        <SpinBadge text="We reply within 48 hours • " className="absolute bottom-[12%] right-[3%] z-10 hidden h-28 w-28 bg-[#00799b] text-[#fff8e6] shadow-[6px_8px_0_rgba(7,60,80,.15)] lg:grid">
          <MessageCircle size={28} />
        </SpinBadge>
      </section>

      {/* Contact methods */}
      <HomeSectionDivider from="#f8bfd2" to="#ffcf4f" />
      <section className="bg-[#ffcf4f] py-16 md:py-24">
        <Stagger className="king-shell grid grid-cols-1 gap-4 md:grid-cols-3" gap={0.1}>
          {methods.map(m => (
            <StaggerItem key={m.kicker}>
              <Tilt className="h-full rounded-[2rem]" max={5}>
                <a href={m.href} {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-[2rem] p-8 md:p-10" style={{ backgroundColor: m.color }}>
                  <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-[#073c50] transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  <span className="relative mb-auto flex items-center justify-between">
                    <span className="king-page-kicker text-[#00799b] transition-colors duration-500 group-hover:text-[#ffbf31]">{m.kicker}</span>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#073c50] text-[#fff8e6] transition-all duration-500 group-hover:rotate-[-12deg] group-hover:bg-[#ffbf31] group-hover:text-[#073c50]"><m.icon size={20} /></span>
                  </span>
                  <span className="relative mt-10 block text-[1.2rem] font-black leading-tight transition-colors duration-500 [overflow-wrap:anywhere] group-hover:text-[#fff8e6] sm:text-2xl md:text-[1.45rem] xl:text-[1.7rem]">{m.title}</span>
                  <span className="relative mt-2 flex items-center justify-between text-sm font-semibold text-[#073c50]/70 transition-colors duration-500 group-hover:text-[#fff8e6]/75">{m.note}<ArrowUpRight size={18} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                </a>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Head office, hours and map */}
      <HomeSectionDivider from="#ffcf4f" to="#00799b" />
      <section className="relative overflow-hidden bg-[#00799b] py-20 text-[#fff8e6] md:py-28">
        <div className="king-shell grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal scale={0.94} className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[2rem] bg-[#00799b] ring-2 ring-[#fff8e6]/15">
            <CoverageMap className="block h-auto w-full" />
          </Reveal>
          <div>
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#ffbf31]">Head Office</Reveal>
            <RevealTitle className="king-section-title mb-6" lines={["Come say", <span key="h" className="text-[#ffbf31]">hello.</span>]} />
            <Reveal delay={0.15}>
              <h2 className="text-xl font-black leading-tight md:text-2xl">Vijaykant Dairy &amp; Food Products Ltd.</h2>
              <p className="mt-2 leading-[1.7] text-[#fff8e6]/80">Neginhal Village, Bailhongal Taluka,<br />Dist. Belagavi, Karnataka 591102</p>
            </Reveal>
            <Reveal delay={0.25} className="mt-8 max-w-md rounded-[1.5rem] bg-[#fff8e6]/10 p-6 backdrop-blur-sm">
              <p className="king-page-kicker mb-4 flex items-center gap-2 text-[#ffbf31]"><Clock size={14} /> Business Hours</p>
              <div className="flex items-baseline justify-between font-bold"><span>Mon — Sat</span><span className="text-[#fff8e6]/80">9 AM — 7 PM</span></div>
              <div className="my-3 h-px bg-[#fff8e6]/20" />
              <div className="flex items-baseline justify-between font-bold"><span>Sunday</span><span className="text-[#fff8e6]/80">Closed</span></div>
            </Reveal>
            <Reveal delay={0.35}><Magnetic><a href="https://www.google.com/maps/search/Vijaykant+Dairy+Neginhal+Bailhongal" target="_blank" rel="noopener noreferrer" className="king-pill mt-8">Get directions <ArrowUpRight size={18} /></a></Magnetic></Reveal>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <HomeSectionDivider from="#00799b" to="#c9e4ef" />
      <section className="bg-[#c9e4ef] py-20 md:py-32">
        <div className="king-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-6 text-[#00799b]">Send Us a Message</Reveal>
            <RevealTitle className="king-section-title mb-6" lines={[<span key="l">Write to <em>us.</em></span>]} />
            <Reveal delay={0.2}><p className="king-prose max-w-lg text-[#073c50]/75">
              Fill in your details and we&apos;ll open your email client with everything ready to send.
            </p></Reveal>
          </div>
          <Reveal delay={0.15}><ContactForm /></Reveal>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <HomeSectionDivider from="#c9e4ef" to="#ffcf4f" />
      <section className="relative overflow-hidden bg-[#ffcf4f] py-20 md:py-28">
        <Sprinkles count={10} seed={47} className="opacity-50" />
        <div className="king-shell relative grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-6 text-[#00799b]">Quick Connect</Reveal>
            <RevealTitle className="king-section-title mb-6" lines={[<span key="l">Prefer <span className="text-[#00799b]">WhatsApp?</span></span>]} />
            <Reveal delay={0.2}><p className="king-prose mb-10 max-w-lg">
              Drop us a message for franchise enquiries, bulk orders, or just to say hello.
            </p></Reveal>
            <Reveal delay={0.3}><Magnetic><a href="https://wa.me/919900255556" target="_blank" rel="noopener noreferrer" className="king-pill king-pill--teal">Message us on WhatsApp <ArrowUpRight size={18} /></a></Magnetic></Reveal>
          </div>
          <Stagger className="relative hidden flex-col gap-3 md:flex" gap={0.35} delay={0.3}>
            <StaggerItem className="max-w-[300px] self-start rounded-[1.5rem] rounded-bl-md bg-[#fff8e6] px-6 py-4 font-bold shadow-[6px_8px_0_rgba(7,60,80,.12)]">Hi King! Do you deliver to Hubballi? 🍦</StaggerItem>
            <StaggerItem className="max-w-[300px] self-end rounded-[1.5rem] rounded-br-md bg-[#00799b] px-6 py-4 font-bold text-[#fff8e6] shadow-[6px_8px_0_rgba(7,60,80,.12)]">We sure do — 150+ outlets in Hubli-Dharwad!</StaggerItem>
            <StaggerItem className="flex max-w-[120px] gap-1.5 self-start rounded-[1.5rem] rounded-bl-md bg-[#fff8e6] px-6 py-5 shadow-[6px_8px_0_rgba(7,60,80,.12)]">
              {[0, 1, 2].map(i => <span key={i} className="king-bob h-2.5 w-2.5 rounded-full bg-[#073c50]/50" style={{ animationDuration: "1.2s", animationDelay: `${i * 0.15}s` }} />)}
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <Footer transitionFrom="#ffcf4f" />
    </main>
  );
}
