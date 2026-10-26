import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { ContactForm } from "./ContactForm";

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

export default function ContactPage() {
  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      {/* Hero — split layout: left heading, right intro */}
      <section className="king-page-hero flex min-h-[65svh] items-end bg-[#f8bfd2]">
        <div className="king-shell relative z-10 grid w-full grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Get in Touch
              </span>
            </div>
            <h1 className="king-page-title king-reveal">
              Let&apos;s
              <br />
              <span className="text-[#00799b]">talk.</span>
            </h1>
          </div>
          <div className="md:col-span-5 flex items-end">
            <p className="king-prose max-w-md font-semibold">
              Whether it&apos;s a flavour suggestion, franchise enquiry, wholesale
              partnership, or just a compliment about your favourite scoop —
              we&apos;re all ears.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-12 top-10 hidden h-[65%] w-[29%] rotate-12 opacity-60 lg:block" aria-hidden="true"><Image src="/images/Product Images copy/100 ml Premium cup Kesar Pista.png" alt="" fill sizes="30vw" className="object-contain"/></div>
      </section>

      {/* Contact details — edge-to-edge touching grid */}
      <HomeSectionDivider from="#f8bfd2" to="#ffcf4f" />
      <section className="bg-[#ffcf4f]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <a
            href="tel:9900255556"
            className="group border-r border-b border-[#073c50]/20 p-7 transition-colors hover:bg-[#fff8e6]/30 md:p-12"
          >
            <span className="king-page-kicker mb-5 text-[#00799b]">
              Call
            </span>
            <span className="king-display block text-lg transition-colors group-hover:text-[#00799b] sm:text-2xl md:text-4xl">
              99002 55556
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground mt-2 block">
              Tap to dial
            </span>
          </a>
          <a
            href="mailto:info@kingicecream.com"
            className="group border-r border-b border-[#073c50]/20 p-7 transition-colors hover:bg-[#fff8e6]/30 md:p-12"
          >
            <span className="king-page-kicker mb-5 text-[#00799b]">
              Email
            </span>
            <span className="block break-all text-sm font-black leading-tight transition-colors group-hover:text-[#00799b] sm:text-lg md:text-2xl">
              info@kingicecream.com
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground mt-2 block">
              Reply within 48 hrs
            </span>
          </a>
          <a
            href="https://www.instagram.com/kingicecream.india/"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-r border-b border-[#073c50]/20 p-7 transition-colors hover:bg-[#fff8e6]/30 sm:col-span-2 md:col-span-1 md:p-12"
          >
            <span className="king-page-kicker mb-5 text-[#00799b]">
              Instagram
            </span>
            <span className="block text-lg font-black leading-tight transition-colors group-hover:text-[#00799b] sm:text-2xl">
              @kingicecream.india
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-muted-foreground mt-2 block">
              Behind the scenes
            </span>
          </a>
        </div>
      </section>

      {/* Address + Hours — edge-to-edge touching */}
      <HomeSectionDivider from="#ffcf4f" to="#fff8e6" />
      <section className="bg-[#fff8e6]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-r border-b border-[#00799b]/20 p-7 md:p-12">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Head Office
              </span>
            </div>
            <h2 className="text-xl font-black leading-tight md:text-3xl">
              Vijaykant Dairy &amp; Food Products Ltd.
            </h2>
            <p className="font-serif text-sm sm:text-base text-muted-foreground leading-[1.7]">
              Neginhal Village, Bailhongal Taluka,
              <br />
              Dist. Belagavi, Karnataka 591102
            </p>
            <p className="font-serif italic text-sm text-foreground mt-4">
              Proudly made in Belagavi since 2004.
            </p>
          </div>

          <div className="border-r border-b border-[#00799b]/20 p-7 md:p-12">
            <div className="flex items-center gap-4 mb-5">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="king-page-kicker text-[#00799b]">
                Business Hours
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-sm sm:text-base font-bold text-foreground">Mon — Sat</span>
                <span className="font-sans text-sm sm:text-base text-muted-foreground">9 AM — 7 PM</span>
              </div>
              <div className="h-[1px] bg-border" />
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-sm sm:text-base font-bold text-foreground">Sunday</span>
                <span className="font-sans text-sm sm:text-base text-muted-foreground">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <HomeSectionDivider from="#fff8e6" to="#c9e4ef" />
      <section className="bg-[#c9e4ef] py-20 md:py-32">
        <div className="king-shell max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 bg-gold" />
            <span className="king-page-kicker text-[#00799b]">
              Send Us a Message
            </span>
          </div>

          <h2 className="king-section-title mb-6">
            Write to
            <em> us.</em>
          </h2>
          <p className="king-prose mb-10 max-w-lg text-[#073c50]/75">
            Fill in your details and we&apos;ll open your email client with everything ready to send.
          </p>

          <ContactForm />
        </div>
      </section>

      {/* Map — full bleed */}
      <HomeSectionDivider from="#c9e4ef" to="#00799b" />
      <section className="bg-[#00799b] p-3 md:p-8">
        <div className="h-[380px] w-full overflow-hidden rounded-[1.5rem] md:h-[520px] md:rounded-[2rem]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245615.67498339!2d74.4!3d15.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf65f1e1c0a7e5%3A0x4b1e3e1c2e3f2b2!2sBelagavi%2C+Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="King Ice Cream - Belagavi"
          />
        </div>
      </section>

      {/* WhatsApp CTA */}
      <HomeSectionDivider from="#00799b" to="#ffcf4f" />
      <section className="relative overflow-hidden bg-[#ffcf4f] py-20 md:py-28">
        <div className="king-shell relative">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 bg-foreground/70" />
            <span className="king-page-kicker text-[#00799b]">
              Quick Connect
            </span>
          </div>
          <h2 className="king-section-title mb-6">
            Prefer
            <span className="text-[#00799b]"> WhatsApp?</span>
          </h2>
          <p className="king-prose mb-10 max-w-lg">
            Drop us a message for franchise enquiries, bulk orders, or just to say hello.
          </p>
          <a
            href="https://wa.me/919900255556"
            target="_blank"
            rel="noopener noreferrer"
            className="king-pill !bg-[#00799b] !text-[#fff8e6]"
          >
            Message us on WhatsApp
            <span className="h-[1px] w-6 bg-current" />
          </a>
        </div>
      </section>

      <Footer transitionFrom="#ffcf4f" />
    </main>
  );
}
