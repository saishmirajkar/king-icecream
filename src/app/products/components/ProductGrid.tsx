"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

export function ProductGrid({ products }: { products: ImagePlaceholder[] }) {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        {/* Product count */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={products.map(p => p.id).join(',')}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12"
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif italic text-muted-foreground text-base">
              No products found matching your selection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
