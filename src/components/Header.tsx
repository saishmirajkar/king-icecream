"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "./TransitionLink";

const links = [
  { label: "Home", href: "/" },
  { label: "Our ice creams", href: "/products" },
  { label: "Our story", href: "/aboutus" },
  { label: "Find us", href: "/locate" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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

  return (
    <header className="king-header fixed inset-x-0 top-0 z-50">
      <div className="king-shell king-header-inner flex items-center justify-between gap-4">
        <TransitionLink href="/" className="relative z-[52] flex shrink-0 items-center rounded-[18px] bg-[#fff8e6] px-2 shadow-[3px_4px_0_rgba(4,55,72,.24)]" aria-label="King Ice Cream home" data-testid="link-home-logo">
          <Image src="/images/logos/king logo.png" alt="King Ice Cream" width={170} height={105} priority className="h-[56px] w-[85px] object-contain md:h-[68px] md:w-[108px]" />
        </TransitionLink>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 xl:gap-10">
          {links.map(link => (
            <TransitionLink key={link.href} href={link.href} className="king-nav-link" aria-current={pathname === link.href ? "page" : undefined} data-testid={`link-nav-${link.href.replace(/\W/g,"") || "home"}`}>
              {link.label}
            </TransitionLink>
          ))}
        </nav>
        <TransitionLink href="/franchise" className="hidden lg:inline-flex rounded-full bg-[#ffbf31] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#073c50] transition-transform hover:-translate-y-1" data-testid="link-franchise-header">
          Partner with us <ArrowUpRight size={16} className="ml-2" />
        </TransitionLink>
        <button type="button" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="king-mobile-nav" className="relative z-[52] grid h-11 w-11 place-items-center rounded-full border border-white/50 lg:hidden" data-testid="button-mobile-menu">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {open && (
        <nav id="king-mobile-nav" aria-label="Mobile navigation" className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto bg-[#00799b] px-7 pb-10 pt-10 lg:hidden">
          <div className="mx-auto flex max-w-lg flex-col">
            <p className="king-label mb-5 text-[#ffbf31]">The good stuff</p>
            {links.map((link, i) => (
              <TransitionLink key={link.href} href={link.href} onBeforeNavigate={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="border-b border-white/25 py-3 text-[clamp(2.1rem,8vw,3.5rem)] font-black leading-tight tracking-[-.05em] text-[#fff8e6] transition-colors hover:text-[#ffbf31]" style={{ animationDelay: `${i * 55}ms` }} data-testid={`link-mobile-${link.href.replace(/\W/g,"") || "home"}`}>
                {link.label}
              </TransitionLink>
            ))}
            <TransitionLink href="/franchise" onBeforeNavigate={() => setOpen(false)} className="king-pill mt-9 w-fit" data-testid="link-mobile-franchise">Partner with us <ArrowUpRight size={18}/></TransitionLink>
          </div>
        </nav>
      )}
    </header>
  );
}