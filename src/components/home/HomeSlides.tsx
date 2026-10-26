"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";

/**
 * Shared "coming up" reveal: text starts ~40px below its resting position
 * with 0 opacity and rises into place as the slide wipes in.
 * The reveal is back-loaded (0.35 → 1.0 of the slide's progress) so the
 * image leads and the text follows for a layered feel.
 */
function useRise(progress: MotionValue<number>, range: [number, number] = [0.35, 1]) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [40, 0]);
  return { opacity, y };
}

/* ---------------- Shared Scroll-Down ---------------- */

export function ScrollDownIndicator({ delay = 1 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
    >
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-white/90"
      >
        <ChevronDown className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20" strokeWidth={1} />
      </motion.div>
      <span className="font-gill text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase text-white/90 drop-shadow">
        Scroll Down
      </span>
    </motion.div>
  );
}

/* ---------------- HERO ---------------- */

export function HeroOverlay({ progress }: { progress: MotionValue<number> }) {
  // Hero progress starts at 1; fade text out as the next slide rises over it.
  const fadeOut = useTransform(progress, [0.4, 1], [0, 1]);
  const textOpacity = useTransform(fadeOut, [0, 1], [0, 1]);

  return (
    <div className="absolute inset-0 px-6 text-center">
      <div className="absolute top-[22%] left-0 right-0 flex flex-col items-center">
        <motion.h1
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-gill text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-normal leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
        >
          discover your ice cream
          <br />
          destination
        </motion.h1>
      </div>
      <ScrollDownIndicator delay={1.4} />
    </div>
  );
}

/* ---------------- STORY (slide 2) ---------------- */

export function StoryOverlay({ progress }: { progress: MotionValue<number> }) {
  const headline = useRise(progress, [0.35, 0.85]);
  const cta = useRise(progress, [0.55, 1]);

  return (
    <div className="absolute inset-0 px-6 text-center">
      <div className="absolute top-[22%] left-0 right-0 flex flex-col items-center">
        <motion.p
          style={headline}
          className="font-gill text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          every scoop tells a story.
        </motion.p>
        <motion.div style={cta} className="mt-3 sm:mt-4">
          <TransitionLink
            href="/aboutus"
            className="font-gill text-xs sm:text-sm tracking-[0.15em] uppercase text-white border-b border-white/80 pb-1 hover:border-white transition-colors drop-shadow"
          >
            Read about our journey
          </TransitionLink>
        </motion.div>
      </div>
      <ScrollDownIndicator delay={0.6} />
    </div>
  );
}

/* ---------------- PRODUCTS (slide 4) ---------------- */

export function ProductsOverlay({ progress }: { progress: MotionValue<number> }) {
  const line1 = useRise(progress, [0.3, 0.75]);
  const line2 = useRise(progress, [0.4, 0.85]);
  const cta = useRise(progress, [0.55, 1]);

  return (
    <div className="absolute inset-0 px-6 text-center">
      <div className="absolute top-[22%] left-0 right-0 flex flex-col items-center">
        <motion.p
          style={line1}
          className="font-gill text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          exquisite ice-creams,
        </motion.p>
        <motion.p
          style={line2}
          className="mt-1 font-gill text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          exotic ingredients.
        </motion.p>
        <motion.div style={cta} className="mt-3 sm:mt-4">
          <TransitionLink
            href="/products"
            className="font-gill text-xs sm:text-sm tracking-[0.15em] uppercase text-white border-b border-white/80 pb-1 hover:border-white transition-colors drop-shadow"
          >
            Explore our products
          </TransitionLink>
        </motion.div>
      </div>
      <ScrollDownIndicator delay={0.6} />
    </div>
  );
}

/* ---------------- Image-only slides ---------------- */

export function ScrollOnlyOverlay() {
  return (
    <div className="absolute inset-0">
      <ScrollDownIndicator delay={0.6} />
    </div>
  );
}
