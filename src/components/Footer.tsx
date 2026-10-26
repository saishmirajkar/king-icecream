"use client";

import Image from "next/image";
import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { TransitionLink } from "./TransitionLink";
import { HomeSectionDivider } from "./home/HomeSectionDivider";

const footerLinks = [
  { text: "Our ice creams", href: "/products" },
  { text: "Our story", href: "/aboutus" },
  { text: "Find a parlour", href: "/locate" },
  { text: "Journal", href: "/blog" },
  { text: "Franchise", href: "/franchise" },
  { text: "Contact us", href: "/contact" },
];

export function Footer({ transitionFrom = "#fff8e6" }: { transitionFrom?: string }) {
  return (
    <footer className="relative overflow-hidden bg-[#06495d] text-[#fff8e6]">
      {transitionFrom !== "#06495d" && (
        <HomeSectionDivider from={transitionFrom} to="#06495d" />
      )}
      <div className="king-shell relative z-10 pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 border-b border-white/25 pb-16 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="king-label text-[#ffbf31]">Made for the moments worth sharing</span>
            <h2 className="king-display mt-6 max-w-[520px] text-[clamp(3.4rem,6vw,7rem)]">Life tastes<br/>better with<br/><span className="text-[#ffbf31]">King.</span></h2>
            <Image src="/images/logos/king logo.png" alt="King Ice Cream" width={150} height={95} className="mt-9 h-20 w-auto object-contain" />
          </div>
          <div className="md:pt-2">
            <h3 className="king-label mb-6 text-[#ffbf31]">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.map(link => <li key={link.href}><TransitionLink href={link.href} className="inline-flex items-center gap-2 text-lg font-bold transition-colors hover:text-[#ffbf31]">{link.text}<ArrowUpRight size={16}/></TransitionLink></li>)}
            </ul>
          </div>
          <div className="md:pt-2">
            <h3 className="king-label mb-6 text-[#ffbf31]">Say hello</h3>
            <p className="max-w-[260px] leading-relaxed text-[#fff8e6]/80">Vijaykant Dairy &amp; Food Products Ltd.<br/>Neginhal Village, Bailhongal Taluka,<br/>Dist. Belagavi, Karnataka 591102</p>
            <a href="tel:+919900255556" className="mt-6 block text-lg font-bold hover:text-[#ffbf31]">+91 99002 55556</a>
            <a href="mailto:info@kingicecream.com" className="mt-2 block underline underline-offset-4 hover:text-[#ffbf31]">info@kingicecream.com</a>
            <div className="mt-7 flex gap-3">
              <a href="https://www.instagram.com/kingicecream.india/" target="_blank" rel="noopener noreferrer" aria-label="King Ice Cream on Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 hover:bg-[#ffbf31] hover:text-[#073c50]"><Instagram size={19}/></a>
              <TransitionLink href="/locate" aria-label="Find King Ice Cream near you" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 hover:bg-[#ffbf31] hover:text-[#073c50]"><MapPin size={19}/></TransitionLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
              <a href="https://wa.me/919900255556" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbf31]">WhatsApp ↗</a>
              <a href="https://www.zomato.com/belgaum/king-ice-cream-25-belgaum-locality/order" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbf31]">Zomato ↗</a>
              <a href="https://www.swiggy.com/city/belgaum/king-ice-cream-camp-camp-area-rest1077734" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbf31]">Swiggy ↗</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#fff8e6]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} King Ice Cream. All rights reserved.</p>
          <p>Made with the goodness of milk in Belagavi.</p>
        </div>
      </div>
      <div aria-hidden="true" className="king-display -mb-[.16em] whitespace-nowrap text-center text-[clamp(6rem,20vw,24rem)] leading-none tracking-[-.08em] text-[#fff8e6]/[.08]">KING ICE CREAM</div>
    </footer>
  );
}