"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/** Moves its children against the scroll direction for a sense of depth. */
export function Parallax({ children, className, style, speed = 60, rotate = 0 }: { children: ReactNode; className?: string; style?: CSSProperties; speed?: number; rotate?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [speed, -speed]);
  const r = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-rotate, rotate]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y, rotate: r }}>
      {children}
    </motion.div>
  );
}

/** Thin yellow bar that tracks how far down the page the reader is. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" className={className} style={{ scaleX, transformOrigin: "0% 50%" }} />;
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return <motion.span className="inline-block" style={{ opacity, y }}>{word}&nbsp;</motion.span>;
}

/** A statement that inks itself in word by word as it moves up the screen. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 52%"] });
  const words = text.split(" ");
  if (reduced) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
      </span>
    </p>
  );
}

/**
 * Counts a stat such as "1,500+" or "2L+" up from zero when it scrolls into
 * view, keeping its prefix, suffix and Indian digit grouping.
 */
export function CountUp({ value, className, duration = 1.8 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotionSafe();
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const grouped = num.includes(",");
    const format = (n: number) => `${prefix}${grouped ? Math.round(n).toLocaleString("en-IN") : Math.round(n)}${suffix}`;
    if (reduced) { setDisplay(value); return; }
    if (!inView) return;
    const controls = animate(0, target, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: n => setDisplay(format(n)) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration]);

  return <span ref={ref} className={className} aria-label={value}>{display}</span>;
}

/** A vertical rule that draws itself as its section scrolls past. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <motion.div className="absolute inset-0 origin-top rounded-full bg-[#ffbf31]" style={{ scaleY }} />
    </div>
  );
}

/** A horizontal rule that draws from left to right when it comes into view. */
export function DrawLine({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      aria-hidden="true"
      className={`overflow-hidden rounded-full bg-[#073c50]/15 ${className ?? ""}`}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className="h-full origin-left rounded-full bg-[#073c50]"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.3 } } }}
      />
    </motion.div>
  );
}
