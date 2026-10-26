"use client";

import { motion } from "framer-motion";

export function ProductsHero() {
  return (
    <section className="pt-32 sm:pt-40 pb-10 sm:pb-14 px-6 sm:px-10 md:px-16 lg:px-24 bg-background relative overflow-hidden">
{/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>
            <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-foreground block">
              Discover Our
            </span>
            <span className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase text-foreground block -mt-1 sm:-mt-2">
              Products
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
