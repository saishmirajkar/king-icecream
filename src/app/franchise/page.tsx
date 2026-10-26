import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { FranchiseForm } from "./FranchiseForm";
import {
  TrendingUp,
  ShieldCheck,
  Truck,
  GraduationCap,
} from "lucide-react";

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
  },
  {
    icon: TrendingUp,
    title: "Proven Demand",
    desc: "15,000+ retail outlets already serving King Ice Cream across 4 states. The brand is growing fast.",
  },
  {
    icon: Truck,
    title: "End-to-End Supply",
    desc: "Cold chain logistics, marketing support, and consistent stock from our 1 lakh litres/day facility.",
  },
  {
    icon: GraduationCap,
    title: "Full Training & Support",
    desc: "From store setup to staff training to launch marketing — we walk with you every step.",
  },
];

export default function FranchisePage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero */}
      <section className="king-page-hero flex min-h-[75svh] items-center bg-[#00799b] text-[#fff8e6]">
        <div className="king-shell relative z-10">
          <span className="king-page-kicker mb-7 text-[#ffbf31]">
            Partner With Us
          </span>
          <h1 className="king-page-title king-reveal max-w-[1100px]">
            Own a King
            <br />
            <em>
              Ice Cream Parlour
            </em>
          </h1>
          <p className="king-prose mt-8 max-w-lg text-[#fff8e6]/85">
            Join India&apos;s fastest-growing premium ice cream brand — backed
            by 20 years of Vijaykant Dairy&apos;s manufacturing excellence.
          </p>
        </div>
        <div className="pointer-events-none absolute -bottom-20 -right-10 hidden h-[85%] w-[35%] rotate-12 opacity-75 lg:block" aria-hidden="true"><Image src="/images/Product Images copy/700ml_Alphonso Mango.png" alt="" fill sizes="36vw" className="object-contain drop-shadow-2xl"/></div>
      </section>

      {/* Why Franchise with King */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="bg-[#fff8e6] py-20 md:py-32">
        <div className="king-shell mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Why Partner With Us
              </span>
            </div>
            <h2 className="king-section-title">
              Built on twenty years of
              <br />
              <em>dairy mastery.</em>
            </h2>
          </div>
        </div>

        <div className="king-shell">
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-[2rem] bg-[#c9e4ef] p-7 transition-transform duration-300 hover:-translate-y-1 md:p-10"
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-[#00799b] text-[#fff8e6]">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="king-display mb-3 text-2xl leading-tight md:text-4xl">
                  {b.title}
                </h3>
                <p className="king-prose max-w-sm text-[#073c50]/75">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <HomeSectionDivider from="#fff8e6" to="#ffcf4f" />
      <section className="bg-[#ffcf4f] py-20 md:py-32">
        <div className="king-shell mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                The Journey
              </span>
            </div>
            <h2 className="king-section-title">
              From enquiry to
              <br />
              <em>opening day.</em>
            </h2>
          </div>
        </div>

        <div className="king-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Submit Interest",
                desc: "Fill the form with your details and preferred location.",
              },
              {
                step: "02",
                title: "Discovery Call",
                desc: "We discuss investment, location needs and your questions.",
              },
              {
                step: "03",
                title: "Site & Agreement",
                desc: "We help finalise location, agreement and store design.",
              },
              {
                step: "04",
                title: "Launch",
                desc: "Training, stock delivery and launch marketing support.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group rounded-[1.75rem] bg-[#fff8e6] p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                <div className="flex items-baseline justify-between mb-4 sm:mb-5">
                  <span className="king-display text-5xl text-[#00799b]">
                    {s.step}
                  </span>
                  <span className="h-[1px] w-8 sm:w-10 bg-border group-hover:bg-gold transition-colors" />
                </div>
                <h3 className="mb-2 text-xl font-black leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#073c50]/75">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <HomeSectionDivider from="#ffcf4f" to="#06495d" />
      <section className="relative overflow-hidden bg-[#06495d] py-20 text-[#fff8e6] md:py-32">
        <div className="king-shell relative max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="king-page-kicker text-[#ffbf31]">
              Franchise Enquiry
            </span>
          </div>

          <h2 className="king-section-title mb-6">
            Get
            <span className="text-[#ffbf31]"> started.</span>
          </h2>
          <p className="king-prose mb-10 max-w-lg text-[#fff8e6]/80">
            Fill in your details and our franchise team will get back to you
            within 48 hours.
          </p>

          <FranchiseForm />
        </div>
      </section>

      <Footer transitionFrom="#06495d" />
    </main>
  );
}
