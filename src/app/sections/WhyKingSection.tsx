"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "0%", label: "Palm Oil", detail: "Pure milk only" },
  { number: "40K+", label: "Farmers", detail: "Supported daily" },
  { number: "20+", label: "Years", detail: "Of dairy mastery" },
  { number: "15K+", label: "Outlets", detail: "Across 4 states" },
];

export function WhyKingSection() {
  return (
    <section className="relative bg-[#f5f0e8] text-foreground overflow-hidden">
      {/* Top divider text */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 pt-16 sm:pt-20 pb-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <span className="h-[1px] w-8 bg-gold" />
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
            By the Numbers
          </span>
        </motion.div>
      </div>

      {/* Big statement */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 pb-12 sm:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-lg sm:text-xl md:text-3xl lg:text-4xl leading-snug max-w-3xl text-foreground"
        >
          Two decades of dairy mastery.
          <br className="hidden sm:block" />
          <span className="text-gold not-italic">One royal promise.</span>
        </motion.h2>
      </div>

      {/* Stats strip — horizontal, edge-to-edge */}
      <div className="border-t border-foreground/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-4 sm:p-6 md:p-8 border-r border-b md:border-b-0 border-foreground/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r overflow-hidden"
            >
              <div className="font-sans text-lg sm:text-xl md:text-2xl lg:text-5xl xl:text-6xl font-black text-black leading-none">
                {stat.number}
              </div>
              <div className="font-sans text-[9px] sm:text-[10px] lg:text-sm xl:text-base uppercase tracking-normal mt-1.5 lg:mt-3 text-black">
                {stat.label}
              </div>
              <p className="font-serif italic text-black text-[9px] sm:text-[10px] mt-1 hidden sm:block">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
