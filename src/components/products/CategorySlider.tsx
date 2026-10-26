"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

type Props = { categoryName: string; products: ImagePlaceholder[] };
const palette: Record<string,string> = { Cones:"#ffcf4f", Cups:"#f8bfd2", Kulfi:"#c1e5db", Sticks:"#ddd0ee", "Family Packs":"#ffd6b7", Sundaes:"#c8e2ed", "Sip Ups":"#f5dba2" };

export function CategorySlider({ categoryName, products }: Props) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const total = products.length;
  const paginate = useCallback((step:number) => { if(total) setIndex(current => (current + step + total) % total); },[total]);
  useEffect(() => {
    const onKey = (e:KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if(e.key==="ArrowRight") paginate(1);
      if(e.key==="ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown",onKey);
    return () => window.removeEventListener("keydown",onKey);
  },[paginate]);
  const product=products[index];
  const backdrop=palette[categoryName] || "#ffcf4f";

  return (
    <div className="overflow-hidden bg-[#fff8e6] pt-[72px] text-[#073c50] md:pt-[88px]">
      <section className="relative overflow-hidden" style={{backgroundColor:backdrop}}>
        <div className="king-shell pt-7 md:pt-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest"><TransitionLink href="/products" className="hover:underline">The collection</TransitionLink><span>/</span><span>{categoryName}</span></div>
          <div className="grid items-center gap-4 py-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-10 lg:py-16">
            <div className="relative z-10">
              <p className="king-label mb-5 text-[#00799b]">King Ice Cream / {categoryName}</p>
              <h1 className="king-display break-words text-[clamp(4.3rem,9vw,10rem)]">{categoryName}<span className="text-[#00799b]">.</span></h1>
              <p className="mt-6 max-w-sm text-lg font-semibold leading-snug">A little moment of happiness, made with the goodness of pure milk.</p>
              <p className="king-label mt-9">{total} {total===1?"flavour":"flavours"} to discover</p>
            </div>
            <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[650px]">
              <div className="king-product-stage absolute inset-[8%]"/>
              {product && <AnimatePresence mode="wait">
                <motion.div key={product.id} initial={reducedMotion ? false : {opacity:0,x:35,scale:.94}} animate={{opacity:1,x:0,scale:1}} exit={reducedMotion ? undefined : {opacity:0,x:-35,scale:.94}} transition={{duration:reducedMotion ? 0 : .32}} className="absolute inset-[2%] md:inset-[4%]">
                  <Image src={product.imageUrl} alt={product.name || `${categoryName} ice cream`} fill priority sizes="(max-width: 1024px) 90vw, 55vw" className="object-contain drop-shadow-[15px_20px_12px_rgba(56,43,25,.17)]"/>
                </motion.div>
              </AnimatePresence>}
              {total>1 && <>
                <button type="button" onClick={()=>paginate(-1)} aria-label="Previous flavour" className="absolute left-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#fff8e6] shadow-md transition-transform hover:scale-110 md:h-16 md:w-16" data-testid="button-prev-product"><ArrowLeft size={23}/></button>
                <button type="button" onClick={()=>paginate(1)} aria-label="Next flavour" className="absolute right-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#fff8e6] shadow-md transition-transform hover:scale-110 md:h-16 md:w-16" data-testid="button-next-product"><ArrowRight size={23}/></button>
              </>}
            </div>
          </div>
          {product && <div className="relative z-10 flex flex-col justify-between gap-5 border-t border-[#073c50]/25 py-6 md:flex-row md:items-end md:py-9" aria-live="polite">
            <div><p className="king-label mb-2 text-[#00799b]">The flavour</p><h2 className="king-display text-[clamp(2.4rem,4vw,5rem)]">{product.name || categoryName}</h2>{product.description && <p className="mt-2 max-w-md font-medium">{product.description}</p>}</div>
            <span className="king-label shrink-0">{String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
          </div>}
          {!product && <div className="pb-16"><h2 className="king-display text-4xl">More goodness coming soon.</h2><TransitionLink href="/products" className="king-pill mt-6">Browse all ice creams <ArrowUpRight size={18}/></TransitionLink></div>}
        </div>
      </section>
      <HomeSectionDivider from={backdrop} to={total > 1 ? "#fff8e6" : "#00799b"} />
      {total>1 && <section className="king-shell py-16 md:py-24">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="king-label mb-4 text-[#00799b]">The line-up</p><h2 className="king-display text-[clamp(3rem,6vw,6rem)]">All {categoryName}.</h2></div><p className="font-semibold text-[#073c50]/70">Pick a flavour to take a closer look.</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((item,i)=><button key={item.id} type="button" onClick={()=>{setIndex(i);window.scrollTo({top:0,behavior:reducedMotion?"instant":"smooth"});}} aria-pressed={index===i} className={`group rounded-[1.5rem] border-2 p-3 text-left transition-transform hover:-translate-y-1 ${index===i?"border-[#00799b]":"border-transparent"}`} style={{backgroundColor:index===i?backdrop:"#f7edda"}} data-testid={`button-select-product-${i}`}>
            <span className="relative block aspect-square"><Image src={item.imageUrl} alt={item.name || `${categoryName} flavour`} fill sizes="(max-width: 640px) 46vw, 20vw" className="object-contain transition-transform group-hover:scale-105"/></span>
            <span className="mt-3 block px-2 pb-2 text-sm font-black leading-tight">{item.name || categoryName}</span>
          </button>)}
        </div>
      </section>}
      {total > 1 && <HomeSectionDivider from="#fff8e6" to="#00799b" />}
      <section className="bg-[#00799b] py-16 text-center text-[#fff8e6] md:py-24"><div className="king-shell"><p className="king-label mb-5 text-[#ffbf31]">Keep exploring</p><h2 className="king-display text-[clamp(3.4rem,7vw,7rem)]">More to love.</h2><TransitionLink href="/products" className="king-pill mt-8" data-testid="link-back-products">See all ice creams <ArrowUpRight size={18}/></TransitionLink></div></section>
    </div>
  );
}