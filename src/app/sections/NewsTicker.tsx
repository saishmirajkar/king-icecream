"use client";
import { motion } from "framer-motion";

export function NewsTicker() {
  const items = [
    "Mango Season Specials",
    "15,000+ Stores",
    "Matka Kulfi Collection",
    "Available on Zomato",
    "Pure Milk, No Palm Oil",
    "Now in 4 States",
  ];

  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <section className="py-5 bg-foreground text-background overflow-hidden border-t border-background/10">
      <div className="relative whitespace-nowrap">
        <motion.div
          className="inline-flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, duration: 30, ease: "linear" },
          }}
        >
          {track.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-sans text-sm sm:text-base uppercase tracking-[0.15em] px-4 sm:px-6">
                {item}
              </span>
              <span className="text-gold text-xs">&#9670;</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
