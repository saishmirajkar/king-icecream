"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import StackingCards, { StackingCardItem } from "@/components/ui/stacking-cards";
import { categorySlug } from "@/lib/categories";

const root = "/images/Product Images copy/";
const categories = [
  { name: "Cones", caption: "The classic, with a crown on top.", image: "120 ml Cone_Tiramisu_Final (1).png", color: "#ffcf9d" },
  { name: "Cups", caption: "A little cup of a lot of joy.", image: "100 ml Premium cup Kesar Pista.png", color: "#f6bed0" },
  { name: "Kulfi", caption: "Tradition, made delicious.", image: "Matka Kulfi_Render.png", color: "#bde3dc" },
  { name: "Sticks", caption: "Good times on a stick.", image: "Chocobar 65ml_311224.png", color: "#d8cbf2" },
  { name: "Family Packs", caption: "Bring everyone to the table.", image: "700ml_Alphonso Mango.png", color: "#f9dda1" },
  { name: "Sundaes", caption: "Spoonful after spoonful.", image: "Royal Sundae_180 ml.png", color: "#c9e4ef" },
  { name: "Sip Ups", caption: "Take your happy to go.", image: "Mango Sip Up_Mockup.png", color: "#f7c8ad" },
];

export function HomeDiscoverSection() {
  return (
    <section id="discover" className="king-shell king-discover py-24 md:py-36" aria-labelledby="discover-heading">
      <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="king-label mb-5 text-[#00799b]">01 / Find your happy</p>
          <h2 id="discover-heading" className="king-display king-section-heading">A treat for<br/><span className="text-[#00799b]">every mood.</span></h2>
        </div>
        <div className="max-w-xs">
          <p className="mb-5 text-lg font-medium leading-snug text-[#073c50]/75">From a quick little pick-me-up to the whole family&apos;s favourite, there&apos;s always a King for that.</p>
          <TransitionLink href="/products" className="inline-flex items-center gap-2 border-b-2 border-[#00799b] pb-1 font-black text-[#00799b]">See the whole collection <ArrowUpRight size={19}/></TransitionLink>
        </div>
      </div>

      <StackingCards
        className="king-stack-panel"
        totalCards={categories.length}
        scaleMultiplier={0.012}
        aria-label="King Ice Cream categories"
      >
        {categories.map((cat, index) => {
          const slug = categorySlug(cat.name);
          return (
            <StackingCardItem
              key={slug}
              index={index}
              id={`collection-${slug}`}
              className="king-stack-item-wrap"
              stickyTop={`calc(var(--king-stack-sticky-top) + ${index} * var(--king-stack-step))`}
            >
              <TransitionLink
                href={`/products/${slug}`}
                className="king-category-card king-stack-card group"
                style={{ backgroundColor: cat.color }}
                data-testid={`link-category-${slug}`}
                aria-label={`${cat.name}: ${cat.caption}`}
              >
                <div className="king-stack-copy">
                  <span className="king-label opacity-65">0{index + 1} / The collection</span>
                  <h3 className="king-display king-stack-title">{cat.name}</h3>
                  <p className="king-stack-caption">{cat.caption}</p>
                </div>
                <div className="king-stack-product">
                  <Image
                    src={`${root}${cat.image}`}
                    alt={`King Ice Cream ${cat.name}`}
                    fill
                    sizes="(max-width: 768px) 82vw, 62vw"
                    className="object-contain object-center"
                  />
                </div>
                <span className="king-stack-arrow" aria-hidden="true"><ArrowUpRight size={22}/></span>
                <span className="king-stack-prompt" aria-hidden="true">Find your flavour</span>
              </TransitionLink>
            </StackingCardItem>
          );
        })}
      </StackingCards>
    </section>
  );
}
