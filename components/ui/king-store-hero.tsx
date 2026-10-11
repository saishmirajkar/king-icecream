"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, MapPin } from "lucide-react"

// ─────────────────────────────────────────────────────────────
// KING ICE CREAM — scroll-locked "store doors opening" hero
//
// Same interaction model as the reference MetroHero (scroll-locked
// scrub), but instead of seeking a video, scroll input drives the
// King Ice Cream storefront artwork:
//
//   0.00 – 0.45  camera eases toward the store, the glass doors swing in
//                and the King logo lights up on the wall inside
//   0.28 – 0.90  camera glides through the doorway at an even pace and
//                settles on the store's own back wall: real King products
//                on its shelves and counter, logo centred on the teal arch
//   0.72 – 1.00  the room softly drops out of focus behind the products;
//                headline + CTAs fade in
//
// The storefront is alive before anyone scrolls: a small WebGL shader
// sways the flowers and trees and ripples the sea (driven by a wind
// mask), petals drift down and the lanterns flicker. Without WebGL the
// same artwork shows as a still image.
//
// While the hero is at the top of the viewport the page is locked and
// wheel / touch / keyboard input only scrubs the animation (forward and
// backward). Once the reveal is finished and the user keeps scrolling
// down, the page unlocks and continues normally; scrolling back up to
// the top re-locks it and plays the scene in reverse.
// ─────────────────────────────────────────────────────────────

export interface KingHeroProducts {
  /** Front and centre on the counter inside the store (a tub works best). */
  hero: string
  /** Bars standing either side of it. */
  heroLeft: string
  heroRight: string
  /** Tubs (left arch shelves) and bars (right arch shelves). */
  tubs: string[]
  bars: string[]
}

export interface KingStoreAssets {
  /** Storefront artwork with the door leaves painted out (2000 × 1116). */
  storefront: string
  /** The two door leaves, cut out at their exact place in the artwork. */
  doorLeft: string
  doorRight: string
  /** Wind mask (half size): red = foliage that sways, green = sea that ripples. */
  windMask: string
  /** King logo, centred on the teal arch on the back wall inside the store. */
  logo: string
}

export interface KingStoreHeroProps {
  /** Intro title shown in front of the store (fades out on scroll). */
  title?: string
  /** Label above the animated arrow at the bottom. */
  scrollHint?: string
  /** Gold lettering on the teal fascia, left and right of the sign. `false` hides it. */
  tagline?: [string, string] | false
  /** Final reveal copy, shown once you are inside the store. */
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: { label: string; href: string } | false
  secondaryCta?: { label: string; href: string } | false
  /** Product photos (transparent PNG/WebP) placed on the shelves inside the store. */
  products?: Partial<KingHeroProducts>
  /** Storefront artwork layers. */
  assets?: Partial<KingStoreAssets>
  /** Total input distance (px) needed to scrub the full scene. */
  scrubDistance?: number
  /** Show a small "Skip intro" button while the intro is playing. */
  showSkip?: boolean
  className?: string
  style?: React.CSSProperties
}

export const DEFAULT_PRODUCTS: KingHeroProducts = {
  hero: "/products/tub-chocolate-hazelnut.webp",
  heroLeft: "/products/bar-majesto-belgian-chocolate.webp",
  heroRight: "/products/bar-triple-crown-coffee.webp",
  tubs: [
    "/products/tub-tender-coconut.webp",
    "/products/tub-jack-fruit.webp",
    "/products/tub-chocolate-brownie.webp",
    "/products/tub-chocolate-hazelnut.webp",
  ],
  bars: [
    "/products/bar-majesto-french-vanilla.webp",
    "/products/bar-majesto-belgian-chocolate.webp",
    "/products/bar-triple-crown-coffee.webp",
  ],
}

export const DEFAULT_ASSETS: KingStoreAssets = {
  storefront: "/store/storefront.webp",
  doorLeft: "/store/door-left.webp",
  doorRight: "/store/door-right.webp",
  windMask: "/store/wind-mask.png",
  logo: "/brand/king-logo.png",
}

// Natural aspect ratios (width / height) of the product cut-outs
const TUB_RATIO = 0.87
const BAR_RATIO = 0.42

// Brand palette
const TEAL_DEEP = "#00465e"
const YELLOW = "#fab001"
const CREAM = "#fff6e3"
const SKY = "#64b9fb"
const STONE = "#ece2d4"

const SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif"
const SANS = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const GOLD_CSS = "linear-gradient(180deg, #fff1b8 0%, #f9c846 28%, #d99a0b 55%, #f7cf5a 78%, #b97a00 100%)"
const GOLD_CSS_H = "linear-gradient(90deg, #b97a00 0%, #f7cf5a 22%, #fff1b8 45%, #d99a0b 70%, #f9c846 100%)"

// Storefront artwork, in its own pixel units (2000 × 1116).
const STAGE_W = 2000
const STAGE_H = 1116
const DOOR = { x: 803, y: 345, w: 394, h: 608 } // the doorway the camera flies through
const LEAVES = { x: 800, y: 342, w: 400, h: 614 } // bounding box of both door leaves
const LEAF = { w: 204, leftHinge: 3.5, rightHinge: 201, glass: { x: 18, y: 17, w: 166, h: 573 } }
// Inside the store (artwork units). The camera comes to rest centred on VIEW.
const VIEW = { x: 1000, y: 560 }
const VIEW_W = 620 // artwork width visible at rest on wide screens
const VIEW_H = 560 // artwork height visible at rest on tall screens
const SHELF_ROWS = [535, 583, 631] // tops of the three gold shelves in each side arch
const LEFT_SHELF_X = [826, 866] // tub positions (left arch, right of the door post)
const RIGHT_SHELF_X = [1122, 1143, 1164, 1185] // bar positions (right arch, left of the door post)
const COUNTER_Y = 689 // marble counter top under the teal arch
const WALL_LOGO = { x: 1001, y: 492, w: 100 } // centred on the teal arch
const LOGO_RATIO = 375 / 578
const LANTERNS = [
  { x: 408, y: 498, r: 90 },
  { x: 1590, y: 505, r: 90 },
]
function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v))
}
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOutSine = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t)
const smooth = (t: number) => t * t * (3 - 2 * t)
const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start))

export default function KingStoreHero({
  title = "A Royal Welcome Awaits",
  scrollHint = "Scroll",
  tagline = ["THE TASTE", "OF ROYALTY"],
  eyebrow = "Welcome to the Kingdom",
  headline = "Every Scoop, A Royal Treat",
  subheadline = "Handcrafted ice creams made with the goodness of milk.",
  primaryCta = { label: "Explore Flavours", href: "#flavours" },
  secondaryCta = { label: "Find a Store", href: "#stores" },
  products,
  assets,
  scrubDistance = 3000,
  showSkip = true,
  className,
  style,
}: KingStoreHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stillRef = useRef<HTMLImageElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<HTMLDivElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const doorGlowRef = useRef<HTMLDivElement>(null)
  const petalsRef = useRef<HTMLDivElement>(null)
  const wallLogoRef = useRef<SVGGElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const finaleRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const skipHandlerRef = useRef<() => void>(() => {})
  const items: KingHeroProducts = { ...DEFAULT_PRODUCTS, ...products }
  const art: KingStoreAssets = { ...DEFAULT_ASSETS, ...assets }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

    let rafId = 0
    let target = 0
    let current = 0
    let rendered = -1
    let started = false
    let locked = false
    let lockedScrollY = 0
    let overflow = 0 // extra forward input after the reveal finished
    let autoRelease = false // set by "Skip intro"
    let touchY = 0
    let touchT = 0
    let touchVelocity = 0
    let inertia = 0
    let inView = true

    // Living storefront (WebGL wind). Falls back to the still <img>.
    const wind = canvasRef.current ? createWindScene(canvasRef.current, art.storefront, art.windMask) : null
    if (wind) {
      wind.ready.then((ok) => {
        if (!ok) return
        wind.draw(performance.now() / 1000)
        if (canvasRef.current) canvasRef.current.style.opacity = "1"
      })
    }

    // ── layout (recomputed on resize) ─────────────────────────
    let vw = 1
    let vh = 1
    let s = 1 // stage scale
    let tx = 0
    let ty = 0
    let zoomEnd = 3 // artwork zoom when the camera comes to rest inside
    let startX = 0 // VIEW point on screen before any scrolling…
    let startY = 0
    let restX = 0 // …and where it rests at the end
    let restY = 0

    function measure() {
      vw = section!.clientWidth || window.innerWidth
      vh = section!.clientHeight || window.innerHeight
      // Cover on landscape screens; on portrait screens keep ~1030px of the
      // artwork across (doors, windows, potted flowers) and let sky and
      // paving fill above and below.
      s = Math.max(vw / STAGE_W, Math.min(vh / STAGE_H, vw / 1030))
      tx = (vw - STAGE_W * s) / 2
      ty = (vh - STAGE_H * s) * (STAGE_H * s < vh ? 0.3 : 0.35)
      zoomEnd = Math.max(1.05, Math.max(vw / VIEW_W, vh / VIEW_H) / s)
      startX = tx + VIEW.x * s
      startY = ty + VIEW.y * s
      restX = vw / 2
      restY = vh * 0.53
      // Feather the artwork's top and bottom edge into sky / paving when they show.
      const feather =
        STAGE_H * s < vh - 1 ? "linear-gradient(180deg, transparent 0, #000 5%, #000 90%, transparent 100%)" : "none"
      for (const el of [canvasRef.current, stillRef.current]) {
        if (!el) continue
        el.style.maskImage = feather
        el.style.webkitMaskImage = feather
      }
      rendered = -1
    }

    // ── scene ─────────────────────────────────────────────────
    // One continuous camera move: a gentle approach while the doors open,
    // then an even-paced glide (log-space, so the speed feels constant)
    // that settles inside, in front of the shelves.
    function zoomAt(p: number) {
      const approach = Math.min(1.3, Math.sqrt(zoomEnd))
      return Math.exp(
        Math.log(approach) * smooth(range(p, 0, 0.42)) + Math.log(zoomEnd / approach) * easeInOutSine(range(p, 0.28, 0.9)),
      )
    }

    function render(p: number) {
      const door = easeInOutCubic(range(p, 0.06, 0.42))
      const zoom = zoomAt(p)
      const S = s * zoom
      // The VIEW point drifts from where it starts to where it rests, in step with the zoom.
      const u = clamp((zoom - 1) / (zoomEnd - 1))
      const vx = startX + (restX - startX) * u
      const vy = startY + (restY - startY) * u

      const stage = stageRef.current
      if (stage) stage.style.transform = `translate3d(${vx - VIEW.x * S}px, ${vy - VIEW.y * S}px, 0) scale(${S})`

      // Arriving: the room drops slightly out of focus behind the sharp products.
      const focus = smooth(range(p, 0.72, 1))
      if (backdropRef.current) backdropRef.current.style.filter = focus > 0.01 ? `blur(${(focus * 0.8).toFixed(2)}px)` : "none"
      if (focusRef.current) focusRef.current.style.opacity = String(focus)

      const angle = door * 96
      if (leftDoorRef.current) leftDoorRef.current.style.transform = `rotateY(${angle}deg)`
      if (rightDoorRef.current) rightDoorRef.current.style.transform = `rotateY(${-angle}deg)`
      for (const leaf of [leftDoorRef.current, rightDoorRef.current]) {
        const glass = leaf?.firstElementChild as HTMLElement | null
        if (glass) glass.style.opacity = String(Math.sin(door * Math.PI) * 0.9)
      }
      if (doorGlowRef.current) doorGlowRef.current.style.opacity = String(door)
      if (wallLogoRef.current) wallLogoRef.current.style.opacity = String(smooth(range(p, 0.1, 0.4)))
      if (petalsRef.current) petalsRef.current.style.opacity = String(1 - range(p, 0.25, 0.5))

      if (introRef.current) {
        const t = 1 - clamp(p / 0.22)
        introRef.current.style.opacity = String(t)
        introRef.current.style.transform = `translate3d(0, ${(1 - t) * -24}px, 0)`
        introRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (hintRef.current) hintRef.current.style.opacity = started ? "0" : "1"

      if (finaleRef.current) {
        const t = easeOutCubic(range(p, 0.86, 0.99))
        finaleRef.current.style.opacity = String(t)
        finaleRef.current.style.transform = `translate3d(0, ${(1 - t) * 22}px, 0)`
        finaleRef.current.style.filter = `blur(${(1 - t) * 8}px)`
        finaleRef.current.style.pointerEvents = t > 0.6 ? "auto" : "none"
        finaleRef.current.setAttribute("aria-hidden", t > 0.6 ? "false" : "true")
      }

      if (skipRef.current) {
        const show = locked && p < 0.85
        skipRef.current.style.opacity = show ? "1" : "0"
        skipRef.current.style.pointerEvents = show ? "auto" : "none"
      }

      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${p})`
    }

    // ── locking ───────────────────────────────────────────────
    function lock() {
      if (locked) return
      locked = true
      lockedScrollY = window.scrollY
      overflow = 0
      document.documentElement.style.overscrollBehavior = "none"
      section!.style.touchAction = "none"
    }
    function unlock() {
      if (!locked) return
      locked = false
      autoRelease = false
      document.documentElement.style.overscrollBehavior = ""
      section!.style.touchAction = "pan-y"
    }
    const heroAtTop = () => section!.getBoundingClientRect().top >= -2

    function addDelta(dy: number) {
      target = clamp(target + dy / scrubDistance)
      if (target > 0.002) started = true
    }

    /** Returns true when the event was consumed by the hero. */
    function handleInput(dy: number, threshold: number): boolean {
      if (!locked) {
        // Scrolling back up into the hero: re-lock and rewind.
        if (dy < 0 && heroAtTop() && current > 0) {
          lock()
          addDelta(dy)
          return true
        }
        return false
      }
      if (dy > 0 && target >= 1 && current > 0.985) {
        overflow += dy
        if (overflow > threshold) {
          unlock()
          return false // let this very input scroll the page
        }
        return true
      }
      if (dy < 0) overflow = 0
      addDelta(dy)
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // pinch-zoom
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * vh : e.deltaY
      if (handleInput(dy, 160)) e.preventDefault()
    }

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
      touchT = performance.now()
      touchVelocity = 0
      inertia = 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY
      const now = performance.now()
      const dy = (touchY - y) * 1.6
      const dt = Math.max(1, now - touchT)
      touchVelocity = touchVelocity * 0.6 + (dy / dt) * 0.4
      touchY = y
      touchT = now
      if (handleInput(dy, 90) && e.cancelable) e.preventDefault()
    }
    const onTouchEnd = () => {
      if (locked && Math.abs(touchVelocity) > 0.05) inertia = touchVelocity * 16
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      let dy = 0
      if (e.key === "ArrowDown") dy = 120
      else if (e.key === "ArrowUp") dy = -120
      else if (e.key === "PageDown") dy = vh * 0.8
      else if (e.key === "PageUp") dy = -vh * 0.8
      else if (e.key === " " && !(el && /^(BUTTON|A)$/.test(el.tagName))) dy = e.shiftKey ? -vh * 0.8 : vh * 0.8
      else if (e.key === "Home" && (locked || heroAtTop())) {
        lock()
        target = 0
        e.preventDefault()
        return
      } else return
      if (handleInput(dy, 1)) e.preventDefault()
    }

    // Belt and braces: if anything (scrollbar drag, find-in-page, a hash
    // link) moves the page while locked, put it back.
    const onScroll = () => {
      if (locked && Math.abs(window.scrollY - lockedScrollY) > 1) window.scrollTo(0, lockedScrollY)
    }

    skipHandlerRef.current = () => {
      started = true
      target = 1
      autoRelease = true
    }

    // ── loop ──────────────────────────────────────────────────
    let last = performance.now()
    function frame(now: number) {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
      last = now
      if (inertia !== 0) {
        if (locked) handleInput(inertia, 90)
        inertia *= 0.9
        if (Math.abs(inertia) < 0.5) inertia = 0
      }
      const diff = target - current
      current = Math.abs(diff) < 0.0003 ? target : current + diff * (1 - Math.exp(-dt * 5.5))
      if (autoRelease && current > 0.995) unlock()
      if (current !== rendered) {
        render(current)
        rendered = current
      }
      // The wind only needs drawing while the storefront is on screen.
      if (wind && inView && current < 0.9 && !document.hidden) wind.draw(now / 1000)
      rafId = requestAnimationFrame(frame)
    }

    measure()
    const ro = new ResizeObserver(() => {
      measure()
      render(current)
      rendered = current
    })
    ro.observe(section)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true
    })
    io.observe(section)

    if (reduceMotion) {
      // Skip the choreography: show the finished view inside the store, never lock.
      target = current = 1
      started = true
      render(1)
      section.style.touchAction = "pan-y"
      return () => {
        ro.disconnect()
        io.disconnect()
        wind?.dispose()
      }
    }

    const rect = section.getBoundingClientRect()
    if (rect.top >= -2 && rect.top < vh * 0.5) {
      lock()
    } else {
      // Page was restored mid-scroll: the visitor is already past the hero.
      target = current = 1
      started = true
      section.style.touchAction = "pan-y"
    }
    render(current)
    rendered = current

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("scroll", onScroll, { passive: true })
    rafId = requestAnimationFrame(frame)

    return () => {
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
      wind?.dispose()
      unlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrubDistance, art.storefront, art.windMask])

  return (
    <section
      ref={sectionRef}
      aria-label="King Ice Cream — step inside"
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: 480,
        width: "100%",
        overflow: "hidden",
        background: SKY,
        touchAction: "none",
        isolation: "isolate",
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* ── Storefront ── */}
      <div
        ref={stageRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: STAGE_W,
          height: STAGE_H,
          transformOrigin: "0 0",
          pointerEvents: "none",
        }}
      >
        {/* sky above and paving below, for tall (portrait) screens */}
        <div style={{ position: "absolute", left: -2000, right: -2000, top: -2400, height: 2500, background: `linear-gradient(180deg, #2f8fe0 0%, ${SKY} 100%)` }} />
        <div style={{ position: "absolute", left: -2000, right: -2000, top: STAGE_H - 100, height: 2500, background: `linear-gradient(180deg, ${STONE} 0%, #ddd0be 60%)` }} />

        <div ref={backdropRef} style={{ position: "absolute", left: 0, top: 0, width: STAGE_W, height: STAGE_H }}>
        {/* still artwork (also the fallback when WebGL is unavailable) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={stillRef}
          src={art.storefront}
          alt=""
          draggable={false}
          style={{ position: "absolute", left: 0, top: 0, width: STAGE_W, height: STAGE_H, display: "block" }}
        />
        {/* the same artwork, alive: swaying flowers and a rippling sea */}
        <canvas
          ref={canvasRef}
          width={STAGE_W}
          height={STAGE_H}
          style={{ position: "absolute", left: 0, top: 0, width: STAGE_W, height: STAGE_H, opacity: 0, transition: "opacity .6s ease" }}
        />
        </div>

        {/* Inside the store: King products on its own shelves and counter, logo on the wall */}
        <StoreDisplay products={items} logo={art.logo} logoRef={wallLogoRef} />

        {/* lantern glow */}
        {LANTERNS.map((l) => (
          <div
            key={l.x}
            className="king-hero-flicker"
            style={{
              position: "absolute",
              left: l.x - l.r,
              top: l.y - l.r,
              width: l.r * 2,
              height: l.r * 2,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,226,150,0.65) 0%, rgba(255,200,90,0.22) 35%, rgba(255,200,90,0) 70%)",
              mixBlendMode: "screen",
              animationDelay: l.x > 1000 ? "-1.3s" : "0s",
            }}
          />
        ))}

        {/* brand tagline on the teal fascia */}
        {tagline && (
          <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} width={STAGE_W} height={STAGE_H} style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="kg-tagline-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff1b8" />
                <stop offset="0.45" stopColor="#f3c552" />
                <stop offset="1" stopColor="#c48a12" />
              </linearGradient>
              <filter id="kg-tagline-shadow" x="-10%" y="-40%" width="120%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#00242f" floodOpacity="0.55" />
              </filter>
            </defs>
            {tagline.map((text, i) => (
              <text
                key={i}
                x={i === 0 ? 630 : 1362}
                y={246}
                textAnchor="middle"
                fontFamily={SERIF}
                fontSize={31}
                fontWeight={700}
                letterSpacing={6}
                fill="url(#kg-tagline-gold)"
                filter="url(#kg-tagline-shadow)"
              >
                {text}
              </text>
            ))}
          </svg>
        )}

        {/* Glass doors (3D), cut from the artwork */}
        <div
          style={{
            position: "absolute",
            left: LEAVES.x,
            top: LEAVES.y,
            width: LEAVES.w,
            height: LEAVES.h,
            perspective: 1100,
            perspectiveOrigin: "50% 50%",
          }}
        >
          <DoorLeaf side="left" src={art.doorLeft} leafRef={leftDoorRef} />
          <DoorLeaf side="right" src={art.doorRight} leafRef={rightDoorRef} />
        </div>

        {/* Warm light from inside as the doors open */}
        <div
          ref={doorGlowRef}
          style={{
            position: "absolute",
            left: DOOR.x - 300,
            top: DOOR.y - 160,
            width: DOOR.w + 600,
            height: DOOR.h + 400,
            background: "radial-gradient(ellipse 34% 40% at 50% 52%, rgba(255,232,170,0.5), rgba(255,210,120,0.16) 50%, rgba(255,210,120,0) 75%)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        />
      </div>

      {/* Drifting bougainvillea petals */}
      <div ref={petalsRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {PETALS.map((pt, i) => (
          <span
            key={i}
            className="king-hero-petal"
            style={
              {
                left: `${pt.x}%`,
                animationDuration: `${pt.dur}s`,
                animationDelay: `${pt.delay}s`,
                "--drift": `${pt.drift}vw`,
              } as React.CSSProperties
            }
          >
            <span
              style={{
                width: pt.size,
                height: pt.size * 0.75,
                background: pt.color,
                animationDuration: `${pt.dur / 4}s`,
              }}
            />
          </span>
        ))}
      </div>

      {/* Soft vignette as the camera settles inside */}
      <div
        ref={focusRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 75% 70% at 50% 55%, rgba(0,0,0,0) 55%, rgba(30,18,4,0.35) 100%)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Intro copy (in front of the store) ── */}
      <div
        ref={introRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: "calc(clamp(16px, 3.5vh, 32px) + 90px)",
          paddingTop: "18vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(0,36,47,0) 0%, rgba(0,36,47,0.45) 45%, rgba(0,36,47,0.78) 100%)",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            margin: 0,
            padding: "0 6%",
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: "clamp(28px, 3.4vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: CREAM,
            textShadow: "0 4px 30px rgba(0,0,0,0.55)",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        ref={hintRef}
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(16px, 3.5vh, 32px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: "clamp(12px, 1.3vw, 14px)",
            fontWeight: 700,
            letterSpacing: "0.42em",
            marginRight: "-0.42em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            color: CREAM,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {scrollHint}
        </span>
        <span className="king-hero-hint-ring">
          <ChevronDown size={22} strokeWidth={2.4} style={{ animation: "king-hero-bounce 1.6s ease-in-out infinite" }} />
        </span>
      </div>

      {/* ── Finale copy (inside the store) ── */}
      <div
        ref={finaleRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "clamp(16px, 4vh, 44px) 16px clamp(28px, 6vh, 64px)",
          textAlign: "center",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(6px, 1vh, 10px)",
            maxWidth: 760,
            padding: "clamp(14px, 2.2vh, 22px) clamp(18px, 3vw, 40px)",
            borderRadius: 22,
            background: "rgba(255,249,238,0.84)",
            border: "1px solid rgba(214,170,74,0.55)",
            boxShadow: "0 18px 50px -18px rgba(40,24,4,0.45)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: "clamp(10px, 1.2vw, 12px)",
              fontWeight: 700,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#a87412",
            }}
          >
            {eyebrow}
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 800,
              fontSize: "clamp(26px, 3.6vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: TEAL_DEEP,
              textShadow: "0 2px 0 rgba(255,255,255,0.6)",
            }}
          >
            {headline}
          </h2>
          {subheadline && (
            <p
              style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: "clamp(13px, 1.3vw, 16px)",
                fontWeight: 500,
                lineHeight: 1.45,
                color: "rgba(0,70,94,0.85)",
                maxWidth: 520,
              }}
            >
              {subheadline}
            </p>
          )}
        </div>

        {(primaryCta || secondaryCta) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {primaryCta && (
              <a href={primaryCta.href} className="king-hero-btn king-hero-btn--primary">
                {primaryCta.label}
                <ArrowRight size={18} strokeWidth={2.2} />
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="king-hero-btn king-hero-btn--ghost">
                <MapPin size={17} strokeWidth={2} />
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>

      {showSkip && (
        <button ref={skipRef} type="button" onClick={() => skipHandlerRef.current()} className="king-hero-skip">
          Skip intro
        </button>
      )}

      {/* Gold progress line */}
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,0.15)" }}>
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: GOLD_CSS_H,
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Door leaf: the gold frame cut from the artwork, plus a glass
// sheen that only shows while the door is moving.
// ─────────────────────────────────────────────────────────────
function DoorLeaf({
  side,
  src,
  leafRef,
}: {
  side: "left" | "right"
  src: string
  leafRef: React.RefObject<HTMLDivElement | null>
}) {
  const isLeft = side === "left"
  return (
    <div
      ref={leafRef}
      style={{
        position: "absolute",
        top: 0,
        left: isLeft ? 0 : LEAVES.w - LEAF.w,
        width: LEAF.w,
        height: LEAVES.h,
        transformOrigin: `${isLeft ? LEAF.leftHinge : LEAF.rightHinge}px 50%`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: LEAF.glass.x,
          top: LEAF.glass.y,
          width: LEAF.glass.w,
          height: LEAF.glass.h,
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 26%, rgba(255,255,255,0) 42%, rgba(255,255,255,0.16) 55%, rgba(255,255,255,0) 64%), rgba(220,235,240,0.12)",
          opacity: 0,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// WebGL wind: sways foliage and ripples the sea using a mask.
// ─────────────────────────────────────────────────────────────
const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uImg;
uniform sampler2D uMask;
uniform float uTime;
uniform vec2 uRes;
varying vec2 vUv;
void main() {
  vec2 px = vUv * uRes;
  vec2 m = texture2D(uMask, vUv).rg;
  float t = uTime;
  // Foliage: slow gusts rolling across the scene + leaf-level flutter.
  float gust = 0.55 + 0.45 * sin(t * 0.55 - px.x * 0.0025) * sin(t * 0.31 + 1.7);
  float sway = sin(t * 1.35 + px.y * 0.035 + px.x * 0.008) + 0.45 * sin(t * 2.9 + px.x * 0.06 + px.y * 0.025);
  float flutter = sin(t * 4.3 + px.x * 0.21 + px.y * 0.17) * 0.35;
  vec2 off = vec2((sway * gust + flutter) * 2.6, (cos(t * 1.9 + px.x * 0.03) * 0.6 + flutter * 0.6)) * m.r;
  // Sea: gentle horizontal drift and vertical ripple.
  off += vec2(sin(t * 0.9 + px.y * 0.35) * 0.9, sin(t * 2.2 + px.x * 0.045 + px.y * 0.6) * 1.1) * m.g;
  vec4 c = texture2D(uImg, (px - off) / uRes);
  // Sun glints on the water, broken up so they never read as a grid.
  float g = sin(px.x * 0.19 + t * 1.6 + sin(px.y * 0.11) * 3.0) * sin(px.y * 0.73 - t * 1.1 + px.x * 0.02);
  float patch = smoothstep(0.35, 1.0, sin(px.x * 0.013 + px.y * 0.05 + t * 0.35) * sin(px.x * 0.031 - t * 0.2 + 1.3));
  c.rgb += pow(max(g, 0.0), 24.0) * 0.5 * patch * m.g;
  gl_FragColor = vec4(c.rgb, 1.0);
}`

function createWindScene(canvas: HTMLCanvasElement, imgSrc: string, maskSrc: string) {
  let gl: WebGLRenderingContext | null = null
  try {
    gl = canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false }) as WebGLRenderingContext | null
  } catch {
    gl = null
  }
  if (!gl) return null
  const g = gl

  const compile = (type: number, src: string) => {
    const sh = g.createShader(type)!
    g.shaderSource(sh, src)
    g.compileShader(sh)
    return g.getShaderParameter(sh, g.COMPILE_STATUS) ? sh : null
  }
  const vs = compile(g.VERTEX_SHADER, VERT)
  const fs = compile(g.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const prog = g.createProgram()!
  g.attachShader(prog, vs)
  g.attachShader(prog, fs)
  g.linkProgram(prog)
  if (!g.getProgramParameter(prog, g.LINK_STATUS)) return null
  g.useProgram(prog)

  const buf = g.createBuffer()
  g.bindBuffer(g.ARRAY_BUFFER, buf)
  g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW)
  const aPos = g.getAttribLocation(prog, "aPos")
  g.enableVertexAttribArray(aPos)
  g.vertexAttribPointer(aPos, 2, g.FLOAT, false, 0, 0)
  const uTime = g.getUniformLocation(prog, "uTime")
  g.uniform2f(g.getUniformLocation(prog, "uRes"), canvas.width, canvas.height)
  g.uniform1i(g.getUniformLocation(prog, "uImg"), 0)
  g.uniform1i(g.getUniformLocation(prog, "uMask"), 1)

  let ok = false
  let disposed = false
  const load = (src: string, unit: number) =>
    new Promise<boolean>((resolve) => {
      const img = new Image()
      img.decoding = "async"
      img.onload = () => {
        if (disposed) return resolve(false)
        const tex = g.createTexture()
        g.activeTexture(g.TEXTURE0 + unit)
        g.bindTexture(g.TEXTURE_2D, tex)
        g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true)
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, img)
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR)
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR)
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
        resolve(true)
      }
      img.onerror = () => resolve(false)
      img.src = src
    })

  const ready = Promise.all([load(imgSrc, 0), load(maskSrc, 1)]).then(([a, b]) => (ok = a && b && !disposed))

  return {
    ready,
    draw(time: number) {
      if (!ok) return
      g.uniform1f(uTime, time % 1000)
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
    },
    dispose() {
      disposed = true
      ok = false
      g.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}

// ─────────────────────────────────────────────────────────────
// Inside the store: the real King products on the artwork's own
// shelves and counter, and the logo centred on the teal arch.
// Drawn in artwork units, so it moves with the camera.
// ─────────────────────────────────────────────────────────────
function rotate<T>(list: T[], by: number): T[] {
  if (list.length === 0) return list
  const n = by % list.length
  return list.slice(n).concat(list.slice(0, n))
}

/** A product photo standing on a baseline (x = centre, y = bottom). */
function Product({
  src,
  cx,
  bottom,
  height,
  ratio,
  rotate: deg = 0,
  shadow = true,
}: {
  src: string
  cx: number
  bottom: number
  height: number
  ratio: number
  rotate?: number
  shadow?: boolean
}) {
  const w = height * ratio
  return (
    <g transform={deg ? `rotate(${deg} ${cx} ${bottom})` : undefined}>
      {shadow && <ellipse cx={cx} cy={bottom - 0.5} rx={w * 0.46} ry={w * 0.06} fill="#2a1a06" opacity={0.35} />}
      <image href={src} x={cx - w / 2} y={bottom - height} width={w} height={height} preserveAspectRatio="xMidYMax meet" />
    </g>
  )
}

function StoreDisplay({
  products,
  logo,
  logoRef,
}: {
  products: KingHeroProducts
  logo: string
  logoRef: React.RefObject<SVGGElement | null>
}) {
  const { tubs, bars } = products
  const logoH = WALL_LOGO.w * LOGO_RATIO
  return (
    <svg
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      width={STAGE_W}
      height={STAGE_H}
      // warm-graded to sit in the store's lighting
      style={{ position: "absolute", inset: 0, overflow: "visible", filter: "sepia(0.14) saturate(0.95) brightness(0.97) contrast(0.96)" }}
    >
      <defs>
        <filter id="ks-shadow" x="-30%" y="-20%" width="160%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#2a1a06" floodOpacity="0.45" />
        </filter>
        <radialGradient id="ks-logo-glow">
          <stop offset="0" stopColor="#fff1c4" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#ffd98a" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* left arch shelves: tubs */}
      {SHELF_ROWS.map((y, row) =>
        rotate(tubs, row * 2)
          .slice(0, LEFT_SHELF_X.length)
          .map((src, i) => <Product key={`t${row}-${i}`} src={src} cx={LEFT_SHELF_X[i]} bottom={y} height={42} ratio={TUB_RATIO} />),
      )}

      {/* right arch shelves: bars (the top shelf is narrower under the arch) */}
      {bars.length > 0 &&
        SHELF_ROWS.map((y, row) =>
          RIGHT_SHELF_X.map((x, i) =>
            row === 0 && i === 0 ? null : (
              <Product key={`b${row}-${i}`} src={bars[(i + row) % bars.length]} cx={x} bottom={y} height={44} ratio={BAR_RATIO} />
            ),
          ),
        )}

      {/* King logo, centred on the teal arch; lights up as the doors open */}
      <g ref={logoRef} style={{ opacity: 0 }}>
        <ellipse cx={WALL_LOGO.x} cy={WALL_LOGO.y + logoH / 2} rx={92} ry={66} fill="url(#ks-logo-glow)" className="king-hero-flicker" />
        <image
          href={logo}
          x={WALL_LOGO.x - WALL_LOGO.w / 2}
          y={WALL_LOGO.y}
          width={WALL_LOGO.w}
          height={logoH}
          preserveAspectRatio="xMidYMid meet"
          filter="url(#ks-shadow)"
        />
      </g>

      {/* counter display in front of the arch */}
      <g filter="url(#ks-shadow)">
        <Product src={products.heroLeft} cx={955} bottom={COUNTER_Y} height={100} ratio={BAR_RATIO} rotate={-9} shadow={false} />
        <Product src={products.heroRight} cx={1047} bottom={COUNTER_Y} height={100} ratio={BAR_RATIO} rotate={9} shadow={false} />
        <Product src={products.hero} cx={1001} bottom={COUNTER_Y + 1} height={86} ratio={TUB_RATIO} />
      </g>
    </svg>
  )
}

// Petals start near the bougainvillea on both sides of the scene.
const PETALS = [
  { x: 4, size: 12, color: "#d6247f", dur: 13, delay: -2, drift: 14 },
  { x: 10, size: 10, color: "#ef5aa8", dur: 16, delay: -9, drift: 10 },
  { x: 16, size: 9, color: "#f28a2e", dur: 12, delay: -5, drift: 16 },
  { x: 22, size: 11, color: "#b5179e", dur: 15, delay: -12, drift: 8 },
  { x: 7, size: 8, color: "#ff7ab8", dur: 18, delay: -15, drift: 18 },
  { x: 28, size: 9, color: "#e04f97", dur: 14, delay: -7, drift: 12 },
  { x: 72, size: 10, color: "#f07c22", dur: 14, delay: -3, drift: -12 },
  { x: 78, size: 12, color: "#d6247f", dur: 17, delay: -10, drift: -16 },
  { x: 84, size: 9, color: "#ff8fc2", dur: 12, delay: -6, drift: -9 },
  { x: 90, size: 11, color: "#c2188a", dur: 15, delay: -13, drift: -14 },
  { x: 95, size: 8, color: "#f59a3d", dur: 19, delay: -1, drift: -18 },
  { x: 66, size: 9, color: "#e85aa6", dur: 16, delay: -11, drift: -10 },
]

const KEYFRAMES = `
@keyframes king-hero-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50% { transform: translateY(5px); opacity: 1; }
}
@keyframes king-hero-pulse {
  0% { box-shadow: 0 0 0 0 rgba(250,176,1,0.55); }
  100% { box-shadow: 0 0 0 16px rgba(250,176,1,0); }
}
@keyframes king-hero-flicker {
  0%, 100% { opacity: 0.85; } 22% { opacity: 1; } 40% { opacity: 0.78; } 63% { opacity: 0.95; } 80% { opacity: 0.82; }
}
@keyframes king-hero-fall {
  0% { transform: translate3d(0, -6vh, 0); opacity: 0; }
  8% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translate3d(var(--drift), 106vh, 0); opacity: 0; }
}
@keyframes king-hero-tumble {
  0% { transform: translateX(0) rotate(0deg) rotateX(0deg); }
  25% { transform: translateX(14px) rotate(80deg) rotateX(60deg); }
  50% { transform: translateX(0) rotate(170deg) rotateX(0deg); }
  75% { transform: translateX(-14px) rotate(260deg) rotateX(60deg); }
  100% { transform: translateX(0) rotate(360deg) rotateX(0deg); }
}
.king-hero-petal {
  position: absolute; top: 0; display: block;
  animation-name: king-hero-fall; animation-timing-function: linear; animation-iteration-count: infinite;
}
.king-hero-petal > span {
  display: block; border-radius: 70% 0 70% 0; opacity: 0.92;
  box-shadow: inset -2px -2px 4px rgba(0,0,0,0.15);
  animation: king-hero-tumble 4s ease-in-out infinite;
}
.king-hero-flicker { animation: king-hero-flicker 3.2s ease-in-out infinite; }
.king-hero-hint-ring {
  display: inline-flex; align-items: center; justify-content: center;
  width: 46px; height: 46px; border-radius: 999px; color: ${YELLOW};
  border: 1.5px solid rgba(255,214,107,0.9); background: rgba(0,30,42,0.45);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  animation: king-hero-pulse 2s ease-out infinite;
}
.king-hero-btn {
  display: inline-flex; align-items: center; gap: 10px;
  height: 52px; padding: 0 26px; border-radius: 999px;
  font-family: ${SANS}; font-size: 15px; font-weight: 700; letter-spacing: 0.02em;
  text-decoration: none; transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}
.king-hero-btn:hover { transform: translateY(-2px); }
.king-hero-btn:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
.king-hero-btn--primary {
  background: ${GOLD_CSS}; color: ${TEAL_DEEP};
  box-shadow: 0 10px 30px rgba(0,40,55,0.35), inset 0 1px 0 rgba(255,255,255,0.6);
}
.king-hero-btn--primary:hover { box-shadow: 0 14px 36px rgba(0,40,55,0.45), inset 0 1px 0 rgba(255,255,255,0.6); }
.king-hero-btn--ghost {
  color: #fff; border: 1.5px solid rgba(255,241,184,0.75); background: rgba(0,70,94,0.88);
  box-shadow: 0 10px 30px rgba(0,40,55,0.3);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
}
.king-hero-btn--ghost:hover { background: rgba(0,70,94,1); }
.king-hero-skip {
  position: absolute; right: clamp(12px, 2.5vw, 24px); bottom: clamp(14px, 2.4vw, 22px); z-index: 3;
  font-family: ${SANS}; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,246,227,0.85); background: rgba(0,30,42,0.4); border: 1px solid rgba(255,241,184,0.4);
  border-radius: 999px; padding: 8px 14px; cursor: pointer; transition: opacity .4s ease, color .2s ease;
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
}
.king-hero-skip:hover { color: #fff; }
@media (max-width: 480px) {
  .king-hero-btn { height: 46px; padding: 0 18px; font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .king-hero-hint-ring, .king-hero-flicker { animation: none; }
  .king-hero-petal { display: none; }
}
`
