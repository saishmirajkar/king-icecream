"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  const reducedMotion = useReducedMotion();
  return (
    <section className="bg-[#c9e4ef] px-4 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="king-section-title mb-14 text-center text-[#073c50]"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-[#00799b]/40 md:left-1/2" />

          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse md:text-right"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 z-10 mt-7 h-4 w-4 -translate-x-[7px] rounded-full border-4 border-[#c9e4ef] bg-[#00799b] md:left-1/2" />

              {/* Content */}
              <div className="ml-12 rounded-[2rem] bg-[#fff8e6] p-6 shadow-[7px_7px_0_rgba(0,121,155,.13)] md:ml-0 md:w-[calc(50%-2rem)] md:p-8">
                <span className="king-display text-4xl text-[#00799b]">
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
