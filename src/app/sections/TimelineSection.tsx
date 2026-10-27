"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { RevealTitle } from "@/components/motion/reveal";
import { ScrollLine } from "@/components/motion/scroll";

const milestones = [
  {
    year: "2004",
    title: "Vijaykant Dairy Founded",
    description:
      "Founded by Late Shri Shivkant Sidnal in Belagavi, Karnataka. Started with 5,000 litres of milk per day from a modest facility in Neginhal village — a vision that would grow into one of India's most respected regional dairies.",
  },
  {
    year: "2010s",
    title: "Adityaa Milk Becomes a Household Name",
    description:
      "Expanded to 1,500+ villages, 6 chilling centres, and 2,00,000 litres/day. Adityaa Milk becomes the go-to dairy brand in North Karnataka & Goa.",
  },
  {
    year: "2018",
    title: "Hindustan Unilever Partnership",
    description:
      "HUL partners with Vijaykant Dairy to manufacture Kwality Walls ice cream. World-class quality protocols and infrastructure established.",
  },
  {
    year: "Aug 2024",
    title: "King Ice Cream Launches",
    description:
      "After the HUL contract ends, Vijaykant Dairy launches its own proprietary brand — King Ice Cream. Two decades of mastery, now under our own crown.",
  },
  {
    year: "2026",
    title: "New Plant & Expansion",
    description:
      "Rs. 45.70 Crore new manufacturing plant operational. Now in 15,000+ retail outlets across Karnataka, Maharashtra, Goa & Kerala.",
  },
];

export function TimelineSection() {
  const reducedMotion = useReducedMotionSafe();
  return (
    <section className="bg-[#c9e4ef] px-4 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="king-page-kicker mb-5 text-center text-[#00799b]">2004 — today</p>
        <RevealTitle className="king-section-title mb-16 text-center text-[#073c50]" lines={["Our Journey"]} />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-4 top-0 w-[3px] -translate-x-[1px] rounded-full bg-[#00799b]/20 md:left-1/2" />
          <ScrollLine className="absolute bottom-0 left-4 top-0 w-[3px] -translate-x-[1px] md:left-1/2" />

          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={reducedMotion ? false : { opacity: 0, y: 40, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse md:text-right"
              }`}
            >
              {/* Dot */}
              <motion.div initial={reducedMotion ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.2 }} className="absolute left-4 z-10 mt-7 h-6 w-6 -translate-x-[11px] rounded-full border-[5px] border-[#c9e4ef] bg-[#ffbf31] shadow-[0_0_0_3px_#00799b] md:left-1/2" />

              {/* Content */}
              <div className="group ml-12 rounded-[2rem] bg-[#fff8e6] p-6 shadow-[7px_7px_0_rgba(0,121,155,.13)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[12px_14px_0_rgba(0,121,155,.18)] md:ml-0 md:w-[calc(50%-2rem)] md:p-8">
                <span className="king-display text-5xl text-[#00799b] transition-colors duration-300 group-hover:text-[#f0a400]">
                  {milestone.year}
                </span>
                <h3 className="mb-3 mt-3 text-xl font-black text-[#073c50]">
                  {milestone.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#073c50]/75">
                  {milestone.description}
                </p>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
