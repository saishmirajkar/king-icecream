"use client";

import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Distance travelled on entry, in px. Negative values enter from above. */
  y?: number;
  x?: number;
  scale?: number;
  as?: "div" | "span" | "p" | "li" | "section" | "figure";
};

/** Fades and rises its children into place the first time they scroll into view. */
export function Reveal({ children, className, style, delay = 0, y = 34, x = 0, scale = 1, as = "div" }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as];
  if (reduced) return createElement(as, { className, style }, children);
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

const staggerParent: Variants = { hidden: {}, show: (gap: number) => ({ transition: { staggerChildren: gap } }) };
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE_OUT } },
};

/** Container whose <StaggerItem> children enter one after another. */
export function Stagger({ children, className, style, gap = 0.09, delay = 0, as = "div" }: { children: ReactNode; className?: string; style?: CSSProperties; gap?: number; delay?: number; as?: "div" | "ul" | "ol" }) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as];
  if (reduced) return createElement(as, { className, style }, children);
  return (
    <Tag
      className={className}
      style={style}
      variants={staggerParent}
      custom={gap}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delayChildren: delay }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, style, as = "div" }: { children: ReactNode; className?: string; style?: CSSProperties; as?: "div" | "li" }) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as];
  if (reduced) return createElement(as, { className, style }, children);
  return <Tag className={className} style={style} variants={staggerChild}>{children}</Tag>;
}

type RevealTitleProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  /** Seconds between each line starting. */
  gap?: number;
};

const lineVariants: Variants = {
  hidden: { y: "108%", rotate: 2.5 },
  show: ({ delay }: { delay: number }) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] } }),
};

/**
 * Display headings that rise line by line out of a mask. Each line keeps a
 * little bottom padding inside its mask so descenders are never clipped. The
 * in-view trigger sits on the unclipped wrapper: the lines themselves start
 * hidden behind their masks and would never register as visible.
 */
export function RevealTitle({ lines, as = "h2", className, id, delay = 0, gap = 0.1 }: RevealTitleProps) {
  const reduced = useReducedMotionSafe();
  if (reduced) {
    return createElement(as, { className, id }, lines.map((line, i) => <span key={i} className="king-mask-line"><span className="block">{line}</span></span>));
  }
  return createElement(
    as,
    { className, id },
    <motion.span className="block" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {lines.map((line, i) => (
        <span key={i} className="king-mask-line">
          <motion.span className="block will-change-transform" variants={lineVariants} custom={{ delay: delay + i * gap }}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>,
  );
}
