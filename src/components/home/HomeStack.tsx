"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Milk, Sparkles } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { HomeDiscoverSection } from "@/components/home/HomeDiscoverSection";
import { categorySlug } from "@/lib/categories";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CountUp, Parallax } from "@/components/motion/scroll";
import { Magnetic, PointerField, PointerLayer, Tilt } from "@/components/motion/interactive";
import { Marquee, SpinBadge, Sprinkles, SunRays } from "@/components/motion/decor";

const root = "/images/Product Images copy/";
const cities = ["Belagavi", "Hubballi", "Panaji", "Kolhapur", "Mangaluru", "Margao", "Dharwad", "Sangli", "Kasaragod", "Bengaluru"];

export function HomeStack() {
  return (
    <div className="king-home pt-[72px] md:pt-[88px]">
      <PointerField className="king-hero" aria-labelledby="home-heading">
        <Sprinkles count={16} seed={3} className="opacity-70" />
        <div className="king-shell king-hero-grid">
          <div className="relative z-10">
            <Reveal as="p" className="king-label mb-6 flex items-center gap-3 text-[#073c50]"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00799b] opacity-60"/><span className="relative h-2 w-2 rounded-full bg-[#00799b]"/></span> Straight from Belagavi, with love</Reveal>
            <RevealTitle as="h1" id="home-heading" className="king-display king-hero-title" lines={["Goodness", <span key="o" className="outline">looks</span>, "like this."]} gap={0.12} />
            <Reveal delay={0.45} className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-end">
              <p className="king-hero-copy">Made with pure milk. Made for that first-bite smile. Meet the ice creams that make every moment a little more King.</p>
              <Magnetic><TransitionLink href="/products" className="king-pill shrink-0" data-testid="link-home-explore">Explore flavours <ArrowUpRight size={19}/></TransitionLink></Magnetic>
            </Reveal>
          </div>
          <Reveal className="king-hero-visual" scale={0.9} y={0} delay={0.15}>
            <div aria-label="King Ice Cream Tiramisu cone" className="absolute inset-0">
              <PointerLayer depth={-12} className="absolute inset-0"><div className="king-hero-disc"/></PointerLayer>
              <SunRays className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 text-[#fff8e6]/45" />
              <PointerLayer depth={30} className="absolute inset-0">
                <div className="king-hero-product">
                  <Image src={`${root}120 ml Cone_Tiramisu_Final (1).png`} alt="King Ice Cream Tiramisu cone pack" fill priority sizes="(max-width: 900px) 90vw, 50vw" className="object-contain"/>
                </div>
              </PointerLayer>
              <PointerLayer depth={-26} className="absolute -left-[4%] bottom-[8%] h-[30%] w-[22%]">
                <div className="king-bob relative h-full w-full -rotate-12"><Image src={`${root}Chocobar 65ml_311224.png`} alt="" fill sizes="12vw" className="object-contain drop-shadow-xl"/></div>
              </PointerLayer>
              <PointerLayer depth={18} className="absolute right-[2%] top-[4%] h-[22%] w-[20%]">
                <div className="king-bob-slow relative h-full w-full rotate-12"><Image src={`${root}Mango Dolly_50ml_311224.png`} alt="" fill sizes="12vw" className="object-contain drop-shadow-xl"/></div>
              </PointerLayer>
              <SpinBadge text="100% pure milk • No palm oil • " className="king-hero-sticker !grid !text-[#fff8e6]">
                <span className="king-display text-[1.6rem] leading-none">100%</span>
              </SpinBadge>
            </div>
          </Reveal>
        </div>
        <a href="#discover" aria-label="Scroll to discover" className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-[#073c50] lg:block"><span className="king-bob block"><ArrowDown size={25}/></span></a>
      </PointerField>

      <HomeSectionDivider from="#ffcf4f" to="#00799b" />
      <div className="king-ticker" aria-label="Pure milk, no palm oil, made in Belagavi">
        <Marquee speed={2.4} trackClassName="king-ticker-track !animate-none !gap-0">
          <span className="flex items-center gap-12 pr-12">Pure milk <b>✦</b> Big smiles <b>✦</b> No palm oil <b>✦</b> Made in Belagavi <b>✦</b></span>
        </Marquee>
      </div>

      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <HomeDiscoverSection />

      <HomeSectionDivider from="#fff8e6" to="#00799b" />
      <section className="relative overflow-hidden bg-[#00799b] py-20 text-[#fff8e6] md:py-32">
        <Sprinkles count={12} seed={11} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-40" />
        <div className="king-shell relative z-10 grid items-center gap-12 md:grid-cols-2 md:gap-24">
          <Reveal scale={0.92} className="relative min-h-[430px] rounded-[45%_45%_35%_35%] bg-[#ffbf31] md:min-h-[650px]">
            <SunRays className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 text-[#fff8e6]/35" />
            <Parallax speed={40} rotate={4} className="absolute inset-[-5%]">
              <div className="relative h-full w-full rotate-[-10deg]"><Image src={`${root}700ml_Alphonso Mango.png`} alt="King Ice Cream Alphonso Mango family pack" fill sizes="(max-width: 768px) 90vw, 50vw" className="object-contain drop-shadow-2xl"/></div>
            </Parallax>
            <SpinBadge text="From Belagavi • With love • " className="absolute right-0 top-5 h-28 w-28 bg-[#f8bfd2] text-[#073c50] md:h-36 md:w-36">
              <Heart size={26} className="fill-[#073c50]" />
            </SpinBadge>
          </Reveal>
          <div>
            <Reveal as="p" className="king-label mb-7 text-[#ffbf31]">02 / The good in every scoop</Reveal>
            <RevealTitle className="king-display text-[clamp(3.7rem,6.8vw,8rem)]" lines={["The milk", "makes the", <span key="m" className="text-[#ffbf31]">magic.</span>]} />
            <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg leading-relaxed text-[#fff8e6]/85">We believe the best ice cream starts with the good stuff. Pure milk, a whole lot of care, and no palm oil. That&apos;s the King way.</p></Reveal>
            <Stagger className="mt-9 grid max-w-md grid-cols-2 gap-3" delay={0.2}>
              {[{ v: "2L+", l: "Litres of milk, daily" }, { v: "40K+", l: "Farmer families" }].map(s => (
                <StaggerItem key={s.l} className="rounded-[1.5rem] border border-[#fff8e6]/25 bg-[#fff8e6]/10 p-5 backdrop-blur-sm">
                  <CountUp value={s.v} className="king-display block text-[2.6rem] text-[#ffbf31]" />
                  <span className="mt-1 block text-sm font-bold text-[#fff8e6]/80">{s.l}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.3}><Magnetic><TransitionLink href="/aboutus" className="king-pill mt-9" data-testid="link-home-story">Get to know us <ArrowUpRight size={19}/></TransitionLink></Magnetic></Reveal>
          </div>
        </div>
      </section>

      <HomeSectionDivider from="#00799b" to="#f9bfd1" />
      <section className="relative overflow-hidden bg-[#f9bfd1] py-20 md:py-32">
        <div className="king-shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><Reveal as="p" className="king-label mb-5 text-[#00799b]">03 / A little more to love</Reveal><RevealTitle className="king-display king-section-heading" lines={["Pick your", "pleasure."]} /></div>
            <Reveal delay={0.2}><p className="max-w-sm text-lg font-semibold leading-snug">Some days call for chocolate. Some days call for mango. Every day calls for ice cream.</p></Reveal>
          </div>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3" gap={0.12}>
            {[
              {title:"A little indulgence",cat:"Sticks",image:"Belgian Chocolate_70ml_311224.png",bg:"#ffe5ac"},
              {title:"A sunny spoonful",cat:"Cups",image:"100 ml Premium cup Alphonso Mango.png",bg:"#cae6dc"},
              {title:"Something to share",cat:"Family Packs",image:"700ml_Strawberry.png",bg:"#e9d9f2"},
            ].map((item,i)=><StaggerItem key={item.title}><Tilt className="rounded-[2rem]">
              <TransitionLink href={`/products/${categorySlug(item.cat)}`} className="group relative block min-h-[440px] overflow-hidden rounded-[2rem] p-7 text-[#073c50] md:min-h-[510px]" style={{backgroundColor:item.bg}} data-testid={`link-featured-${i}`}>
                <span className="king-label">King favourites / 0{i+1}</span>
                <h3 className="king-display relative z-10 mt-4 max-w-[260px] text-[clamp(2.6rem,3.6vw,4.5rem)]">{item.title}</h3>
                <span aria-hidden="true" className="absolute left-1/2 top-[58%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8e6]/55 transition-transform duration-700 group-hover:scale-110"/>
                <div className="king-lift absolute inset-x-6 bottom-12 top-[36%]"><Image src={`${root}${item.image}`} alt={`King Ice Cream ${item.cat}`} fill sizes="(max-width: 768px) 90vw, 32vw" className="object-contain drop-shadow-xl"/></div>
                <span className="absolute bottom-7 left-7 z-10 king-label opacity-0 transition-all duration-500 group-hover:opacity-100">Shop {item.cat}</span>
                <span className="absolute bottom-7 right-7 grid h-12 w-12 place-items-center rounded-full bg-[#073c50] text-[#fff8e6] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"><ArrowUpRight size={20}/></span>
              </TransitionLink>
            </Tilt></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      <HomeSectionDivider from="#f9bfd1" to="#fff8e6" />
      <section className="bg-[#fff8e6] py-20 md:py-28">
        <div className="king-shell grid gap-12 md:grid-cols-2 md:items-center">
          <div><Reveal as="p" className="king-label mb-5 text-[#00799b]">04 / Our promise</Reveal><RevealTitle className="king-display king-section-heading" lines={["The joy is", <span key="r" className="text-[#00799b]">real.</span>]} /><Reveal delay={0.2}><p className="mt-7 max-w-md text-lg font-medium leading-relaxed text-[#073c50]/75">The best moments aren&apos;t complicated. Good company, a good scoop, and the kind of smile that stays with you.</p></Reveal></div>
          <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.1}>
            {[{icon:Milk,title:"Pure milk",text:"The good stuff goes in."},{icon:Heart,title:"Made with care",text:"For every little celebration."},{icon:Sparkles,title:"No palm oil",text:"Just the good, creamy kind."}].map((item,i)=><StaggerItem key={item.title} className={i===2?"sm:col-span-2":""}>
              <div className={`group relative h-full overflow-hidden rounded-[2rem] p-7 transition-transform duration-500 hover:-translate-y-1.5 ${i===2?"bg-[#ffbf31]":"bg-[#c6e5e2]"}`}>
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#fff8e6]/40 transition-transform duration-700 group-hover:scale-[2.4]"/>
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#073c50] text-[#fff8e6] transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110"><item.icon size={26} strokeWidth={1.9}/></span>
                <h3 className="king-display relative mt-8 text-3xl">{item.title}</h3><p className="relative mt-2 font-medium">{item.text}</p>
              </div>
            </StaggerItem>)}
          </Stagger>
        </div>
      </section>

      <HomeSectionDivider from="#fff8e6" to="#ffcf4f" />
      <section className="relative overflow-hidden bg-[#ffcf4f] pb-10 pt-20 md:pt-28">
        <Sprinkles count={10} seed={42} className="opacity-60" />
        <div className="king-shell relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div><Reveal as="p" className="king-label mb-6 text-[#00799b]">05 / The good stuff is close</Reveal><RevealTitle className="king-display text-[clamp(3.8rem,8vw,9rem)] text-[#073c50]" lines={["See you", "around."]} /><Reveal delay={0.2}><p className="mt-6 max-w-lg text-lg font-semibold">Find King Ice Cream near you and make today a little sweeter.</p></Reveal></div>
          <Reveal delay={0.25}><Magnetic><TransitionLink href="/locate" className="king-pill king-pill--teal" data-testid="link-home-locate">Find a parlour <ArrowRight size={20}/></TransitionLink></Magnetic></Reveal>
        </div>
        <Marquee speed={1.6} className="mt-16 border-y-2 border-[#073c50]/15 py-5 md:mt-24">
          {cities.map(c => <span key={c} className="flex items-center gap-8 pr-8 text-[clamp(1.6rem,3vw,2.6rem)] font-black uppercase tracking-[-.03em] text-[#073c50]">{c}<span className="text-[#00799b]">✦</span></span>)}
        </Marquee>
      </section>
    </div>
  );
}
