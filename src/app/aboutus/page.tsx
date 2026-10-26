import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { TimelineSection } from "@/app/sections/TimelineSection";

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

export default function AboutUsPage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero — compact */}
      <section className="king-page-hero flex min-h-[75svh] items-center bg-[#00799b] text-[#fff8e6]">
        <div className="king-shell relative z-10">
          <span className="king-page-kicker king-reveal mb-7 text-[#ffbf31]">
            Our Story
          </span>
          <h1 className="king-page-title king-reveal max-w-[1000px]">
            Two decades of
            <br />
            <span>dairy mastery.</span>
            <br />
            One crown to
            <br />
            <em>rule them all.</em>
          </h1>
        </div>
        <div className="absolute -right-[16%] -bottom-[22%] h-[55vw] w-[55vw] rounded-full bg-[#ffbf31] opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-12 bottom-[-12%] hidden h-[85%] w-[36%] rotate-12 opacity-80 lg:block" aria-hidden="true"><Image src="/images/Product Images copy/Matka Kulfi_Render.png" alt="" fill sizes="35vw" className="object-contain drop-shadow-2xl"/></div>
      </section>

      {/* Opening statement */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="py-20 md:py-32">
        <div className="king-shell max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="king-page-kicker text-[#00799b]">
              The Beginning
            </span>
          </div>
          <p className="font-heading text-xl font-semibold leading-[1.45] text-[#073c50] sm:text-2xl md:text-4xl">
            Before King Ice Cream ever reached your hands, we spent years perfecting
            the craft for someone else — producing millions of litres to the exacting
            standards of India&apos;s largest FMCG company.
          </p>
          <p className="king-section-title mt-12 text-[#073c50]">
            We didn&apos;t start from scratch.
            <br />
            <span className="text-[#00799b]">We started from mastery.</span>
          </p>
        </div>
      </section>

      {/* Stats strip — edge-to-edge touching grid */}
      <HomeSectionDivider from="#fff8e6" to="#ffcf4f" />
      <section className="bg-[#ffcf4f]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { num: "2L+", label: "Litres procured daily" },
            { num: "1,500+", label: "Villages in network" },
            { num: "40K+", label: "Farmer families" },
            { num: "15K+", label: "Retail outlets" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-r border-b border-[#073c50]/20 p-7 transition-colors hover:bg-[#fff8e6]/30 md:p-12"
            >
              <div className="king-display text-4xl text-[#073c50] md:text-6xl">
                {stat.num}
              </div>
              <p className="king-page-kicker mt-4 text-[#073c50]/75">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Origin story — asymmetric layout */}
      <HomeSectionDivider from="#ffcf4f" to="#fff8e6" />
      <section className="py-20 md:py-32">
        <div className="king-shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Origin
              </span>
            </div>
            <h2 className="king-section-title">
              Rooted in
              <br />
              <em>Belagavi.</em>
            </h2>
          </div>

          <div className="md:col-span-7">
            <p className="king-prose mb-5">
              Our 12-acre campus sits in Neginhal, Bailhongal, beside the fertile banks
              of the Malaprabha river. What began as a modest 5,000 litres per day
              operation in 2004 has grown into a dairy network spanning{" "}
              <span className="text-foreground font-semibold">1,500+ villages</span>{" "}
              across Karnataka, Maharashtra, Goa, and Kerala.
            </p>
            <p className="king-prose text-[#073c50]/75">
              Our sister brand Adityaa Milk is a household name across North Karnataka
              and Goa. With a revenue of{" "}
              <span className="text-foreground font-semibold">Rs. 304 Crore in FY25</span>,
              King Ice Cream is the crown jewel of the Vijaykant Dairy empire.
            </p>
          </div>
        </div>
      </section>

      {/* Promise — brand navy gradient with boxed 4-col grid */}
      <HomeSectionDivider from="#fff8e6" to="#06495d" />
      <section className="relative overflow-hidden bg-[#06495d] py-20 text-[#fff8e6] md:py-32">
        <div className="king-shell relative">
          <div className="max-w-3xl mb-12 sm:mb-16 px-2 sm:px-4">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#ffbf31]">
                Our Promise
              </span>
            </div>
            <h2 className="king-section-title">
              What we
              <span className="text-[#ffbf31]"> stand for.</span>
            </h2>
          </div>

          <div className="border-t border-l border-[#fff8e6]/20">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: "01",
                  title: "Pure Milk, No Compromise",
                  desc: "Fresh milk from 1,500+ villages. No palm oil. No vegetable fat.",
                },
                {
                  num: "02",
                  title: "HUL-Grade Manufacturing",
                  desc: "World-class cold chain, FSSAI compliance, 1 lakh L/day capacity.",
                },
                {
                  num: "03",
                  title: "Farmer-First Philosophy",
                  desc: "40,000+ families supported. Fair prices. Six chilling centres.",
                },
                {
                  num: "04",
                  title: "Tradition Meets Today",
                  desc: "From matka kulfi to Gudbud — delivered across 15,000+ stores.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group border-r border-b border-[#fff8e6]/20 p-6 transition-colors duration-300 hover:bg-[#fff8e6]/10 md:p-9"
                >
                  <span className="king-display mb-6 block text-4xl text-[#ffbf31]">
                    {item.num}
                  </span>
                  <h3 className="mb-3 text-lg font-black leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#fff8e6]/75">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <HomeSectionDivider from="#06495d" to="#c9e4ef" />
      <TimelineSection />
      <HomeSectionDivider from="#c9e4ef" to="#f8bfd2" />

      {/* Reach + Community — combined compact section */}
      <section className="bg-[#f8bfd2] py-20 md:py-32">
        <div className="king-shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Reach & Community
              </span>
            </div>
            <h2 className="king-section-title mb-6">
              More than
              <br />
              <em>just ice cream.</em>
            </h2>
            <p className="font-sans font-black text-xl sm:text-2xl text-foreground leading-tight">
              15,000+ outlets.
              <br />
              <span className="text-[#00799b]">4 states and growing.</span>
            </p>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="king-prose">
              Every King Ice Cream you enjoy supports{" "}
              <span className="font-semibold">40,000+ farming families</span>. Our daily
              procurement of 2,00,000 litres flows through six chilling centres, creating
              thousands of rural livelihoods.
            </p>
            <p className="king-prose text-[#073c50]/75">
              Proudly made in Belagavi since 2004. Whether you&apos;re a customer, a farmer
              partner, or a retailer — you are part of the King family.
            </p>
          </div>
        </div>
      </section>

      <Footer transitionFrom="#f8bfd2" />
    </main>
  );
}
