"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";
import { TransitionLink } from "./TransitionLink";

const menuItems = [
  { text: "Our Story", href: "/aboutus" },
  { text: "Our Products", href: "/products" },
  { text: "Contact Us", href: "/contact" },
  { text: "Store Locator", href: "/locate" },
  { text: "Nutritional Info", href: "/products" },
  { text: "Order Online", href: "/locate" },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/kingicecream.india/",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/",
    label: "YouTube",
  },
];

const RISE = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 60 },
};

const RISE_BASE_DELAY = 0.55;
const RISE_STAGGER = 0.09;
const RISE_DURATION = 0.95;
const RISE_EASE = [0.16, 1, 0.3, 1] as const;

export function NavigationMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.35 }}
      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.35 }}
      transition={{
        clipPath: { duration: 0.55, ease: "linear" },
        opacity: { duration: 0.55, ease: "linear" },
      }}
      className="fixed inset-0 z-40 flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#fbf4e6",
        backgroundImage: [
          // soft scoops of pastel "flavours"
          "radial-gradient(ellipse 70% 55% at 12% 18%, rgba(248, 209, 209, 0.55) 0%, transparent 65%)",
          "radial-gradient(ellipse 60% 50% at 88% 28%, rgba(252, 220, 188, 0.55) 0%, transparent 65%)",
          "radial-gradient(ellipse 75% 55% at 25% 88%, rgba(216, 232, 211, 0.5) 0%, transparent 70%)",
          "radial-gradient(ellipse 55% 45% at 80% 85%, rgba(241, 200, 215, 0.5) 0%, transparent 65%)",
          "radial-gradient(ellipse 55% 45% at 60% 50%, rgba(255, 248, 230, 0.7) 0%, transparent 75%)",
          // creamy base
          "linear-gradient(135deg, #fdf7e9 0%, #f3e8d2 100%)",
        ].join(", "),
      }}
    >
      {/* Header sits over this; reserve space at top */}
      <div className="h-20 sm:h-24 shrink-0" />

      {/* Centered menu list */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-7 px-6">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.href + item.text}
            initial={RISE.initial}
            animate={RISE.animate}
            exit={RISE.exit}
            transition={{
              duration: RISE_DURATION,
              delay: RISE_BASE_DELAY + i * RISE_STAGGER,
              ease: RISE_EASE,
            }}
          >
            <TransitionLink
              href={item.href}
              onBeforeNavigate={closeMenu}
              className="font-gill font-medium text-base sm:text-lg md:text-xl uppercase tracking-[0.18em] text-neutral-800 hover:text-black transition-colors"
            >
              {item.text}
            </TransitionLink>
          </motion.div>
        ))}

        <motion.div
          initial={RISE.initial}
          animate={RISE.animate}
          exit={RISE.exit}
          transition={{
            duration: RISE_DURATION,
            delay: RISE_BASE_DELAY + menuItems.length * RISE_STAGGER,
            ease: RISE_EASE,
          }}
          className="mt-3 sm:mt-5"
        >
          <TransitionLink
            href="/products"
            onBeforeNavigate={closeMenu}
            className="inline-block px-6 py-2 rounded-full bg-neutral-300/60 hover:bg-neutral-300 font-gill font-medium text-xs sm:text-sm uppercase tracking-[0.18em] text-neutral-800 transition-colors"
          >
            What's New
          </TransitionLink>
        </motion.div>
      </nav>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{
          duration: RISE_DURATION,
          delay: RISE_BASE_DELAY + (menuItems.length + 1) * RISE_STAGGER,
          ease: RISE_EASE,
        }}
        className="flex items-center justify-center gap-3 pb-12 sm:pb-16"
      >
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-300/50 hover:bg-neutral-300 transition-colors"
          >
            <Icon className="h-4 w-4 text-neutral-700" strokeWidth={1.5} />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
