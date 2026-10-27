"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { categorySlug } from "@/lib/categories";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Magnetic, PointerField, PointerLayer, Tilt } from "@/components/motion/interactive";
import { Marquee, SpinBadge, Sprinkles, SunRays } from "@/components/motion/decor";

const root = "/images/Product Images copy/";
const categories = [
  { name:"Cones", image:"120 ml Cone_Tiramisu_Final (1).png", color:"#ffcf4f", note:"A classic for a reason.", number:"01" },
  { name:"Cups", image:"100 ml Premium cup Spaish Delight.png", color:"#f8bfd2", note:"Little cup. Big feelings.", number:"02" },
  { name:"Kulfi", image:"Matka Kulfi_Render.png", color:"#c1e5db", note:"A beloved tradition.", number:"03" },
  { name:"Sticks", image:"Chocobar 65ml_311224.png", color:"#ddd0ee", note:"Happiness, on a stick.", number:"04" },
  { name:"Family Packs", image:"700ml_Vanilla.png", color:"#ffd6b7", note:"More to go around.", number:"05" },
  { name:"Sundaes", image:"Royal Sundae_180 ml.png", color:"#c8e2ed", note:"A spoonful of wonderful.", number:"06" },
  { name:"Sip Ups", image:"Mango Sip Up_Mockup.png", color:"#f5dba2", note:"A sip of sunshine.", number:"07" },
];

// Two cards per row, alternating wide and narrow, with the last one as a full-width banner.
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-7", "md:col-span-5", "md:col-span-12"];

export function ProductsStack() {
  return (
    <div className="overflow-hidden bg-[#fff8e6] pt-[72px] text-[#073c50] md:pt-[88px]">
      <PointerField className="relative overflow-hidden bg-[#ffcf4f] py-12 md:py-20">
        <Sprinkles count={16} seed={5} className="opacity-70" />
        <div className="king-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Reveal as="p" className="king-label mb-6 text-[#00799b]">King Ice Cream / The collection</Reveal>
            <RevealTitle as="h1" className="king-display text-[clamp(4.5rem,10vw,10rem)]" lines={["Find your", <span key="h" className="text-[#00799b]">happy.</span>]} gap={0.12} />
            <Reveal delay={0.35}><p className="mt-7 max-w-[500px] text-lg font-semibold leading-relaxed">Cones, cups, kulfi and everything in between. Whatever your mood, there&apos;s a King for it.</p></Reveal>
            <Reveal delay={0.45} className="mt-8 flex flex-wrap gap-2">
              {categories.map(c => <TransitionLink key={c.name} href={`/products/${categorySlug(c.name)}`} className="rounded-full border-2 border-[#073c50]/15 bg-[#fff8e6]/60 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:border-[#073c50] hover:bg-[#073c50] hover:text-[#fff8e6]">{c.name}</TransitionLink>)}
            </Reveal>
          </div>
          <Reveal scale={0.88} y={0} delay={0.1} className="relative mx-auto h-[320px] w-full max-w-[540px] sm:h-[430px] lg:h-[520px]">
            <PointerLayer depth={-10} className="absolute inset-0"><div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8bfd2]"/></PointerLayer>
            <SunRays className="absolute left-1/2 top-1/2 aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2 text-[#fff8e6]/50" />
            <PointerLayer depth={26} className="absolute inset-x-[12%] inset-y-[9%]">
              <div className="king-bob relative h-full w-full -rotate-6">
                <Image src={`${root}100 ml Premium cup Spaish Delight.png`} alt="King Ice Cream Spanish Delight cup" fill priority sizes="(max-width: 640px) 72vw, 395px" className="object-contain drop-shadow-xl"/>
              </div>
            </PointerLayer>
            <PointerLayer depth={-30} className="absolute bottom-[2%] left-[-2%] h-[38%] w-[20%]">
              <div className="king-bob-slow relative h-full w-full -rotate-[18deg]"><Image src={`${root}Mango_70ml Cone.png`} alt="" fill sizes="110px" className="object-contain drop-shadow-xl"/></div>
            </PointerLayer>
            <PointerLayer depth={20} className="absolute right-[-2%] top-[4%] h-[34%] w-[20%]">
              <div className="king-bob relative h-full w-full rotate-[16deg]" style={{ animationDelay: "-2s" }}><Image src={`${root}Triple Crown_65ml_Render.png`} alt="" fill sizes="110px" className="object-contain drop-shadow-xl"/></div>
            </PointerLayer>
            <SpinBadge text="Seven ways • To say delicious • " className="absolute bottom-[4%] right-[2%] h-28 w-28 bg-[#00799b] text-[#fff8e6] shadow-[6px_8px_0_rgba(7,60,80,.15)] md:h-32 md:w-32">
              <span className="king-display text-3xl leading-none">07</span>
            </SpinBadge>
          </Reveal>
        </div>
      </PointerField>
      <HomeSectionDivider from="#ffcf4f" to="#fff8e6" />
      <div className="king-shell py-20 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><Reveal as="p" className="king-label mb-5 text-[#00799b]">Seven ways to say delicious</Reveal><RevealTitle className="king-display king-section-heading" lines={["The whole", "happy family."]} /></div>
          <Reveal delay={0.2}><p className="max-w-xs text-lg font-semibold leading-snug">Explore the collection and find the one you&apos;ll come back for.</p></Reveal>
        </div>
        <Stagger className="grid gap-5 md:grid-cols-12" gap={0.08}>
          {categories.map((cat,i)=><StaggerItem key={cat.name} className={spans[i]}>
            <Tilt className="rounded-[35px]" max={5}>
              <TransitionLink href={`/products/${categorySlug(cat.name)}`} className="king-category-card group" style={{backgroundColor:cat.color}} data-testid={`link-products-${categorySlug(cat.name)}`}>
                <span className="absolute left-7 top-7 z-10 king-label md:left-10 md:top-10">The collection / {cat.number}</span>
                <h3 className="king-display absolute left-7 top-[72px] z-10 max-w-[80%] text-[clamp(3.1rem,5.5vw,5.7rem)] md:left-10">{cat.name}</h3>
                <p className="absolute bottom-9 left-8 z-10 max-w-[135px] font-bold md:left-10">{cat.note}</p>
                <span aria-hidden="true" className={`absolute aspect-square rounded-full bg-[#fff8e6]/45 transition-transform duration-700 group-hover:scale-110 ${i === 6 ? "bottom-[10%] right-[8%] w-[50%] max-w-[360px] md:w-[26%]" : "bottom-[10%] right-[4%] w-[50%] max-w-[340px]"}`}/>
                <div className={`king-lift absolute ${i === 6 ? "bottom-[8%] right-[2%] h-[62%] w-[59%] md:right-[8%] md:h-[80%] md:w-[26%]" : "bottom-[14%] right-[2%] h-[59%] w-[59%]"}`}><Image src={`${root}${cat.image}`} alt={`King Ice Cream ${cat.name}`} fill sizes="(max-width: 768px) 54vw, 30vw" className="object-contain object-bottom drop-shadow-xl"/></div>
                <span className="absolute bottom-7 right-7 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#073c50] text-[#fff8e6] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110 md:right-10"><ArrowUpRight size={21}/></span>
              </TransitionLink>
            </Tilt>
          </StaggerItem>)}
        </Stagger>
      </div>
      <HomeSectionDivider from="#fff8e6" to="#00799b" />
      <section className="relative overflow-hidden bg-[#00799b] pt-16 text-center text-[#fff8e6] md:pt-24">
        <Sprinkles count={12} seed={17} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-40" />
        <div className="king-shell relative">
          <Reveal as="p" className="king-label mb-6 text-[#ffbf31]">Made in Belagavi</Reveal>
          <RevealTitle className="king-display mx-auto max-w-4xl text-[clamp(3.5rem,7vw,8rem)]" lines={["Goodness in", "every scoop."]} />
          <Reveal delay={0.2}><p className="mx-auto mt-6 max-w-lg text-lg">Pure milk. No palm oil. Just the kind of ice cream that makes ordinary moments feel special.</p></Reveal>
          <Reveal delay={0.3}><Magnetic><TransitionLink href="/aboutus" className="king-pill mt-8">Meet King <ArrowUpRight size={18}/></TransitionLink></Magnetic></Reveal>
        </div>
        <Marquee speed={1.8} className="mt-16 border-t-2 border-[#fff8e6]/15 py-5 md:mt-24">
          {["Pure milk", "No palm oil", "15,000+ outlets", "Made in Belagavi", "Since 2004"].map(t => <span key={t} className="flex items-center gap-8 pr-8 text-[clamp(1.4rem,2.6vw,2.3rem)] font-black uppercase tracking-[-.03em]">{t}<span className="text-[#ffbf31]">✦</span></span>)}
        </Marquee>
      </section>
    </div>
  );
}
