"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CoverageMap, regions } from "./CoverageMap";
import { Reveal, RevealTitle } from "@/components/motion/reveal";

/** Region tabs beside the coverage map: choosing a state lights up its pins and lists its cities. */
export function CoverageExplorer() {
  const [active, setActive] = useState(regions[0].state);
  const reduced = useReducedMotionSafe();
  const region = regions.find(r => r.state === active) ?? regions[0];

  return (
    <div className="king-shell grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
      <Reveal scale={0.94} className="relative overflow-hidden rounded-[2rem] bg-[#00799b] p-4 shadow-[0_30px_60px_rgba(7,60,80,.25)] md:p-6">
        <CoverageMap active={active} className="mx-auto block h-auto max-h-[78svh] w-full" />
        <a href="https://www.google.com/maps/search/King+Ice+Cream+Belagavi" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#fff8e6] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#073c50] transition-transform hover:-translate-y-0.5 md:bottom-6 md:right-6">
          Open in Google Maps <ArrowUpRight size={14} />
        </a>
      </Reveal>
      <div>
        <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Coverage</Reveal>
        <RevealTitle className="king-section-title" lines={["Available across", <em key="f">four states.</em>]} />
        <div role="tablist" aria-label="Choose a state" className="mt-9 flex flex-wrap gap-2">
          {regions.map(r => {
            const on = r.state === active;
            return (
              <button key={r.state} type="button" role="tab" aria-selected={on} onClick={() => setActive(r.state)} className={`relative rounded-full px-5 py-3 text-sm font-black uppercase tracking-wider transition-colors ${on ? "text-[#fff8e6]" : "text-[#073c50] hover:bg-[#073c50]/5"}`} data-testid={`tab-region-${r.state.toLowerCase()}`}>
                {on && <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-[#00799b]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{r.state} <span className="opacity-60">· {r.cities.length}</span></span>
              </button>
            );
          })}
        </div>
        <div role="tabpanel" aria-label={`${region.state} cities`} className="mt-6 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div key={region.state} className="grid grid-cols-2 gap-3 sm:grid-cols-3" initial="hidden" animate="show" exit="exit" variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.05 } }, exit: { opacity: 0, transition: { duration: 0.15 } } }}>
              {region.cities.map(city => (
                <motion.div key={city.name} variants={{ hidden: { opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }} className="group rounded-[1.25rem] bg-[#c9e4ef] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffcf4f] md:p-6">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <MapPin className="h-6 w-6 text-[#00799b] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    {city.flagship && <span className="rounded-full bg-[#073c50] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[#ffbf31]">Flagship</span>}
                  </div>
                  <span className="block text-base font-black leading-tight">{city.name}</span>
                  <span className="mt-1 block text-sm text-[#073c50]/75">{city.outlets} outlets</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
