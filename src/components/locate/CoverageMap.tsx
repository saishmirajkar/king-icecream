"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

export type City = { name: string; outlets: string; lat: number; lon: number; flagship?: boolean };
export type Region = { state: string; cities: City[] };

export const HQ = { name: "Belagavi", lat: 15.85, lon: 74.5 };

export const regions: Region[] = [
  {
    state: "Karnataka",
    cities: [
      { name: "Belagavi", outlets: "200+", lat: 15.85, lon: 74.5, flagship: true },
      { name: "Hubli-Dharwad", outlets: "150+", lat: 15.36, lon: 75.12, flagship: true },
      { name: "Mangaluru", outlets: "80+", lat: 12.91, lon: 74.86 },
      { name: "Bengaluru", outlets: "50+", lat: 12.97, lon: 77.59 },
      { name: "Davangere", outlets: "40+", lat: 14.46, lon: 75.92 },
      { name: "Bagalkot", outlets: "35+", lat: 16.18, lon: 75.7 },
      { name: "Gadag", outlets: "30+", lat: 15.43, lon: 75.63 },
      { name: "Haveri", outlets: "25+", lat: 14.79, lon: 75.4 },
    ],
  },
  {
    state: "Goa",
    cities: [
      { name: "Panaji", outlets: "40+", lat: 15.49, lon: 73.83 },
      { name: "Margao", outlets: "35+", lat: 15.27, lon: 73.96 },
      { name: "Vasco", outlets: "20+", lat: 15.4, lon: 73.81 },
    ],
  },
  {
    state: "Maharashtra",
    cities: [
      { name: "Kolhapur", outlets: "60+", lat: 16.7, lon: 74.24 },
      { name: "Sangli", outlets: "30+", lat: 16.85, lon: 74.58 },
      { name: "Pune", outlets: "20+", lat: 18.52, lon: 73.86 },
    ],
  },
  {
    state: "Kerala",
    cities: [
      { name: "Kasaragod", outlets: "25+", lat: 12.5, lon: 74.99 },
      { name: "Kannur", outlets: "15+", lat: 11.87, lon: 75.37 },
    ],
  },
];

// Equirectangular projection over the region King serves, corrected for latitude.
const LON0 = 72.6, LON1 = 78.4, LAT0 = 19.2, LAT1 = 11.3;
const W = 600;
const H = Math.round((W * (LAT0 - LAT1)) / ((LON1 - LON0) * Math.cos((15 * Math.PI) / 180)));
const project = (lat: number, lon: number) => ({ x: ((lon - LON0) / (LON1 - LON0)) * W, y: ((LAT0 - lat) / (LAT0 - LAT1)) * H });

// A simplified Konkan and Malabar coastline, north to south.
const coast = [
  [19.2, 72.82], [18.6, 72.9], [18.0, 73.05], [17.4, 73.2], [16.9, 73.3], [16.4, 73.35], [16.0, 73.48], [15.7, 73.68],
  [15.45, 73.8], [15.2, 73.93], [14.8, 74.1], [14.4, 74.38], [14.0, 74.5], [13.5, 74.68], [13.0, 74.8], [12.6, 74.9],
  [12.2, 75.1], [11.8, 75.4], [11.3, 75.75],
].map(([lat, lon]) => project(lat, lon));
const coastPath = coast.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

const stateLabels = [
  { name: "Maharashtra", lat: 17.9, lon: 75.6 },
  { name: "Goa", lat: 15.05, lon: 73.45 },
  { name: "Karnataka", lat: 13.9, lon: 76.6 },
  { name: "Kerala", lat: 11.62, lon: 76.0 },
];

const major = new Set(["Belagavi", "Hubli-Dharwad", "Panaji", "Kolhapur", "Pune", "Mangaluru", "Bengaluru", "Kannur", "Davangere"]);

/**
 * An illustrated map of the four states King serves, with distribution routes
 * drawn from Belagavi to every city. `active` highlights one state's pins.
 */
export function CoverageMap({ active, className, showRoutes = true }: { active?: string | null; className?: string; showRoutes?: boolean }) {
  const reduced = useReducedMotionSafe();
  const hq = project(HQ.lat, HQ.lon);
  const all = regions.flatMap(r => r.cities.map(c => ({ ...c, state: r.state })));

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="Map of King Ice Cream coverage across Karnataka, Goa, Maharashtra and Kerala"
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <defs>
        <pattern id="king-map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.1" fill="#fff8e6" fillOpacity=".28" />
        </pattern>
        <pattern id="king-map-waves" width="40" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8 Q10 2 20 8 T40 8" fill="none" stroke="#fff8e6" strokeOpacity=".14" strokeWidth="2" />
        </pattern>
      </defs>
      {/* Sea and land */}
      <path d={`M0 0 L${coast[0].x} 0 ${coastPath.replace("M", "L")} L${coast[coast.length - 1].x} ${H} L0 ${H} Z`} fill="url(#king-map-waves)" />
      <path d={`${coastPath} L${coast[coast.length - 1].x} ${H} L${W} ${H} L${W} 0 L${coast[0].x} 0 Z`} fill="url(#king-map-dots)" />
      <motion.path d={coastPath} fill="none" stroke="#ffbf31" strokeWidth="3" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1] } } }} />
      <text x={project(16.6, 72.95).x} y={project(16.6, 72.95).y} fill="#fff8e6" fillOpacity=".35" fontSize="15" fontWeight="800" letterSpacing="4" transform={`rotate(-78 ${project(16.6, 72.95).x} ${project(16.6, 72.95).y})`} style={{ fontFamily: "var(--font-nohemi)" }}>ARABIAN SEA</text>

      {stateLabels.map(s => {
        const p = project(s.lat, s.lon);
        const on = active === s.name;
        return <text key={s.name} x={p.x} y={p.y} textAnchor="middle" fontSize={on ? 26 : 22} fontWeight="900" fill={on ? "#ffbf31" : "#fff8e6"} fillOpacity={on ? 1 : 0.22} style={{ fontFamily: "var(--font-nohemi)", letterSpacing: "-0.02em", transition: "all .4s ease" }}>{s.name}</text>;
      })}

      {/* Routes from HQ */}
      {showRoutes && all.filter(c => c.name !== HQ.name).map((c, i) => {
        const p = project(c.lat, c.lon);
        const mx = (hq.x + p.x) / 2 + (p.y - hq.y) * 0.18;
        const my = (hq.y + p.y) / 2 - (p.x - hq.x) * 0.18;
        const on = !active || active === c.state;
        return (
          <motion.path
            key={c.name}
            d={`M${hq.x} ${hq.y} Q${mx} ${my} ${p.x} ${p.y}`}
            fill="none"
            stroke="#ffbf31"
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ opacity: on ? 0.75 : 0.12, transition: "opacity .4s ease" }}
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.1, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] } } }}
          />
        );
      })}

      {/* City pins */}
      {all.map((c, i) => {
        const p = project(c.lat, c.lon);
        const isHQ = c.name === HQ.name;
        const on = !active || active === c.state;
        const labelLeft = c.lon < 74.1;
        return (
          <motion.g key={c.name} variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 16, delay: 0.9 + i * 0.06 } } }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <g style={{ opacity: on ? 1 : 0.3, transition: "opacity .4s ease" }}>
              {on && !isHQ && <circle cx={p.x} cy={p.y} r="7" fill="#ffbf31" className="king-map-ping" />}
              {isHQ ? (
                <>
                  <circle cx={p.x} cy={p.y} r="22" fill="#ffbf31" className="king-map-ping" />
                  <circle cx={p.x} cy={p.y} r="16" fill="#ffbf31" stroke="#073c50" strokeWidth="3" />
                  <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize="17" fill="#073c50">♛</text>
                </>
              ) : (
                <circle cx={p.x} cy={p.y} r={c.flagship ? 8 : 6} fill={active === c.state ? "#ffbf31" : "#fff8e6"} stroke="#073c50" strokeWidth="2.5" />
              )}
              {(major.has(c.name) || active === c.state) && (
                <text x={isHQ ? p.x + 26 : labelLeft ? p.x - 13 : p.x + 13} y={p.y + 5} textAnchor={labelLeft && !isHQ ? "end" : "start"} fontSize={isHQ ? 17 : 13} fontWeight="800" fill="#fff8e6" style={{ fontFamily: "var(--font-nohemi)", paintOrder: "stroke", stroke: "#00799b", strokeWidth: 5 }}>
                  {isHQ ? "Belagavi · HQ" : c.name}
                </text>
              )}
            </g>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
