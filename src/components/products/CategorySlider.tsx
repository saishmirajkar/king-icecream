"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { usePageScroll } from "@/components/LenisProvider";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Magnetic, PointerField, PointerLayer } from "@/components/motion/interactive";
import { SpinBadge, Sprinkles, SunRays } from "@/components/motion/decor";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

type Props = { categoryName: string; products: ImagePlaceholder[] };
const palette: Record<string,string> = { Cones:"#ffcf4f", Cups:"#f8bfd2", Kulfi:"#c1e5db", Sticks:"#ddd0ee", "Family Packs":"#ffd6b7", Sundaes:"#c8e2ed", "Sip Ups":"#f5dba2" };

export function CategorySlider({ categoryName, products }: Props) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const reducedMotion = useReducedMotionSafe();
  const scrollTo = usePageScroll();
  const total = products.length;
  const paginate = useCallback((step:number) => { if(total) setState(([current]) => [(current + step + total) % total, step]); },[total]);
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
      <PointerField className="relative overflow-hidden" style={{backgroundColor:backdrop}}>
        <Sprinkles count={14} seed={categoryName.length * 7} className="opacity-60" />
        <div className="king-shell relative pt-7 md:pt-10">
          <Reveal className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest"><TransitionLink href="/products" className="king-link">The collection</TransitionLink><span>/</span><span>{categoryName}</span></Reveal>
          <div className="grid items-center gap-4 py-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-10 lg:py-16">
            <div className="relative z-10">
              <Reveal as="p" className="king-label mb-5 text-[#00799b]">King Ice Cream / {categoryName}</Reveal>
              <RevealTitle as="h1" className="king-display break-words text-[clamp(4.3rem,9vw,10rem)]" lines={[<span key="l">{categoryName}<span className="text-[#00799b]">.</span></span>]} />
              <Reveal delay={0.25}><p className="mt-6 max-w-sm text-lg font-semibold leading-snug">A little moment of happiness, made with the goodness of pure milk.</p></Reveal>
              <Reveal delay={0.35}><p className="king-label mt-9">{total} {total===1?"flavour":"flavours"} to discover</p></Reveal>
              {total>1 && <Reveal delay={0.4} className="mt-4 h-[3px] max-w-[240px] overflow-hidden rounded-full bg-[#073c50]/15">
                <motion.div className="h-full rounded-full bg-[#073c50]" animate={{ width: `${((index + 1) / total) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
              </Reveal>}
            </div>
            <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[650px]">
              <PointerLayer depth={-10} className="absolute inset-[8%]">
                <motion.div key={`stage-${index}`} className="king-product-stage h-full w-full" initial={reducedMotion ? false : { scale: 0.92 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 12 }} />
              </PointerLayer>
              <SunRays className="absolute left-1/2 top-1/2 aspect-square w-[96%] -translate-x-1/2 -translate-y-1/2 text-[#fff8e6]/60" />
              {product && <PointerLayer depth={24} className="absolute inset-[2%] md:inset-[4%]">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={product.id}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: d * 120, rotate: d * 14, scale: 0.85 }),
                      center: { opacity: 1, x: 0, rotate: 0, scale: 1 },
                      exit: (d: number) => ({ opacity: 0, x: d * -120, rotate: d * -14, scale: 0.85 }),
                    }}
                    initial={reducedMotion ? false : "enter"}
                    animate="center"
                    exit={reducedMotion ? undefined : "exit"}
                    transition={{ type: "spring", stiffness: 160, damping: 20 }}
                    className="absolute inset-0"
                  >
                    <div className="king-bob relative h-full w-full">
                      <Image src={product.imageUrl} alt={product.name || `${categoryName} ice cream`} fill priority sizes="(max-width: 1024px) 90vw, 55vw" className="object-contain drop-shadow-[15px_20px_12px_rgba(56,43,25,.17)]"/>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </PointerLayer>}
              <SpinBadge text="Made with pure milk • King • " className="absolute bottom-[6%] left-[4%] z-10 hidden h-24 w-24 bg-[#073c50] text-[#ffbf31] md:grid">
                <span aria-hidden="true" className="text-xl text-[#fff8e6]">♛</span>
              </SpinBadge>
              {total>1 && <>
                <Magnetic className="absolute left-0 top-1/2 z-20 -translate-y-1/2"><button type="button" onClick={()=>paginate(-1)} aria-label="Previous flavour" className="grid h-12 w-12 place-items-center rounded-full bg-[#fff8e6] shadow-md transition-colors hover:bg-[#073c50] hover:text-[#fff8e6] md:h-16 md:w-16" data-testid="button-prev-product"><ArrowLeft size={23}/></button></Magnetic>
                <Magnetic className="absolute right-0 top-1/2 z-20 -translate-y-1/2"><button type="button" onClick={()=>paginate(1)} aria-label="Next flavour" className="grid h-12 w-12 place-items-center rounded-full bg-[#fff8e6] shadow-md transition-colors hover:bg-[#073c50] hover:text-[#fff8e6] md:h-16 md:w-16" data-testid="button-next-product"><ArrowRight size={23}/></button></Magnetic>
              </>}
            </div>
          </div>
          {product && <div className="relative z-10 flex flex-col justify-between gap-5 border-t border-[#073c50]/25 py-6 md:flex-row md:items-end md:py-9" aria-live="polite">
            <div className="min-h-[5.5rem]">
              <p className="king-label mb-2 text-[#00799b]">The flavour</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={product.id} initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <h2 className="king-display text-[clamp(2.4rem,4vw,5rem)]">{product.name || categoryName}</h2>
                  {product.description && <p className="mt-2 max-w-md font-medium">{product.description}</p>}
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="king-label shrink-0 tabular-nums">{String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
          </div>}
          {!product && <div className="pb-16"><h2 className="king-display text-4xl">More goodness coming soon.</h2><TransitionLink href="/products" className="king-pill mt-6">Browse all ice creams <ArrowUpRight size={18}/></TransitionLink></div>}
        </div>
      </PointerField>
      <HomeSectionDivider from={backdrop} to={total > 1 ? "#fff8e6" : "#00799b"} />
      {total>1 && <section className="king-shell py-16 md:py-24">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><Reveal as="p" className="king-label mb-4 text-[#00799b]">The line-up</Reveal><RevealTitle className="king-display text-[clamp(3rem,6vw,6rem)]" lines={[`All ${categoryName}.`]} /></div><Reveal delay={0.2}><p className="font-semibold text-[#073c50]/70">Pick a flavour to take a closer look.</p></Reveal></div>
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" gap={0.05}>
          {products.map((item,i)=><StaggerItem key={item.id}><button type="button" onClick={()=>{setState([i, i >= index ? 1 : -1]);scrollTo(0, !!reducedMotion);}} aria-pressed={index===i} className={`group relative w-full overflow-hidden rounded-[1.5rem] border-2 p-3 text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_30px_rgba(7,60,80,.12)] ${index===i?"border-[#00799b]":"border-transparent"}`} style={{backgroundColor:index===i?backdrop:"#f7edda"}} data-testid={`button-select-product-${i}`}>
            <span aria-hidden="true" className="absolute left-1/2 top-[42%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8e6]/70 transition-transform duration-500 group-hover:scale-110"/>
            <span className="relative block aspect-square"><Image src={item.imageUrl} alt={item.name || `${categoryName} flavour`} fill sizes="(max-width: 640px) 46vw, 20vw" className="object-contain transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-hover:scale-105"/></span>
            <span className="relative mt-3 block px-2 pb-2 text-sm font-black leading-tight">{item.name || categoryName}</span>
          </button></StaggerItem>)}
        </Stagger>
      </section>}
      {total > 1 && <HomeSectionDivider from="#fff8e6" to="#00799b" />}
      <section className="relative overflow-hidden bg-[#00799b] py-16 text-center text-[#fff8e6] md:py-24">
        <Sprinkles count={10} seed={29} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-40" />
        <div className="king-shell relative"><Reveal as="p" className="king-label mb-5 text-[#ffbf31]">Keep exploring</Reveal><RevealTitle className="king-display text-[clamp(3.4rem,7vw,7rem)]" lines={["More to love."]} /><Reveal delay={0.2}><Magnetic><TransitionLink href="/products" className="king-pill mt-8" data-testid="link-back-products">See all ice creams <ArrowUpRight size={18}/></TransitionLink></Magnetic></Reveal></div>
      </section>
    </div>
  );
}
