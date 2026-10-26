"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

export type SlideRenderProps = {
  progress: MotionValue<number>;
};

export type StackedSlide = {
  image: string;
  alt: string;
  content?: ReactNode | ((props: SlideRenderProps) => ReactNode);
  priority?: boolean;
  overlayClassName?: string;
};

/**
 * Layered sticky reveal stack.
 *
 * Every slide is stacked absolutely inside a sticky viewport-sized container.
 * Lower indices sit on top. Nothing translates — instead, the current slide's
 * clip-path is wiped from the bottom up (inset bottom 0% → 100%), so a single
 * horizontal divider line moves up the viewport: above the line is the current
 * scene, below the line is the next scene already in place. Image and overlay
 * are clipped together so the heading never drifts onto the wrong image.
 */
export function StackedScrollSections({ slides }: { slides: StackedSlide[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {slides.map((slide, i) => (
          <SectionSlide
            key={i}
            slide={slide}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function SectionSlide({
  slide,
  index,
  total,
  scrollYProgress,
}: {
  slide: StackedSlide;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const transitions = Math.max(1, total - 1);
  const isLast = index === total - 1;

  const wipeStart = index / transitions;
  const wipeEnd = (index + 1) / transitions;

  const clipPath = useTransform(
    scrollYProgress,
    [wipeStart, wipeEnd],
    isLast
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
  );

  const revealStart = Math.max(0, (index - 1) / transitions);
  const revealEnd = index / transitions;

  const localProgress = useTransform(
    scrollYProgress,
    [revealStart, revealEnd],
    index === 0 ? [1, 1] : [0, 1],
  );

  const renderedContent =
    typeof slide.content === "function"
      ? slide.content({ progress: localProgress })
      : slide.content;

  return (
    <motion.section
      style={{ clipPath, zIndex: total - index }}
      className="absolute inset-0 overflow-hidden will-change-[clip-path]"
    >
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority={slide.priority ?? index === 0}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className={slide.overlayClassName ?? "absolute inset-0 bg-black/25"}
      />
      {renderedContent && (
        <div className="relative z-10 h-full w-full">{renderedContent}</div>
      )}
    </motion.section>
  );
}
