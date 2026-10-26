"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Sneha K.",
    location: "Belagavi",
    text: "The Kesar Pista is out of this world — you can taste that it is made from real milk, not some frozen dessert shortcut.",
  },
  {
    name: "Rohan D.",
    location: "Goa",
    text: "My guests could not believe it was a local brand — they thought it was an imported premium. King is the real deal.",
  },
  {
    name: "Priya N.",
    location: "Hubli",
    text: "The Matka Malai Kulfi reminded me of my grandmother's homemade kulfi. Dense, creamy, and fragrant with saffron.",
  },
  {
    name: "Amit P.",
    location: "Kolhapur",
    text: "As a retailer, King Ice Cream has been the best addition to my shop in years. The Chocobar is always sold out by evening.",
  },
  {
    name: "Deepa S.",
    location: "Mangaluru",
    text: "I was skeptical until I learned they used to make Kwality Walls. Once I tried the Gudbud Sundae, I was hooked.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24 bg-background relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="h-[1px] w-8 bg-foreground/20" />
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            What our customers say
          </span>
        </div>

        {/* Quote — large, editorial */}
        <div className="relative min-h-[200px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif italic font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-snug text-foreground max-w-4xl">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-8 sm:mt-10 flex items-center gap-4">
                <span className="h-[1px] w-6 bg-gold" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t.name}, {t.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator — minimal line, not dots */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <span className="font-display text-sm text-muted-foreground">
            {String(current + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 max-w-[200px] h-[1px] bg-foreground/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              key={current}
            />
          </div>
          <span className="font-display text-sm text-muted-foreground">
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Large background number */}
      <span className="absolute top-8 right-6 sm:right-16 font-display text-[20vw] text-foreground/[0.02] leading-none select-none pointer-events-none">
        &ldquo;
      </span>
    </section>
  );
}
