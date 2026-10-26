import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { MapPin } from "lucide-react";

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

const regions = [
  {
    state: "Karnataka",
    cities: [
      { name: "Belagavi", outlets: "200+", flagship: true },
      { name: "Hubli-Dharwad", outlets: "150+", flagship: true },
      { name: "Mangaluru", outlets: "80+" },
      { name: "Bengaluru", outlets: "50+" },
      { name: "Davangere", outlets: "40+" },
      { name: "Bagalkot", outlets: "35+" },
      { name: "Gadag", outlets: "30+" },
      { name: "Haveri", outlets: "25+" },
    ],
  },
  {
    state: "Goa",
    cities: [
      { name: "Panaji", outlets: "40+" },
      { name: "Margao", outlets: "35+" },
      { name: "Vasco", outlets: "20+" },
    ],
  },
  {
    state: "Maharashtra",
    cities: [
      { name: "Kolhapur", outlets: "60+" },
      { name: "Sangli", outlets: "30+" },
      { name: "Pune", outlets: "20+" },
    ],
  },
  {
    state: "Kerala",
    cities: [
      { name: "Kasaragod", outlets: "25+" },
      { name: "Kannur", outlets: "15+" },
    ],
  },
];

export default function LocatePage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero — minimal, map-focused */}
      <section className="king-page-hero bg-[#ffcf4f]">
        <div className="king-shell relative z-10">
          <span className="king-page-kicker king-reveal mb-7 text-[#00799b]">
            15,000+ Outlets across 4 states
          </span>
        <h1 className="king-page-title king-reveal max-w-5xl">
          Find Us
          <br />
          <span className="text-[#00799b]">near you.</span>
        </h1>
        <p className="king-reveal mt-8 max-w-lg text-lg font-semibold">From Belagavi to your neighbourhood, there&apos;s always a King moment close by.</p>
        </div>
        <div className="pointer-events-none absolute -bottom-20 right-0 hidden h-[85%] w-[34%] rotate-12 md:block" aria-hidden="true"><Image src="/images/Product Images copy/Mango Sip Up_Mockup.png" alt="" fill sizes="35vw" className="object-contain drop-shadow-2xl"/></div>
      </section>

      {/* Map */}
      <HomeSectionDivider from="#ffcf4f" to="#00799b" />
      <section className="bg-[#00799b] p-3 md:p-8">
        <div className="h-[380px] w-full overflow-hidden rounded-[1.5rem] md:h-[540px] md:rounded-[2rem]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245615.67498339!2d74.4!3d15.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf65f1e1c0a7e5%3A0x4b1e3e1c2e3f2b2!2sBelagavi%2C+Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="King Ice Cream Locations"
          />
        </div>
      </section>

      {/* Regions */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="py-20 md:py-32">
        <div className="king-shell">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Coverage
              </span>
            </div>
            <h2 className="king-section-title">
              Available across
              <br />
              <em>four states.</em>
            </h2>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {regions.map((region) => (
              <div key={region.state}>
                <div className="mb-5 flex items-baseline justify-between border-b-2 border-[#00799b]/25 pb-4">
                  <h3 className="king-display text-3xl text-[#00799b] md:text-5xl">
                    {region.state}
                  </h3>
                  <span className="king-page-kicker">
                    {region.cities.length} cities
                  </span>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {region.cities.map((city) => (
                      <div
                        key={city.name}
                        className="group rounded-[1.25rem] bg-[#c9e4ef] p-5 transition-transform duration-300 hover:-translate-y-1 md:p-7"
                      >
                        <MapPin className="mb-4 h-6 w-6 text-[#00799b] transition-transform group-hover:scale-110" />
                        <div className="flex items-start justify-between gap-2">
                          <span className="block text-base font-black leading-tight">
                            {city.name}
                          </span>
                          {"flagship" in city && city.flagship && (
                            <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-[#00799b]">
                              Flagship
                            </span>
                          )}
                        </div>
                        <span className="mt-2 block text-sm text-[#073c50]/75">
                          {city.outlets} outlets
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Also Available On — edge-to-edge touching grid */}
      <HomeSectionDivider from="#fff8e6" to="#f8bfd2" />
      <section className="bg-[#f8bfd2]">
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div className="border-r border-b border-[#073c50]/20 p-7 md:p-12">
            <span className="king-page-kicker mb-4 text-[#00799b]">
              Order Online
            </span>
            <span className="king-display block text-3xl md:text-5xl">
              Zomato
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground mt-2 block">
              Doorstep delivery
            </span>
          </div>
          <div className="border-r border-b border-[#073c50]/20 p-7 md:p-12">
            <span className="king-page-kicker mb-4 text-[#00799b]">
              Retail Chains
            </span>
            <span className="king-display block text-3xl md:text-5xl">
              15,000+ Stores
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground mt-2 block">
              Across 4 states
            </span>
          </div>
          <div className="col-span-2 border-r border-b border-[#073c50]/20 p-7 md:col-span-1 md:p-12">
            <span className="king-page-kicker mb-4 text-[#00799b]">
              King Parlours
            </span>
            <span className="king-display block text-3xl md:text-5xl">
              Exclusive Outlets
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground mt-2 block">
              Full menu experience
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <HomeSectionDivider from="#f8bfd2" to="#00799b" />
      <section className="relative overflow-hidden bg-[#00799b] py-20 text-[#fff8e6] md:py-28">
        <div className="king-shell relative">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 bg-foreground/70" />
            <span className="king-page-kicker text-[#ffbf31]">
              Not Nearby Yet?
            </span>
          </div>
          <h2 className="king-section-title mb-6">
            Can&apos;t find
            <span className="text-[#ffbf31]"> us?</span>
          </h2>
          <p className="king-prose mb-10 max-w-lg text-[#fff8e6]/80">
            We&apos;re expanding every day. If King Ice Cream isn&apos;t in your
            neighbourhood yet, let us know — or consider opening a franchise.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/franchise"
              className="king-pill"
            >
              Open a Franchise
              <span className="h-[1px] w-6 bg-current" />
            </Link>
            <Link
              href="/contact"
              className="king-pill king-pill--outline"
            >
              Contact Us
              <span className="h-[1px] w-6 bg-current" />
            </Link>
          </div>
        </div>
      </section>

      <Footer transitionFrom="#00799b" />
    </main>
  );
}
