"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { Menu, X, ArrowUpRight, Instagram, Phone } from "lucide-react";
import { TransitionLink } from "./TransitionLink";
import { Magnetic } from "./motion/interactive";
import { ScrollProgress } from "./motion/scroll";
import { Sprinkles } from "./motion/decor";

const links = [
  { label: "Home", href: "/" },
  { label: "Our ice creams", href: "/products" },
  { label: "Our story", href: "/aboutus" },
  { label: "Find us", href: "/locate" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const reduced = useReducedMotionSafe();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`king-header fixed inset-x-0 top-0 z-50 transition-shadow duration-500 ${scrolled ? "shadow-[0_14px_40px_rgba(0,65,82,.22)]" : ""}`}>
      <div className="king-shell king-header-inner flex items-center justify-between gap-4">
        <TransitionLink href="/" className="king-wiggle relative z-[52] flex shrink-0 items-center rounded-[18px] bg-[#fff8e6] px-2 shadow-[3px_4px_0_rgba(4,55,72,.24)] transition-transform duration-300 hover:-translate-y-0.5" aria-label="King Ice Cream home" data-testid="link-home-logo">
          <Image src="/images/logos/king logo.png" alt="King Ice Cream" width={170} height={105} priority className="h-[56px] w-[85px] object-contain md:h-[68px] md:w-[108px]" />
        </TransitionLink>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 xl:gap-10">
          {links.map(link => (
            <TransitionLink key={link.href} href={link.href} className="king-nav-link" aria-current={isActive(pathname, link.href) ? "page" : undefined} data-testid={`link-nav-${link.href.replace(/\W/g,"") || "home"}`}>
              {link.label}
            </TransitionLink>
          ))}
        </nav>
        <Magnetic className="hidden lg:inline-flex">
          <TransitionLink href="/franchise" className="king-pill !min-h-0 !px-5 !py-3 !text-xs" data-testid="link-franchise-header">
            Partner with us <ArrowUpRight size={16} />
          </TransitionLink>
        </Magnetic>
        <button type="button" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="king-mobile-nav" className="relative z-[52] grid h-11 w-11 place-items-center rounded-full border border-white/50 transition-colors hover:bg-white/10 lg:hidden" data-testid="button-mobile-menu">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              {open ? <X size={23} /> : <Menu size={23} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <ScrollProgress className="absolute inset-x-0 bottom-0 h-[3px] bg-[#ffbf31]" />
      <AnimatePresence>
        {open && (
          <motion.nav
            id="king-mobile-nav"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto bg-[#00799b] px-7 pb-10 pt-10 lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "circle(0% at 92% 0%)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "circle(150% at 92% 0%)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "circle(0% at 92% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <Sprinkles count={12} seed={21} className="opacity-60" />
            <div className="relative mx-auto flex max-w-lg flex-col">
              <p className="king-label mb-5 text-[#ffbf31]">The good stuff</p>
              {links.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <TransitionLink href={link.href} onBeforeNavigate={() => setOpen(false)} aria-current={isActive(pathname, link.href) ? "page" : undefined} className="flex items-center justify-between border-b border-white/25 py-3 text-[clamp(2.1rem,8vw,3.5rem)] font-black leading-tight tracking-[-.05em] text-[#fff8e6] transition-colors hover:text-[#ffbf31] aria-[current=page]:text-[#ffbf31]" data-testid={`link-mobile-${link.href.replace(/\W/g,"") || "home"}`}>
                    {link.label}<ArrowUpRight size={26} className="opacity-60" />
                  </TransitionLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-9 flex flex-wrap items-center gap-4">
                <TransitionLink href="/franchise" onBeforeNavigate={() => setOpen(false)} className="king-pill w-fit" data-testid="link-mobile-franchise">Partner with us <ArrowUpRight size={18}/></TransitionLink>
                <a href="tel:+919900255556" aria-label="Call King Ice Cream" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[#fff8e6]"><Phone size={19}/></a>
                <a href="https://www.instagram.com/kingicecream.india/" target="_blank" rel="noopener noreferrer" aria-label="King Ice Cream on Instagram" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[#fff8e6]"><Instagram size={19}/></a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
