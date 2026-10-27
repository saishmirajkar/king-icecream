"use client";

import { useId, useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * An endless ribbon that drifts on its own and speeds up (or reverses) with
 * the reader's scroll velocity.
 */
export function Marquee({ children, speed = 3, className, trackClassName }: { children: ReactNode; speed?: number; className?: string; trackClassName?: string }) {
  const reduced = useReducedMotionSafe();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, v => `${wrap(-25, 0, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b < 0) direction.current = 1;
    else if (b > 0) direction.current = -1;
    const move = direction.current * speed * (delta / 1000) * (1 + Math.abs(b));
    base.set(base.get() + move);
  });

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className={`flex w-max ${trackClassName ?? ""}`} style={{ x }}>
        {[0, 1, 2, 3].map(i => <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>{children}</div>)}
      </motion.div>
    </div>
  );
}

/** A circular, slowly turning stamp of text around a centre mark. */
export function SpinBadge({ text, children, className, style, ringClassName }: { text: string; children?: ReactNode; className?: string; style?: CSSProperties; ringClassName?: string }) {
  const id = `ring-${useId().replace(/:/g, "")}`;
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className ?? "") ? "" : "relative"} grid place-items-center rounded-full ${className ?? ""}`} style={style}>
      <svg viewBox="0 0 200 200" className={`king-spin absolute inset-0 h-full w-full ${ringClassName ?? ""}`} aria-hidden="true">
        <defs><path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
        <text className="fill-current" style={{ fontFamily: "var(--font-nohemi)", fontWeight: 800, fontSize: 17, letterSpacing: 4.2, textTransform: "uppercase" }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

const SPRINKLE_COLORS = ["#ffbf31", "#f8bfd2", "#00799b", "#fff8e6", "#ff8f6b", "#c1e5db"];

/**
 * Scattered sprinkles that bob gently. Positions come from a fixed seed so
 * server and client render the same scatter.
 */
export function Sprinkles({ count = 14, seed = 7, colors = SPRINKLE_COLORS, className }: { count?: number; seed?: number; colors?: string[]; className?: string }) {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const items = Array.from({ length: count }, (_, i) => ({
    left: rand() * 100,
    top: rand() * 100,
    rotate: rand() * 180,
    scale: 0.7 + rand() * 0.7,
    delay: rand() * -6,
    duration: 5 + rand() * 4,
    color: colors[i % colors.length],
    round: rand() > 0.72,
  }));
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {items.map((it, i) => (
        <span
          key={i}
          className="king-sprinkle absolute block"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            width: it.round ? 11 * it.scale : 7 * it.scale,
            height: it.round ? 11 * it.scale : 22 * it.scale,
            borderRadius: 99,
            background: it.color,
            ["--r" as string]: `${it.rotate}deg`,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Rays that slowly turn behind a product, like a sun stamp. */
export function SunRays({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={`king-spin-slow ${className ?? ""}`}>
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x="97" y="6" width="6" height="34" rx="3" fill={color} transform={`rotate(${i * 15} 100 100)`} />
      ))}
    </svg>
  );
}
