"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { url: "/images/Product Images copy/Royal Sundae_180 ml.png", alt: "Royal Sundae" },
  { url: "/images/Product Images copy/Chocobar 65ml_311224.png", alt: "Chocobar" },
  { url: "/images/Product Images copy/Matka Kulfi_Render.png", alt: "Matka Kulfi" },
  { url: "/images/Product Images copy/100 ml Premium cup Kesar Pista.png", alt: "Kesar Pista Cup" },
  { url: "/images/Product Images copy/Triple Crown_65ml_Render.png", alt: "Triple Crown" },
  { url: "/images/Product Images copy/Mango Dolly_50ml_311224.png", alt: "Mango Dolly" },
];

export function InstagramSection() {
  return (
    <section className="bg-background">
      {/* Header */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-12 sm:py-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-muted-foreground block mb-2">
            Instagram
          </span>
          <a href="https://www.instagram.com/kingicecream.india/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            <h2 className="font-sans font-bold text-base sm:text-xl md:text-3xl">
              @kingicecream.india
            </h2>
          </a>
        </div>
        <a
          href="https://www.instagram.com/kingicecream.india/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
          data-cursor-text="Follow"
        >
          Follow us
          <span className="h-[1px] w-6 bg-foreground/30 group-hover:w-12 transition-all duration-500" />
        </a>
      </div>

      {/* Grid — edge to edge, no padding, varying heights */}
      <div className="grid grid-cols-3 md:grid-cols-6">
        {images.map((img, i) => (
          <motion.a
            key={i}
            href="https://www.instagram.com/kingicecream.india/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`relative overflow-hidden group ${
              i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
            } md:aspect-square`}
            data-cursor-text="Insta"
          >
            <div className="absolute inset-0 bg-[#f5f0e8]" />
            <Image
              src={img.url}
              alt={img.alt}
              fill
              style={{ objectFit: "contain" }}
              className="transition-transform duration-700 ease-out group-hover:scale-110 p-4"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-gold/20 transition-colors duration-500" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
