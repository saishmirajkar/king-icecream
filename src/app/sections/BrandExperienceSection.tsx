"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = "Trusted by Millions. Crafted for Royalty.".split(" ");

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useTransform>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-[0.3em]"
    >
      {word}
    </motion.span>
  );
}

export function BrandExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section ref={sectionRef} className="py-32 sm:py-48 px-4 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-serif italic text-lg sm:text-2xl md:text-4xl lg:text-5xl leading-snug">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>
      </div>
    </section>
  );
}
