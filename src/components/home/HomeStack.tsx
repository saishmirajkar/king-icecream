"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Milk, Sparkles, Sun } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { HomeDiscoverSection } from "@/components/home/HomeDiscoverSection";
import { categorySlug } from "@/lib/categories";

const root = "/images/Product Images copy/";

export function HomeStack() {
  return (
    <div className="king-home pt-[72px] md:pt-[88px]">
      <section className="king-hero" aria-labelledby="home-heading">
        <div className="king-shell king-hero-grid">
          <div className="relative z-10">
            <p className="king-label king-reveal mb-6 flex items-center gap-3 text-[#073c50]"><span className="h-2 w-2 rounded-full bg-[#00799b]"/> Straight from Belagavi, with love</p>
            <h1 id="home-heading" className="king-display king-hero-title king-reveal"><span>Goodness</span><span className="outline">looks</span><span>like this.</span></h1>
            <div className="king-reveal mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end">
              <p className="king-hero-copy">Made with pure milk. Made for that first-bite smile. Meet the ice creams that make every moment a little more King.</p>
              <TransitionLink href="/products" className="king-pill shrink-0" data-testid="link-home-explore">Explore flavours <ArrowUpRight size={19}/></TransitionLink>
            </div>
          </div>
          <div className="king-hero-visual king-reveal" aria-label="King Ice Cream Tiramisu cone">
            <div className="king-hero-disc"/>
            <Sun className="king-sunburst" aria-hidden="true" strokeWidth={1.3}/>
            <div className="king-hero-product">
              <Image src={`${root}120 ml Cone_Tiramisu_Final (1).png`} alt="King Ice Cream Tiramisu cone pack" fill priority sizes="(max-width: 900px) 90vw, 50vw" className="object-contain"/>
            </div>
            <div className="king-hero-sticker">100%<br/>PURE<br/>MILK</div>
          </div>
        </div>
        <a href="#discover" aria-label="Scroll to discover" className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-[#073c50] transition-transform hover:translate-y-1 lg:block"><ArrowDown size={25}/></a>
      </section>

      <HomeSectionDivider from="#ffcf4f" to="#00799b" />
      <div className="king-ticker" aria-label="Pure milk, no palm oil, made in Belagavi">
        <div className="king-ticker-track" aria-hidden="true">{Array.from({length:4},(_,i)=><span key={i} className="flex items-center gap-12">Pure milk <b>•</b> Big smiles <b>•</b> No palm oil <b>•</b> Made in Belagavi <b>•</b></span>)}</div>
      </div>

      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <HomeDiscoverSection />

      <HomeSectionDivider from="#fff8e6" to="#00799b" />
      <section className="relative overflow-hidden bg-[#00799b] py-20 text-[#fff8e6] md:py-32">
        <div className="king-shell relative z-10 grid items-center gap-12 md:grid-cols-2 md:gap-24">
          <div className="relative min-h-[430px] rounded-[45%_45%_35%_35%] bg-[#ffbf31] md:min-h-[650px]">
            <div className="absolute inset-[-5%] rotate-[-10deg]"><Image src={`${root}700ml_Alphonso Mango.png`} alt="King Ice Cream Alphonso Mango family pack" fill sizes="(max-width: 768px) 90vw, 50vw" className="object-contain drop-shadow-2xl"/></div>
            <span className="absolute right-0 top-5 grid h-28 w-28 rotate-12 place-content-center rounded-full bg-[#f8bfd2] text-center text-sm font-black uppercase leading-tight text-[#073c50] md:h-36 md:w-36 md:text-base">From<br/>Belagavi<br/>with love</span>
          </div>
          <div><p className="king-label mb-7 text-[#ffbf31]">02 / The good in every scoop</p><h2 className="king-display text-[clamp(3.7rem,6.8vw,8rem)]">The milk<br/>makes the<br/><span className="text-[#ffbf31]">magic.</span></h2><p className="mt-8 max-w-md text-lg leading-relaxed text-[#fff8e6]/85">We believe the best ice cream starts with the good stuff. Pure milk, a whole lot of care, and no palm oil. That&apos;s the King way.</p><TransitionLink href="/aboutus" className="king-pill mt-9" data-testid="link-home-story">Get to know us <ArrowUpRight size={19}/></TransitionLink></div>
        </div>
      </section>

      <HomeSectionDivider from="#00799b" to="#f9bfd1" />
      <section className="bg-[#f9bfd1] py-20 md:py-32">
        <div className="king-shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="king-label mb-5 text-[#00799b]">03 / A little more to love</p><h2 className="king-display king-section-heading">Pick your<br/>pleasure.</h2></div><p className="max-w-sm text-lg font-semibold leading-snug">Some days call for chocolate. Some days call for mango. Every day calls for ice cream.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {title:"A little indulgence",cat:"Sticks",image:"Belgian Chocolate_70ml_311224.png",bg:"#ffe5ac"},
              {title:"A sunny spoonful",cat:"Cups",image:"100 ml Premium cup Alphonso Mango.png",bg:"#cae6dc"},
              {title:"Something to share",cat:"Family Packs",image:"700ml_Strawberry.png",bg:"#e9d9f2"},
            ].map((item,i)=><TransitionLink href={`/products/${categorySlug(item.cat)}`} key={item.title} className="group relative block min-h-[440px] overflow-hidden rounded-[2rem] p-7 text-[#073c50] md:min-h-[510px]" style={{backgroundColor:item.bg}} data-testid={`link-featured-${i}`}>
              <span className="king-label">King favourites / 0{i+1}</span><h3 className="king-display relative z-10 mt-4 max-w-[260px] text-[clamp(2.6rem,3.6vw,4.5rem)]">{item.title}</h3><div className="absolute inset-x-6 bottom-12 top-[36%] transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-3"><Image src={`${root}${item.image}`} alt={`King Ice Cream ${item.cat}`} fill sizes="(max-width: 768px) 90vw, 32vw" className="object-contain drop-shadow-xl"/></div><span className="absolute bottom-7 right-7 grid h-12 w-12 place-items-center rounded-full bg-[#073c50] text-[#fff8e6]"><ArrowUpRight size={20}/></span>
            </TransitionLink>)}
          </div>
        </div>
      </section>

      <HomeSectionDivider from="#f9bfd1" to="#fff8e6" />
      <section className="bg-[#fff8e6] py-20 md:py-28">
        <div className="king-shell grid gap-12 md:grid-cols-2 md:items-center">
          <div><p className="king-label mb-5 text-[#00799b]">04 / Our promise</p><h2 className="king-display king-section-heading">The joy is<br/><span className="text-[#00799b]">real.</span></h2><p className="mt-7 max-w-md text-lg font-medium leading-relaxed text-[#073c50]/75">The best moments aren&apos;t complicated. Good company, a good scoop, and the kind of smile that stays with you.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{icon:Milk,title:"Pure milk",text:"The good stuff goes in."},{icon:Heart,title:"Made with care",text:"For every little celebration."},{icon:Sparkles,title:"No palm oil",text:"Just the good, creamy kind."}].map((item,i)=><div key={item.title} className={`rounded-[2rem] p-7 ${i===2?"bg-[#ffbf31] sm:col-span-2":"bg-[#c6e5e2]"}`}><item.icon size={35} strokeWidth={1.7}/><h3 className="king-display mt-8 text-3xl">{item.title}</h3><p className="mt-2 font-medium">{item.text}</p></div>)}
          </div>
        </div>
      </section>

      <HomeSectionDivider from="#fff8e6" to="#ffcf4f" />
      <section className="bg-[#ffcf4f] py-20 md:py-28">
        <div className="king-shell flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"><div><p className="king-label mb-6 text-[#00799b]">05 / The good stuff is close</p><h2 className="king-display text-[clamp(3.8rem,8vw,9rem)] text-[#073c50]">See you<br/>around.</h2><p className="mt-6 max-w-lg text-lg font-semibold">Find King Ice Cream near you and make today a little sweeter.</p></div><TransitionLink href="/locate" className="king-pill !bg-[#00799b] !text-[#fff8e6]" data-testid="link-home-locate">Find a parlour <ArrowRight size={20}/></TransitionLink></div>
      </section>
    </div>
  );
}