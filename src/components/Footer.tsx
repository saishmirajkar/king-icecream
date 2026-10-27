"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { TransitionLink } from "./TransitionLink";
import { HomeSectionDivider } from "./home/HomeSectionDivider";
import { usePageScroll } from "./LenisProvider";
import { RevealTitle, Stagger, StaggerItem } from "./motion/reveal";
import { Magnetic } from "./motion/interactive";
import { Marquee, SpinBadge } from "./motion/decor";

const footerLinks = [
  { text: "Our ice creams", href: "/products" },
  { text: "Our story", href: "/aboutus" },
  { text: "Find a parlour", href: "/locate" },
  { text: "Journal", href: "/blog" },
  { text: "Franchise", href: "/franchise" },
  { text: "Contact us", href: "/contact" },
];

export function Footer({ transitionFrom = "#fff8e6" }: { transitionFrom?: string }) {
  const scrollTo = usePageScroll();
  return (
    <footer className="relative overflow-hidden bg-[#06495d] text-[#fff8e6]">
      {transitionFrom !== "#06495d" && (
        <HomeSectionDivider from={transitionFrom} to="#06495d" />
      )}
      <div className="king-shell relative z-10 pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 border-b border-white/20 pb-16 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="relative">
            <span className="king-label text-[#ffbf31]">Made for the moments worth sharing</span>
            <RevealTitle className="king-display mt-6 max-w-[520px] text-[clamp(3.4rem,6vw,7rem)]" lines={["Life tastes", "better with", <span key="k" className="text-[#ffbf31]">King.</span>]} />
            <div className="mt-9 flex items-center gap-6">
              <Image src="/images/logos/king logo.png" alt="King Ice Cream" width={150} height={95} className="h-20 w-auto object-contain" />
              <SpinBadge text="Pure milk • No palm oil • Belagavi • " className="h-24 w-24 text-[#ffbf31]">
                <span className="text-2xl" aria-hidden="true">♛</span>
              </SpinBadge>
            </div>
          </div>
          <Stagger className="md:pt-2" gap={0.06}>
            <StaggerItem><h3 className="king-label mb-6 text-[#ffbf31]">Explore</h3></StaggerItem>
            <ul className="space-y-3">
              {footerLinks.map(link => <StaggerItem as="li" key={link.href}><TransitionLink href={link.href} className="group inline-flex items-center gap-2 text-lg font-bold transition-colors hover:text-[#ffbf31]"><span className="king-link">{link.text}</span><ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></TransitionLink></StaggerItem>)}
            </ul>
          </Stagger>
          <Stagger className="md:pt-2" gap={0.07}>
            <StaggerItem><h3 className="king-label mb-6 text-[#ffbf31]">Say hello</h3></StaggerItem>
            <StaggerItem><p className="max-w-[260px] leading-relaxed text-[#fff8e6]/80">Vijaykant Dairy &amp; Food Products Ltd.<br/>Neginhal Village, Bailhongal Taluka,<br/>Dist. Belagavi, Karnataka 591102</p></StaggerItem>
            <StaggerItem><a href="tel:+919900255556" className="king-link mt-6 inline-block text-lg font-bold hover:text-[#ffbf31]">+91 99002 55556</a></StaggerItem>
            <StaggerItem><a href="mailto:info@kingicecream.com" className="mt-2 inline-block underline underline-offset-4 hover:text-[#ffbf31]">info@kingicecream.com</a></StaggerItem>
            <StaggerItem className="mt-7 flex gap-3">
              <a href="https://www.instagram.com/kingicecream.india/" target="_blank" rel="noopener noreferrer" aria-label="King Ice Cream on Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffbf31] hover:bg-[#ffbf31] hover:text-[#073c50]"><Instagram size={19}/></a>
              <TransitionLink href="/locate" aria-label="Find King Ice Cream near you" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffbf31] hover:bg-[#ffbf31] hover:text-[#073c50]"><MapPin size={19}/></TransitionLink>
            </StaggerItem>
            <StaggerItem className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
              <a href="https://wa.me/919900255556" target="_blank" rel="noopener noreferrer" className="king-link hover:text-[#ffbf31]">WhatsApp ↗</a>
              <a href="https://www.zomato.com/belgaum/king-ice-cream-25-belgaum-locality/order" target="_blank" rel="noopener noreferrer" className="king-link hover:text-[#ffbf31]">Zomato ↗</a>
              <a href="https://www.swiggy.com/city/belgaum/king-ice-cream-camp-camp-area-rest1077734" target="_blank" rel="noopener noreferrer" className="king-link hover:text-[#ffbf31]">Swiggy ↗</a>
            </StaggerItem>
          </Stagger>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-xs text-[#fff8e6]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} King Ice Cream. All rights reserved.</p>
          <p>Made with the goodness of milk in Belagavi.</p>
          <Magnetic>
            <button type="button" onClick={() => scrollTo(0)} className="group inline-flex items-center gap-3 font-black uppercase tracking-[.14em] text-[#fff8e6] transition-colors hover:text-[#ffbf31]" data-testid="button-back-to-top">
              Back to top
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffbf31] text-[#073c50] transition-transform duration-300 group-hover:-translate-y-1"><ArrowUp size={18}/></span>
            </button>
          </Magnetic>
        </div>
      </div>
      <Marquee speed={2.2} className="-mb-[.14em] select-none" trackClassName="items-end">
        <span aria-hidden="true" className="king-display flex items-center gap-[.35em] whitespace-nowrap pr-[.35em] text-[clamp(6rem,17vw,20rem)] leading-none tracking-[-.06em] text-[#fff8e6]/[.09]">
          KING ICE CREAM <span className="text-[#ffbf31]/40">✦</span>
        </span>
      </Marquee>
    </footer>
  );
}
