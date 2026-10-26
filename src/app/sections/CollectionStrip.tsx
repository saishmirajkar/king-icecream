"use client";

import { motion } from "framer-motion";
import { TransitionLink } from "@/components/TransitionLink";

const collections = [
  { name: "Cones", count: "06" },
  { name: "Cups", count: "06" },
  { name: "Kulfi", count: "04" },
  { name: "Sticks", count: "05" },
  { name: "Family Packs", count: "04" },
  { name: "Sundaes", count: "03" },
];

export function CollectionStrip() {
  return (
    <section id="collections" className="py-16 sm:py-20 bg-background border-y border-border">
      <div className="px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TransitionLink
                href="/products"
                className="group block py-6 sm:py-8 pr-4 sm:pr-6 border-r border-border last:border-r-0"
                data-cursor-text="View"
              >
                <span className="font-sans text-[10px] text-muted-foreground block mb-2">
                  {collection.count} products
                </span>
                <span className="font-sans text-sm sm:text-base md:text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300 block leading-tight">
                  {collection.name}
                </span>
                <span className="h-[1px] w-0 group-hover:w-8 bg-gold block mt-3 transition-all duration-500" />
              </TransitionLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
