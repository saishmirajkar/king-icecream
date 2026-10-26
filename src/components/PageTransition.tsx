"use client";

import { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import { useTransitionContext } from "@/context/TransitionContext";

const EASE_IN = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function PageTransition() {
  const { isTransitioning, transitionType, onNavigate, complete } =
    useTransitionContext();
  const isAnimating = useRef(false);

  const [curtainScope, animateCurtain] = useAnimate();
  const [lineScope, animateLine] = useAnimate();
  const [col1, animateCol1] = useAnimate();
  const [col2, animateCol2] = useAnimate();
  const [col3, animateCol3] = useAnimate();
  const [col4, animateCol4] = useAnimate();
  const [col5, animateCol5] = useAnimate();
  const [diagScope, animateDiag] = useAnimate();
  const [fadeScope, animateFade] = useAnimate();
  const [zoomScope, animateZoom] = useAnimate();

  useEffect(() => {
    if (!isTransitioning || isAnimating.current) return;
    isAnimating.current = true;

    const run = async () => {
      switch (transitionType) {
        case "curtain":
          await curtainWipe();
          break;
        case "columns":
          await columnReveal();
          break;
        case "diagonal":
          await diagonalWipe();
          break;
        case "fade":
          await fadeThroughBlack();
          break;
        case "zoom":
          await zoomOut();
          break;
      }
      isAnimating.current = false;
      complete();
    };

    async function curtainWipe() {
      show(curtainScope.current);
      show(lineScope.current);
      await animateCurtain(curtainScope.current, { clipPath: "inset(0 0% 0 0)" }, { duration: 0.6, ease: EASE_IN });
      animateLine(lineScope.current, { scaleX: 1 }, { duration: 0.3, ease: EASE_OUT });
      onNavigate();
      await delay(500);
      animateLine(lineScope.current, { scaleX: 0 }, { duration: 0 });
      await animateCurtain(curtainScope.current, { clipPath: "inset(0 0 0 100%)" }, { duration: 0.6, ease: EASE_IN });
      animateCurtain(curtainScope.current, { clipPath: "inset(0 100% 0 0)" }, { duration: 0 });
      hide(curtainScope.current);
      hide(lineScope.current);
    }

    async function columnReveal() {
      const cols = [
        [col1, animateCol1],
        [col2, animateCol2],
        [col3, animateCol3],
        [col4, animateCol4],
        [col5, animateCol5],
      ] as const;

      for (const [scope] of cols) show(scope.current);

      // Columns grow up — slower, more stagger
      for (let i = 0; i < cols.length; i++) {
        const [scope, animate] = cols[i];
        animate(scope.current, { scaleY: 1 }, { duration: 0.5, ease: EASE_IN, delay: i * 0.08 });
      }
      await delay(700);
      onNavigate();
      await delay(500);

      // Columns retract — match the slow pace
      for (let i = 0; i < cols.length; i++) {
        const [scope, animate] = cols[i];
        animate(scope.current, { scaleY: 0 }, { duration: 0.5, ease: EASE_IN, delay: i * 0.08 });
      }
      await delay(700);

      for (const [scope, animate] of cols) {
        animate(scope.current, { scaleY: 0 }, { duration: 0 });
        hide(scope.current);
      }
    }

    async function diagonalWipe() {
      show(diagScope.current);
      await animateDiag(diagScope.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }, { duration: 0.7, ease: EASE_IN });
      onNavigate();
      await delay(500);
      await animateDiag(diagScope.current, { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }, { duration: 0.7, ease: EASE_IN });
      animateDiag(diagScope.current, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, { duration: 0 });
      hide(diagScope.current);
    }

    async function fadeThroughBlack() {
      show(fadeScope.current);
      await animateFade(fadeScope.current, { opacity: 1 }, { duration: 0.5, ease: EASE_OUT });
      onNavigate();
      await delay(500);
      await animateFade(fadeScope.current, { opacity: 0 }, { duration: 0.5, ease: EASE_OUT });
      hide(fadeScope.current);
    }

    async function zoomOut() {
      show(zoomScope.current);
      await animateZoom(zoomScope.current, { opacity: 1, scale: 1 }, { duration: 0.6, ease: EASE_IN });
      onNavigate();
      await delay(500);
      await animateZoom(zoomScope.current, { scale: 0.9, opacity: 0 }, { duration: 0.6, ease: EASE_IN });
      animateZoom(zoomScope.current, { scale: 1.1, opacity: 0 }, { duration: 0 });
      hide(zoomScope.current);
    }

    run();
  }, [
    isTransitioning, transitionType, onNavigate, complete,
    animateCurtain, curtainScope, animateLine, lineScope,
    animateCol1, col1, animateCol2, col2, animateCol3, col3, animateCol4, col4, animateCol5, col5,
    animateDiag, diagScope, animateFade, fadeScope, animateZoom, zoomScope,
  ]);

  return (
    <div className="fixed inset-0 z-[55] pointer-events-none">
      {/* CURTAIN */}
      <div ref={curtainScope} className="absolute inset-0 bg-black invisible" style={{ clipPath: "inset(0 100% 0 0)" }} />

      {/* GOLD LINE */}
      <div ref={lineScope} className="absolute top-1/2 left-0 right-0 h-[2px] bg-gold -translate-y-1/2 origin-left invisible" style={{ scaleX: 0 }} />

      {/* COLUMNS */}
      {[col1, col2, col3, col4, col5].map((ref, i) => (
        <div key={i} ref={ref} className="absolute top-0 bottom-0 bg-black origin-bottom invisible" style={{ left: `${i * 20}%`, width: "20.5%", scaleY: 0 }} />
      ))}

      {/* DIAGONAL */}
      <div ref={diagScope} className="absolute inset-0 bg-black invisible" style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }} />

      {/* FADE */}
      <div ref={fadeScope} className="absolute inset-0 bg-black invisible" style={{ opacity: 0 }} />

      {/* ZOOM */}
      <div ref={zoomScope} className="absolute inset-0 bg-black invisible" style={{ opacity: 0, scale: 1.1 }} />
    </div>
  );
}

function show(el: HTMLElement) {
  el.style.visibility = "visible";
}

function hide(el: HTMLElement) {
  el.style.visibility = "hidden";
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
