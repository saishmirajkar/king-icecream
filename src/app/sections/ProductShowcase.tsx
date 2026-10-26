"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TransitionLink } from "@/components/TransitionLink";

const featuredIds = ["product-2", "product-1", "product-3", "product-4"];
const products = featuredIds.map((id) => PlaceHolderImages.find((img) => img.id === id)!).filter(Boolean);

// Asymmetric grid positions — each product gets a unique layout personality
const layouts = [
  "col-span-2 row-span-2",         // Large hero card
  "col-span-1 row-span-1",         // Small
  "col-span-1 row-span-1",         // Small
  "col-span-2 row-span-1",         // Wide
];

export function ProductShowcase() {
  return (
    <section id="products" className="py-20 sm:py-28 px-6 sm:px-10 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header — left-aligned, not centered */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
            >
              Our Selection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-2"
            >
              <span className="font-serif italic font-normal text-2xl sm:text-4xl md:text-5xl text-foreground">Royal Creations</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <TransitionLink
              href="/products"
              className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
              data-cursor-text="All"
            >
              View all products
              <span className="h-[1px] w-6 bg-foreground/30 group-hover:w-12 transition-all duration-500" />
            </TransitionLink>
          </motion.div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] sm:auto-rows-[260px] md:auto-rows-[300px] gap-2 sm:gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative overflow-hidden bg-secondary ${layouts[i]}`}
              data-cursor-text="View"
            >
              {/* Image */}
              <div className="absolute inset-0 p-6 sm:p-10 pb-16 sm:pb-20">
                <div className="relative w-full h-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name || "Ice cream product"}
                    data-ai-hint={product.imageHint}
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Text overlay — bottom left, not centered */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
                <h3 className="font-sans text-white text-sm sm:text-base md:text-lg font-bold leading-tight">
                  {product.name}
                </h3>
                <p className="font-serif italic text-white text-xs sm:text-sm mt-1 line-clamp-1 hidden sm:block">
                  {product.description}
                </p>
              </div>

              {/* Number overlay — top right */}
              <span className="absolute top-2 right-2 sm:top-4 sm:right-4 font-display text-white/10 text-2xl sm:text-4xl select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
