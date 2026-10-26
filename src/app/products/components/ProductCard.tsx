"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ProductCard({ product }: { product: ImagePlaceholder }) {
  return (
    <motion.div variants={itemVariants} className="group" data-cursor-text="View">
      {/* Card — image only */}
      <div className="aspect-square relative overflow-hidden rounded-2xl">
        <Image
          src={product.imageUrl}
          alt={product.name || "Ice cream product"}
          data-ai-hint={product.imageHint}
          fill
          style={{ objectFit: "contain" }}
          className="transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Text below card */}
      <div className="mt-3 sm:mt-4 px-1">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-normal leading-tight line-clamp-2">
            {product.name}
          </h3>
          {product.price && (
            <span className="font-sans text-xs sm:text-sm text-foreground shrink-0">
              ₹{product.price}
            </span>
          )}
        </div>
        {product.description && (
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-serif italic line-clamp-1">
            {product.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
