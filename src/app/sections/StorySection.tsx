"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TransitionLink } from "@/components/TransitionLink";

export function StorySection() {
  const storyImage = PlaceHolderImages.find((img) => img.id === "story-image");

  return (
    <section id="story" className="relative bg-background overflow-hidden">
      {/* Top section — text first, full width */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-[1px] w-8 bg-gold" />
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Our Origin
          </span>
        </div>

        <div className="max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-2xl sm:text-4xl md:text-5xl leading-[0.95]"
          >
            Farm to
            <br />
            <span className="font-serif italic font-normal text-muted-foreground">Crown</span>
          </motion.h2>
        </div>
      </div>

      {/* Bottom — image bleeds left, text right with offset */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Image — bleeds to left edge, 7 columns */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 relative aspect-[4/3] md:aspect-auto md:h-[500px]"
        >
          {storyImage && (
            <Image
              src={storyImage.imageUrl}
              alt={storyImage.description}
              data-ai-hint={storyImage.imageHint}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </motion.div>

        {/* Text — 5 columns, with padding that creates asymmetry */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-5 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-10 md:py-0"
        >
          <p className="font-inter text-base sm:text-lg text-muted-foreground leading-relaxed tracking-tight">
            From 2,00,000 litres of milk procured daily across 1,500+ villages
            to our 12-acre facility in Belagavi — every scoop of King Ice Cream
            carries the legacy of 40,000+ farmer families.
          </p>
          <p className="font-inter text-base sm:text-lg text-muted-foreground leading-relaxed tracking-tight mt-6">
            No shortcuts. No palm oil.
            <br />
            <span className="text-foreground font-semibold">
              Just pure, honest indulgence.
            </span>
          </p>

          <div className="mt-8">
            <TransitionLink
              href="/aboutus"
              className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
              data-cursor-text="Story"
            >
              <span className="h-[1px] w-6 bg-foreground/30 group-hover:w-12 transition-all duration-500" />
              Read our full story
            </TransitionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
