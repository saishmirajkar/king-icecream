"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { categorySlug } from "@/lib/categories";

const categories = [
  { name:"Cones", image:"120 ml Cone_Tiramisu_Final (1).png", color:"#ffcf4f", note:"A classic for a reason.", number:"01" },
  { name:"Cups", image:"100 ml Premium cup Spaish Delight.png", color:"#f8bfd2", note:"Little cup. Big feelings.", number:"02" },
  { name:"Kulfi", image:"Matka Kulfi_Render.png", color:"#c1e5db", note:"A beloved tradition.", number:"03" },
  { name:"Sticks", image:"Chocobar 65ml_311224.png", color:"#ddd0ee", note:"Happiness, on a stick.", number:"04" },
  { name:"Family Packs", image:"700ml_Vanilla.png", color:"#ffd6b7", note:"More to go around.", number:"05" },
  { name:"Sundaes", image:"Royal Sundae_180 ml.png", color:"#c8e2ed", note:"A spoonful of wonderful.", number:"06" },
  { name:"Sip Ups", image:"Mango Sip Up_Mockup.png", color:"#f5dba2", note:"A sip of sunshine.", number:"07" },
];

export function ProductsStack() {
  return (
    <div className="overflow-hidden bg-[#fff8e6] pt-[72px] text-[#073c50] md:pt-[88px]">
      <section className="relative overflow-hidden bg-[#ffcf4f] py-12 md:py-20">
        <div className="king-shell relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div><p className="king-label king-reveal mb-6 text-[#00799b]">King Ice Cream / The collection</p><h1 className="king-display king-reveal text-[clamp(4.5rem,10vw,10rem)]">Find your<br/><span className="text-[#00799b]">happy.</span></h1><p className="king-reveal mt-7 max-w-[500px] text-lg font-semibold leading-relaxed">Cones, cups, kulfi and everything in between. Whatever your mood, there&apos;s a King for it.</p></div>
          <div className="relative mx-auto h-[300px] w-full max-w-[520px] sm:h-[410px] lg:h-[480px]">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8bfd2]"/>
            <div className="absolute inset-x-[12%] inset-y-[9%] -rotate-6">
              <Image src="/images/Product Images copy/100 ml Premium cup Spaish Delight.png" alt="King Ice Cream Spanish Delight cup" fill priority sizes="(max-width: 640px) 72vw, 395px" className="object-contain drop-shadow-xl"/>
            </div>
          </div>
        </div>
      </section>
      <HomeSectionDivider from="#ffcf4f" to="#fff8e6" />
      <div className="king-shell py-20 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="king-label mb-5 text-[#00799b]">Seven ways to say delicious</p><h2 className="king-display king-section-heading">The whole<br/>happy family.</h2></div><p className="max-w-xs text-lg font-semibold leading-snug">Explore the collection and find the one you&apos;ll come back for.</p></div>
        <div className="grid gap-5 md:grid-cols-12">
          {categories.map((cat,i)=><TransitionLink href={`/products/${categorySlug(cat.name)}`} key={cat.name} className={`king-category-card group ${i===0 || i===4 ? "md:col-span-7" : i===1 || i===3 || i===5 ? "md:col-span-5" : "md:col-span-6"}`} style={{backgroundColor:cat.color}} data-testid={`link-products-${categorySlug(cat.name)}`}>
            <span className="absolute left-7 top-7 z-10 king-label md:left-10 md:top-10">The collection / {cat.number}</span>
            <h3 className="king-display absolute left-7 top-[72px] z-10 max-w-[80%] text-[clamp(3.1rem,5.5vw,5.7rem)] md:left-10">{cat.name}</h3>
            <p className="absolute bottom-9 left-8 z-10 max-w-[135px] font-bold md:left-10">{cat.note}</p>
            <div className="absolute bottom-[14%] right-[2%] h-[59%] w-[59%] transition-transform duration-500 group-hover:rotate-3"><Image src={`/images/Product Images copy/${cat.image}`} alt={`King Ice Cream ${cat.name}`} fill sizes="(max-width: 768px) 54vw, 30vw" className="object-contain object-bottom drop-shadow-xl"/></div>
            <span className="absolute bottom-7 right-7 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#073c50] text-[#fff8e6] md:right-10"><ArrowUpRight size={21}/></span>
          </TransitionLink>)}
        </div>
      </div>
      <HomeSectionDivider from="#fff8e6" to="#00799b" />
      <section className="bg-[#00799b] py-16 text-center text-[#fff8e6] md:py-24"><div className="king-shell"><p className="king-label mb-6 text-[#ffbf31]">Made in Belagavi</p><h2 className="king-display mx-auto max-w-4xl text-[clamp(3.5rem,7vw,8rem)]">Goodness in<br/>every scoop.</h2><p className="mx-auto mt-6 max-w-lg text-lg">Pure milk. No palm oil. Just the kind of ice cream that makes ordinary moments feel special.</p><TransitionLink href="/aboutus" className="king-pill mt-8">Meet King <ArrowUpRight size={18}/></TransitionLink></div></section>
    </div>
  );
}