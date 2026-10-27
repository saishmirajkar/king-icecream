"use client";

import { createContext, createElement, useContext, useRef, type CSSProperties, type HTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const spring = { stiffness: 180, damping: 18, mass: 0.4 };

/** Pulls its child a little toward the pointer, then springs back. */
export function Magnetic({ children, className, strength = 0.32 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  const move = (e: PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.span ref={ref} className={`inline-flex ${className ?? ""}`} style={{ x, y }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}

/** Tilts a card in 3D toward the pointer, with a soft moving highlight. */
export function Tilt({ children, className, style, max = 7 }: { children: ReactNode; className?: string; style?: CSSProperties; max?: number }) {
  const reduced = useReducedMotionSafe();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, v => `${v * 100}%`);
  const glareY = useTransform(py, v => `${v * 100}%`);
  const background = useTransform([glareX, glareY] as MotionValue[], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.32), transparent 55%)`);
  const glare = useSpring(0, { stiffness: 120, damping: 20 });

  if (reduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className ?? ""}`}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={e => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glare.set(1);
      }}
      onPointerLeave={() => { px.set(0.5); py.set(0.5); glare.set(0); }}
    >
      {children}
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[2rem]" style={{ background, opacity: glare }} />
    </motion.div>
  );
}

const PointerContext = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

/** Tracks the pointer across an area so <PointerLayer>s inside can drift with it. */
export function PointerField({ children, as = "section", onPointerMove, onPointerLeave, ...rest }: HTMLAttributes<HTMLElement> & { as?: "section" | "div" }) {
  const x = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  return (
    <PointerContext.Provider value={{ x, y }}>
      {createElement(as, {
        ...rest,
        onPointerMove: (e: PointerEvent<HTMLElement>) => {
          onPointerMove?.(e);
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          x.set(((e.clientX - r.left) / r.width - 0.5) * 2);
          y.set(((e.clientY - r.top) / r.height - 0.5) * 2);
        },
        onPointerLeave: (e: PointerEvent<HTMLElement>) => { onPointerLeave?.(e); x.set(0); y.set(0); },
      }, children)}
    </PointerContext.Provider>
  );
}

/** Drifts with the pointer; larger depth values move further. */
export function PointerLayer({ children, className, style, depth = 20 }: { children: ReactNode; className?: string; style?: CSSProperties; depth?: number }) {
  const ctx = useContext(PointerContext);
  const reduced = useReducedMotionSafe();
  const fallback = useMotionValue(0);
  const x = useTransform(ctx?.x ?? fallback, v => (reduced ? 0 : v * depth));
  const y = useTransform(ctx?.y ?? fallback, v => (reduced ? 0 : v * depth));
  return <motion.div className={className} style={{ ...style, x, y }}>{children}</motion.div>;
}
