"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { useAnimate } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useTransitionContext } from "@/context/TransitionContext";

const EASE_IN = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** A full-screen colour sheet whose top and bottom edges are the site's scallops. */
function Sheet({ color, className }: { color: string; className: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`king-sheet ${className}`} style={{ transform: "translateY(110%)" }}>
      <svg className="king-sheet__edge" width="100%" height="48" aria-hidden="true">
        <defs><pattern id={`top-${id}`} width="144" height="48" patternUnits="userSpaceOnUse"><path d="M0 48H144V12C108 12 108 40 72 40C36 40 36 12 0 12Z" fill={color} /></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#top-${id})`} />
      </svg>
      <div className="king-sheet__body" style={{ backgroundColor: color }} />
      <svg className="king-sheet__edge" width="100%" height="48" aria-hidden="true">
        <defs><pattern id={`bottom-${id}`} width="144" height="48" patternUnits="userSpaceOnUse"><path d="M0 0H144V36C108 36 108 8 72 8C36 8 36 36 0 36Z" fill={color} /></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#bottom-${id})`} />
      </svg>
    </div>
  );
}

/**
 * Route changes roll a yellow then a teal scalloped sheet up over the page,
 * stamp the crown in the middle while the next page loads, then carry on
 * upward to reveal it.
 */
export function PageTransition() {
  const { isTransitioning, onNavigate, complete } = useTransitionContext();
  const [scope, animate] = useAnimate();
  const running = useRef(false);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (!isTransitioning || running.current) return;
    running.current = true;
    const root = scope.current as HTMLDivElement;

    const run = async () => {
      root.style.visibility = "visible";
      if (reduced) {
        animate(".pt-teal", { y: "0%" }, { duration: 0 });
        animate(".pt-mark", { opacity: 1 }, { duration: 0 });
        await animate(root, { opacity: [0, 1] }, { duration: 0.25 });
        onNavigate();
        await wait(450);
        await animate(root, { opacity: 0 }, { duration: 0.25 });
        animate(".pt-teal", { y: "110%" }, { duration: 0 });
        animate(".pt-mark", { opacity: 0 }, { duration: 0 });
      } else {
        animate(".pt-yellow", { y: ["110%", "0%"] }, { duration: 0.6, ease: EASE_IN });
        await animate(".pt-teal", { y: ["110%", "0%"] }, { duration: 0.6, ease: EASE_IN, delay: 0.1 });
        animate(".pt-mark", { opacity: [0, 1], scale: [0.6, 1], rotate: [-10, 0] }, { duration: 0.5, ease: EASE_OUT });
        animate(".pt-word", { opacity: [0, 1], y: [14, 0] }, { duration: 0.5, ease: EASE_OUT, delay: 0.12 });
        onNavigate();
        await wait(650);
        animate(".pt-mark, .pt-word", { opacity: 0, y: -24 }, { duration: 0.3, ease: EASE_IN });
        animate(".pt-teal", { y: "-110%" }, { duration: 0.7, ease: EASE_IN, delay: 0.12 });
        await animate(".pt-yellow", { y: "-110%" }, { duration: 0.7, ease: EASE_IN, delay: 0.24 });
        animate(".pt-yellow, .pt-teal", { y: "110%" }, { duration: 0 });
        animate(".pt-mark, .pt-word", { y: 0 }, { duration: 0 });
      }
      root.style.visibility = "hidden";
      root.style.opacity = "";
      running.current = false;
      complete();
    };
    run();
  }, [isTransitioning, onNavigate, complete, animate, scope, reduced]);

  return (
    <div ref={scope} className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" style={{ visibility: "hidden" }} aria-hidden="true">
      <Sheet color="#ffbf31" className="pt-yellow" />
      <Sheet color="#00799b" className="pt-teal" />
      <div className="absolute inset-0 grid place-content-center justify-items-center gap-5">
        <div className="pt-mark rounded-[22px] bg-[#fff8e6] px-4 py-2 opacity-0 shadow-[5px_6px_0_rgba(4,55,72,.28)]">
          <Image src="/images/logos/king logo.png" alt="" width={170} height={105} className="h-[84px] w-[130px] object-contain" />
        </div>
        <p className="pt-word king-label text-[#ffbf31] opacity-0">Scooping happiness</p>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
