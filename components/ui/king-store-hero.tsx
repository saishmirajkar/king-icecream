"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, MapPin } from "lucide-react"

// ─────────────────────────────────────────────────────────────
// KING ICE CREAM — scroll-locked "store doors opening" hero
//
// Same interaction model as the reference MetroHero (scroll-locked
// scrub), but instead of seeking a video, scroll input drives a fully
// illustrated King Ice Cream storefront:
//
//   0.00 – 0.55  camera eases toward the boutique, glass doors swing in
//   0.40 – 0.88  camera flies through the doorway, warm light floods out
//   0.80 – 1.00  the yellow parlour interior settles, headline + CTAs in
//
// While the hero is at the top of the viewport the page is locked and
// wheel / touch / keyboard input only scrubs the animation (forward and
// backward). Once the reveal is finished and the user keeps scrolling
// down, the page unlocks and continues normally; scrolling back up to
// the top re-locks it and plays the scene in reverse.
//
// No video, no extra libraries (lucide-react for three icons only).
// Everything is SVG + CSS transforms, so it is crisp on every screen.
// ─────────────────────────────────────────────────────────────

export interface KingStoreHeroProps {
  /** Logo shown on the storefront sign. Transparent PNG/SVG works best. */
  logoSrc?: string
  /** Intro title shown in front of the store (fades out on scroll). */
  title?: string
  scrollHint?: string
  /** Final reveal copy, shown once you are inside the parlour. */
  /** Small caps line above the final headline. */
  eyebrow?: string
  headline?: string
  subheadline?: string
  primaryCta?: { label: string; href: string } | false
  secondaryCta?: { label: string; href: string } | false
  /** Text on the gold band of the awning. */
  awningText?: string
  /** Total input distance (px) needed to scrub the full scene. */
  scrubDistance?: number
  /** Show a small "Skip intro" button while the intro is playing. */
  showSkip?: boolean
  className?: string
  style?: React.CSSProperties
}

// Brand palette (sampled from the King Ice Cream artwork)
const BLUE = "#007191"
const BLUE_DEEP = "#00465e"
const BLUE_NIGHT = "#012a38"
const YELLOW = "#fab001"
const CREAM = "#fff6e3"

const SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif"
const SANS = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const GOLD_CSS = "linear-gradient(180deg, #fff1b8 0%, #f9c846 28%, #d99a0b 55%, #f7cf5a 78%, #b97a00 100%)"
const GOLD_CSS_H = "linear-gradient(90deg, #b97a00 0%, #f7cf5a 22%, #fff1b8 45%, #d99a0b 70%, #f9c846 100%)"

// Storefront stage, in its own units. Everything in the facade is laid out
// in this 1600 × 1100 space and the whole stage is scaled to the viewport.
const STAGE_W = 1600
const STAGE_H = 1100
const DOOR = { x: 630, y: 490, w: 340, h: 390 } // the two glass doors
const FOCUS = { x: 800, y: 690 } // camera zooms toward this point
// Interior (parlour) stage, scaled to cover the viewport
const INT_W = 1600
const INT_H = 1000

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v))
}
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeInCubic = (t: number) => t * t * t
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const smooth = (t: number) => t * t * (3 - 2 * t)
const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start))

export default function KingStoreHero({
  logoSrc = "/brand/king-logo.png",
  title = "A Royal Welcome Awaits",
  scrollHint = "Scroll to step inside",
  eyebrow = "Welcome to the Kingdom",
  headline = "Every Scoop, A Royal Treat",
  subheadline = "Handcrafted ice creams made with the goodness of milk.",
  primaryCta = { label: "Explore Flavours", href: "#flavours" },
  secondaryCta = { label: "Find a Store", href: "#stores" },
  awningText = "KING ICE CREAM  ·  PREMIUM PARLOUR",
  scrubDistance = 2600,
  showSkip = true,
  className,
  style,
}: KingStoreHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const interiorRef = useRef<HTMLDivElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const openSignRef = useRef<HTMLDivElement>(null)
  const doorGlowRef = useRef<HTMLDivElement>(null)
  const floorLightRef = useRef<SVGPolygonElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const finaleRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const skipHandlerRef = useRef<() => void>(() => {})

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

    // ── layout (recomputed on resize) ─────────────────────────
    let vw = 1
    let vh = 1
    let s = 1 // stage scale
    let tx = 0
    let ty = 0
    let focusX = 0
    let focusY = 0
    let zoomEnd = 6
    let si = 1 // interior scale

    function measure() {
      vw = section!.clientWidth || window.innerWidth
      vh = section!.clientHeight || window.innerHeight
      // Fit the full storefront height; on narrow (portrait) screens crop the
      // sides so the doorway stays big, but never below ~82% of full height.
      s = Math.min(vh / STAGE_H, Math.max(vw / 760, (vh / STAGE_H) * 0.82))
      tx = (vw - STAGE_W * s) / 2
      // Spare vertical space goes mostly to the floor, where the intro copy sits.
      ty = (vh - STAGE_H * s) * 0.3
      focusX = tx + FOCUS.x * s
      focusY = ty + FOCUS.y * s
      // Zoom needed for the doorway to swallow the whole viewport.
      const left = (FOCUS.x - DOOR.x) * s
      const right = (DOOR.x + DOOR.w - FOCUS.x) * s
      const top = (FOCUS.y - DOOR.y) * s
      const bottom = (DOOR.y + DOOR.h - FOCUS.y) * s
      zoomEnd = Math.max(focusX / left, (vw - focusX) / right, focusY / top, (vh - focusY) / bottom) * 1.15
      si = Math.max(vw / INT_W, vh / INT_H)
      rendered = -1
    }

    // ── scene ─────────────────────────────────────────────────
    function render(p: number) {
      const door = easeInOutCubic(range(p, 0.1, 0.55))
      const approach = smooth(range(p, 0, 0.55))
      const dive = easeInCubic(range(p, 0.4, 0.88))
      const APPROACH_ZOOM = 1.45
      const logZoom = Math.log(APPROACH_ZOOM) * approach + Math.log(zoomEnd / APPROACH_ZOOM) * dive
      const zoom = Math.exp(logZoom)
      const depth = logZoom / Math.log(zoomEnd) // 0 → 1 as we pass through

      const stage = stageRef.current
      if (stage) {
        const sx = focusX + zoom * (tx - focusX)
        const sy = focusY + zoom * (ty - focusY)
        stage.style.transform = `translate3d(${sx}px, ${sy}px, 0) scale(${s * zoom})`
        const fade = 1 - smooth(range(p, 0.76, 0.88))
        stage.style.opacity = String(fade)
        stage.style.visibility = fade <= 0.001 ? "hidden" : "visible"
      }

      const angle = door * 100
      if (leftDoorRef.current) leftDoorRef.current.style.transform = `rotateY(${angle}deg)`
      if (rightDoorRef.current) rightDoorRef.current.style.transform = `rotateY(${-angle}deg)`
      if (openSignRef.current) openSignRef.current.style.transform = `rotate(${Math.sin(door * Math.PI * 2) * 7}deg)`
      if (doorGlowRef.current) doorGlowRef.current.style.opacity = String(door)
      if (floorLightRef.current) floorLightRef.current.style.opacity = String(door * 0.95)

      const interior = interiorRef.current
      if (interior) {
        // Interior sits "deeper" than the facade, so it grows slower (parallax)
        // and drifts from the doorway to the centre of the screen.
        const START = 0.42
        const k = clamp(depth)
        const scale = si * START * Math.pow(1 / START, k) * (1 + 0.04 * smooth(range(p, 0.85, 1)))
        const ox = (focusX - vw / 2) * (1 - k)
        const oy = (focusY - vh / 2) * (1 - k)
        interior.style.transform = `translate3d(${vw / 2 + ox}px, ${vh / 2 + oy}px, 0) scale(${scale}) translate(${-INT_W / 2}px, ${-INT_H / 2}px)`
      }

      if (flashRef.current) {
        const f = clamp(1 - Math.abs(p - 0.82) / 0.1)
        flashRef.current.style.opacity = String(Math.pow(f, 1.6) * 0.9)
      }

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
    function frame() {
      if (inertia !== 0) {
        if (locked) handleInput(inertia, 90)
        inertia *= 0.9
        if (Math.abs(inertia) < 0.5) inertia = 0
      }
      const diff = target - current
      current = Math.abs(diff) < 0.0004 ? target : current + diff * 0.12
      if (autoRelease && current > 0.995) unlock()
      if (current !== rendered) {
        render(current)
        rendered = current
      }
      rafId = requestAnimationFrame(frame)
    }

    measure()
    const ro = new ResizeObserver(() => {
      measure()
      render(current)
      rendered = current
    })
    ro.observe(section)

    if (reduceMotion) {
      // Skip the choreography: show the finished parlour, never lock.
      target = current = 1
      started = true
      render(1)
      section.style.touchAction = "pan-y"
      return () => ro.disconnect()
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
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
      unlock()
    }
  }, [scrubDistance])

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
        background: BLUE_NIGHT,
        touchAction: "none",
        isolation: "isolate",
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* ── Interior: the parlour behind the doors ── */}
      <div
        ref={interiorRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: INT_W,
          height: INT_H,
          transformOrigin: "0 0",
          pointerEvents: "none",
        }}
      >
        <Parlour />
      </div>

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
        <Storefront logoSrc={logoSrc} awningText={awningText} floorLightRef={floorLightRef} />

        {/* Glass doors (3D) */}
        <div
          style={{
            position: "absolute",
            left: DOOR.x,
            top: DOOR.y,
            width: DOOR.w,
            height: DOOR.h,
            perspective: 900,
            perspectiveOrigin: "50% 45%",
          }}
        >
          <GlassDoor side="left" doorRef={leftDoorRef} openSignRef={openSignRef} />
          <GlassDoor side="right" doorRef={rightDoorRef} />
        </div>

        {/* Warm light pouring out of the doorway */}
        <div
          ref={doorGlowRef}
          style={{
            position: "absolute",
            left: DOOR.x - 360,
            top: DOOR.y - 300,
            width: DOOR.w + 720,
            height: DOOR.h + 520,
            background:
              "radial-gradient(ellipse 38% 46% at 50% 56%, rgba(255,222,140,0.45), rgba(255,190,60,0.18) 45%, rgba(255,180,40,0) 72%)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        />
      </div>

      {/* Light flash as we cross the threshold */}
      <div
        ref={flashRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 55%, #fffaf0 0%, #ffe6a6 45%, rgba(250,176,1,0.85) 100%)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Cinematic vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 120% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,18,26,0.55) 100%)",
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
          bottom: "calc(clamp(20px, 5vh, 44px) + 46px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: "clamp(28px, 4.6vw, 60px)",
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
          bottom: "clamp(20px, 5vh, 44px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "rgba(255,246,227,0.8)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.2vw, 11px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <ChevronDown size={18} strokeWidth={1.6} style={{ color: YELLOW, animation: "king-hero-bounce 1.6s ease-in-out infinite" }} />
      </div>

      {/* ── Finale copy (inside the parlour) ── */}
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
          padding: "clamp(64px, 11vh, 120px) 6% clamp(36px, 7vh, 72px)",
          textAlign: "center",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(8px, 1.4vh, 14px)", maxWidth: 820 }}>
          <span
            style={{
              fontFamily: SANS,
              fontSize: "clamp(10px, 1.2vw, 12px)",
              fontWeight: 700,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: BLUE,
            }}
          >
            {eyebrow}
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 800,
              fontSize: "clamp(32px, 5.4vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              color: BLUE_DEEP,
              textShadow: "0 2px 0 rgba(255,241,184,0.6)",
            }}
          >
            {headline}
          </h2>
          {subheadline && (
            <p
              style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: "clamp(14px, 1.5vw, 18px)",
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
        <button
          ref={skipRef}
          type="button"
          onClick={() => skipHandlerRef.current()}
          className="king-hero-skip"
        >
          Skip intro
        </button>
      )}

      {/* Gold progress line */}
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,0.1)" }}>
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
// Glass door
// ─────────────────────────────────────────────────────────────
function GlassDoor({
  side,
  doorRef,
  openSignRef,
}: {
  side: "left" | "right"
  doorRef: React.RefObject<HTMLDivElement | null>
  openSignRef?: React.RefObject<HTMLDivElement | null>
}) {
  const isLeft = side === "left"
  const w = DOOR.w / 2
  return (
    <div
      ref={doorRef}
      style={{
        position: "absolute",
        top: 0,
        left: isLeft ? 0 : w,
        width: w,
        height: DOOR.h,
        transformOrigin: isLeft ? "left center" : "right center",
        background: GOLD_CSS_H,
        padding: 9,
        boxSizing: "border-box",
        boxShadow: "inset 0 0 0 1px rgba(90,55,0,0.55), 0 0 0 1px rgba(0,0,0,0.25)",
      }}
    >
      {/* glass */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 22%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.12) 52%, rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(0,42,58,0.5), rgba(0,26,38,0.68))",
          boxShadow: "inset 0 0 0 1px rgba(255,236,170,0.35), inset 0 0 24px rgba(0,20,30,0.35)",
          overflow: "hidden",
        }}
      >
        {/* etched crown */}
        <svg viewBox="0 0 60 40" width={58} height={38} style={{ position: "absolute", left: "50%", top: "17%", transform: "translateX(-50%)", opacity: 0.9 }}>
          <path
            d="M6 32 L4 10 L17 21 L30 4 L43 21 L56 10 L54 32 Z"
            fill="none"
            stroke="#f7cf5a"
            strokeWidth={2.2}
            strokeLinejoin="round"
          />
          <line x1={7} y1={37} x2={53} y2={37} stroke="#f7cf5a" strokeWidth={2.2} strokeLinecap="round" />
          <circle cx={30} cy={4} r={2.6} fill="#f7cf5a" />
          <circle cx={4} cy={10} r={2.2} fill="#f7cf5a" />
          <circle cx={56} cy={10} r={2.2} fill="#f7cf5a" />
        </svg>
        {!isLeft && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "33%",
              textAlign: "center",
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: "0.12em",
              color: "rgba(247,207,90,0.9)",
            }}
          >
            King
          </div>
        )}

        {/* mid rail */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "62%", height: 7, background: GOLD_CSS }} />
        {/* kick plate */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "13%",
            background: GOLD_CSS,
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.45)",
          }}
        />
        {/* hanging OPEN sign */}
        {openSignRef && (
          <div
            ref={openSignRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              marginLeft: -40,
              width: 80,
              transformOrigin: "50% -18px",
            }}
          >
            <svg viewBox="0 0 80 18" width={80} height={18} style={{ position: "absolute", top: -18, left: 0 }}>
              <path d="M14 18 L40 2 L66 18" fill="none" stroke="#f7cf5a" strokeWidth={1.4} />
              <circle cx={40} cy={2} r={2} fill="#f7cf5a" />
            </svg>
            <div
              style={{
                background: BLUE_DEEP,
                border: "2px solid #f7cf5a",
                borderRadius: 6,
                padding: "5px 0 4px",
                textAlign: "center",
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.22em",
                color: "#ffd769",
                boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
              }}
            >
              OPEN
            </div>
          </div>
        )}
      </div>

      {/* pull handle on the meeting edge */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          [isLeft ? "right" : "left"]: 18,
          width: 9,
          height: "30%",
          borderRadius: 6,
          background: GOLD_CSS_H,
          boxShadow: "0 4px 10px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(90,55,0,0.5)",
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Storefront facade (static SVG, 1600 × 1100 stage units)
// ─────────────────────────────────────────────────────────────
const EXT = 1500 // how far walls / floor extend beyond the stage

function scallopPath(x0: number, x1: number, y: number, r: number) {
  let d = `M${x0} ${y - 1}`
  for (let x = x0; x < x1; x += r * 2) d += ` A${r} ${r} 0 0 0 ${x + r * 2} ${y - 1}`
  return d + ` L${x1} ${y - 52} L${x0} ${y - 52} Z`
}

function Storefront({
  logoSrc,
  awningText,
  floorLightRef,
}: {
  logoSrc: string
  awningText: string
  floorLightRef: React.RefObject<SVGPolygonElement | null>
}) {
  const doorL = DOOR.x
  const doorR = DOOR.x + DOOR.w
  const ground = DOOR.y + DOOR.h // 880
  const holeTop = 412
  return (
    <svg
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      width={STAGE_W}
      height={STAGE_H}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="kg-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset="0.28" stopColor="#f9c846" />
          <stop offset="0.55" stopColor="#d99a0b" />
          <stop offset="0.78" stopColor="#f7cf5a" />
          <stop offset="1" stopColor="#b97a00" />
        </linearGradient>
        <linearGradient id="kg-gold-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b97a00" />
          <stop offset="0.25" stopColor="#f7cf5a" />
          <stop offset="0.5" stopColor="#fff1b8" />
          <stop offset="0.75" stopColor="#d99a0b" />
          <stop offset="1" stopColor="#f9c846" />
        </linearGradient>
        <linearGradient id="kg-flute-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#003f53" />
          <stop offset="0.45" stopColor="#005b77" />
          <stop offset="0.6" stopColor="#00627f" />
          <stop offset="1" stopColor="#003f53" />
        </linearGradient>
        <pattern id="kg-flute" width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill="url(#kg-flute-g)" />
        </pattern>
        <radialGradient id="kg-wall-shade" cx="800" cy="560" r="1000" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffcf6a" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#001018" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="kg-warm">
          <stop offset="0" stopColor="#ffd77a" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffb52e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffb52e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kg-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3c8" />
          <stop offset="0.5" stopColor="#ffcd52" />
          <stop offset="1" stopColor="#f0a000" />
        </linearGradient>
        <linearGradient id="kg-awning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a8bb2" />
          <stop offset="1" stopColor={BLUE_DEEP} />
        </linearGradient>
        <linearGradient id="kg-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#02303f" />
          <stop offset="0.35" stopColor="#011d27" />
          <stop offset="1" stopColor="#000c11" />
        </linearGradient>
        <linearGradient id="kg-carpet" gradientUnits="userSpaceOnUse" x1="0" y1={ground} x2="0" y2={ground + 700}>
          <stop offset="0" stopColor="#00627f" />
          <stop offset="1" stopColor="#003347" />
        </linearGradient>
        <linearGradient id="kg-spill" gradientUnits="userSpaceOnUse" x1="0" y1={ground} x2="0" y2={ground + 420}>
          <stop offset="0" stopColor="#ffd67a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffd67a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="kg-marble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf4e6" />
          <stop offset="1" stopColor="#cbbd9f" />
        </linearGradient>
        <radialGradient id="kg-topiary" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#3f9a5c" />
          <stop offset="0.6" stopColor="#1d5c35" />
          <stop offset="1" stopColor="#0d3520" />
        </radialGradient>
        <linearGradient id="kg-glass-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="kg-drop" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
        </filter>

        <symbol id="kg-mini-cone" viewBox="0 0 40 70">
          <path d="M8 30 L32 30 L20 68 Z" fill="#c98a45" />
          <path d="M11 36 L29 36 M13 44 L27 44 M15 52 L25 52" stroke="#9c6229" strokeWidth="1.5" />
          <circle cx="20" cy="22" r="13" fill="#fff4dc" />
          <path d="M9 22 Q14 30 20 24 Q26 30 31 22" fill="#5a2a12" />
          <circle cx="20" cy="10" r="4" fill="#e04a5f" />
        </symbol>
        <symbol id="kg-mini-pop" viewBox="0 0 30 70">
          <rect x="3" y="2" width="24" height="46" rx="11" fill="#f7941d" />
          <rect x="6" y="6" width="5" height="34" rx="2.5" fill="#ffd08a" opacity="0.7" />
          <rect x="12" y="46" width="6" height="22" rx="3" fill="#e9c58c" />
        </symbol>
        <symbol id="kg-mini-bar" viewBox="0 0 30 70">
          <rect x="3" y="2" width="24" height="46" rx="9" fill="#4a2410" />
          <circle cx="10" cy="14" r="2" fill="#d9a066" />
          <circle cx="19" cy="24" r="2" fill="#d9a066" />
          <circle cx="11" cy="34" r="2" fill="#d9a066" />
          <rect x="12" y="46" width="6" height="22" rx="3" fill="#e9c58c" />
        </symbol>
      </defs>

      {/* ── Wall with doorway cut-out ── */}
      <path
        fill="url(#kg-flute)"
        d={`M${-EXT} ${-EXT} H${STAGE_W + EXT} V${ground} H${doorR} V${holeTop} H${doorL} V${ground} H${-EXT} Z`}
      />
      <path
        fill="url(#kg-wall-shade)"
        d={`M${-EXT} ${-EXT} H${STAGE_W + EXT} V${ground} H${doorR} V${holeTop} H${doorL} V${ground} H${-EXT} Z`}
      />
      <rect x={-EXT} y={-EXT} width={STAGE_W + EXT * 2} height={EXT + 14} fill="#012836" />

      {/* cornice + dentils */}
      <rect x={-EXT} y={14} width={STAGE_W + EXT * 2} height={28} fill="url(#kg-gold)" />
      <rect x={-EXT} y={42} width={STAGE_W + EXT * 2} height={8} fill="#002f3f" />
      {Array.from({ length: Math.ceil((STAGE_W + EXT * 2) / 26) }, (_, i) => (
        <rect key={i} x={-EXT + i * 26 + 5} y={50} width={14} height={12} fill="#d6a12a" opacity={0.85} />
      ))}

      {/* pilasters */}
      {[150, 1410].map((x) => (
        <g key={x}>
          <rect x={x} y={62} width={40} height={ground - 62} fill="#003d51" />
          <rect x={x + 6} y={62} width={3} height={ground - 62} fill="#d6a12a" opacity={0.7} />
          <rect x={x + 31} y={62} width={3} height={ground - 62} fill="#d6a12a" opacity={0.7} />
          <rect x={x - 8} y={62} width={56} height={14} fill="url(#kg-gold)" />
          <rect x={x - 8} y={ground - 22} width={56} height={22} fill="url(#kg-gold)" />
        </g>
      ))}

      {/* ── Sign ── */}
      <ellipse cx={800} cy={190} rx={300} ry={150} fill="url(#kg-warm)" opacity={0.42} />
      <line x1={700} y1={62} x2={700} y2={120} stroke="url(#kg-gold-h)" strokeWidth={5} />
      <line x1={900} y1={62} x2={900} y2={120} stroke="url(#kg-gold-h)" strokeWidth={5} />
      <image href={logoSrc} x={630} y={76} width={340} height={221} preserveAspectRatio="xMidYMid meet" filter="url(#kg-drop)" />

      {/* ── Windows ── */}
      {[250, 1070].map((x, i) => (
        <ShopWindow key={x} x={x} label={i === 0 ? "Handcrafted" : "Made with Milk"} />
      ))}

      {/* ── Awning ── */}
      <rect x={200} y={392} width={1200} height={44} fill="#000" opacity={0.28} style={{ filter: "blur(6px)" }} />
      <polygon points="232,300 1368,300 1400,352 200,352" fill="url(#kg-awning)" />
      {Array.from({ length: 19 }, (_, i) => (
        <polygon
          key={i}
          points={`${262 + i * 60},300 ${290 + i * 60},300 ${292 + i * 60.7},352 ${262 + i * 60.7},352`}
          fill="#fff"
          opacity={0.05}
        />
      ))}
      <rect x={226} y={296} width={1148} height={6} rx={3} fill="url(#kg-gold)" />
      <rect x={200} y={352} width={1200} height={34} fill={BLUE_DEEP} />
      <rect x={200} y={352} width={1200} height={3} fill="url(#kg-gold-h)" />
      <path d={scallopPath(200, 1400, 404, 20)} fill={BLUE_DEEP} stroke="#e9b53a" strokeWidth={2.5} />
      <text
        x={800}
        y={376}
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize={17}
        fontWeight={700}
        letterSpacing={7}
        fill="#f7cf5a"
        style={{ whiteSpace: "pre" }}
      >
        {awningText}
      </text>

      {/* ── Sconces ── */}
      {[578, 1022].map((x) => (
        <g key={x}>
          <circle cx={x} cy={478} r={95} fill="url(#kg-warm)" opacity={0.6} />
          <rect x={x - 9} y={500} width={18} height={30} rx={4} fill="url(#kg-gold)" />
          <path d={`M${x} 500 V488`} stroke="#d6a12a" strokeWidth={3} />
          <path d={`M${x - 14} 452 L${x + 14} 452 L${x + 11} 490 L${x - 11} 490 Z`} fill="#ffe7a1" stroke="url(#kg-gold)" strokeWidth={3} />
          <path d={`M${x - 17} 452 L${x} 438 L${x + 17} 452 Z`} fill="url(#kg-gold)" />
          <circle cx={x} cy={472} r={6} fill="#fff8e1" />
        </g>
      ))}

      {/* ── Door frame + transom with the King sunrise ── */}
      <rect x={doorL} y={holeTop} width={DOOR.w} height={DOOR.y - holeTop} fill="rgba(0,36,50,0.55)" />
      <g transform={`translate(800 ${DOOR.y - 4})`}>
        {Array.from({ length: 9 }, (_, i) => {
          const a = Math.PI + (Math.PI * (i + 0.5)) / 9
          return (
            <line
              key={i}
              x1={Math.cos(a) * 34}
              y1={Math.sin(a) * 34}
              x2={Math.cos(a) * 60}
              y2={Math.sin(a) * 60}
              stroke={YELLOW}
              strokeWidth={5}
              strokeLinecap="round"
            />
          )
        })}
        <path d="M-26 0 A26 26 0 0 1 26 0" fill="none" stroke={YELLOW} strokeWidth={6} />
        <path d="M-14 0 A14 14 0 0 1 14 0" fill="none" stroke={YELLOW} strokeWidth={5} />
      </g>
      <rect x={doorL} y={holeTop} width={DOOR.w} height={DOOR.y - holeTop} fill="url(#kg-glass-shine)" />
      <rect x={doorL - 12} y={DOOR.y - 6} width={DOOR.w + 24} height={8} fill="url(#kg-gold)" />
      <rect x={doorL - 12} y={holeTop - 12} width={12} height={ground - holeTop + 12} fill="url(#kg-gold-h)" />
      <rect x={doorR} y={holeTop - 12} width={12} height={ground - holeTop + 12} fill="url(#kg-gold-h)" />
      <rect x={doorL - 12} y={holeTop - 12} width={DOOR.w + 24} height={12} fill="url(#kg-gold)" />
      <rect x={doorL - 16} y={holeTop - 16} width={DOOR.w + 32} height={ground - holeTop + 16} fill="none" stroke="#001e29" strokeWidth={4} />

      {/* ── Topiaries ── */}
      {[575, 1025].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={ground + 2} rx={36} ry={6} fill="#000" opacity={0.45} />
          <rect x={x - 3} y={752} width={6} height={70} fill="#5b3a1c" />
          <circle cx={x} cy={735} r={40} fill="url(#kg-topiary)" />
          <circle cx={x} cy={735} r={40} fill="url(#kg-warm)" opacity={0.18} />
          <path d={`M${x - 28} 818 H${x + 28} L${x + 22} ${ground} H${x - 22} Z`} fill="url(#kg-gold)" />
          <rect x={x - 32} y={812} width={64} height={9} rx={2} fill="url(#kg-gold)" />
        </g>
      ))}

      {/* ── Floor, step, carpet ── */}
      <rect x={-EXT} y={ground} width={STAGE_W + EXT * 2} height={EXT} fill="url(#kg-floor)" />
      <ellipse cx={390} cy={ground + 40} rx={190} ry={34} fill="url(#kg-warm)" opacity={0.28} />
      <ellipse cx={1210} cy={ground + 40} rx={190} ry={34} fill="url(#kg-warm)" opacity={0.28} />
      <polygon points={`640,${ground + 14} 960,${ground + 14} 2052,2600 -452,2600`} fill="url(#kg-carpet)" />
      <line x1={654} y1={ground + 14} x2={-420} y2={2600} stroke="#e9b53a" strokeWidth={5} />
      <line x1={946} y1={ground + 14} x2={2020} y2={2600} stroke="#e9b53a" strokeWidth={5} />
      <line x1={668} y1={ground + 14} x2={-388} y2={2600} stroke="#e9b53a" strokeWidth={2} opacity={0.7} />
      <line x1={932} y1={ground + 14} x2={1988} y2={2600} stroke="#e9b53a" strokeWidth={2} opacity={0.7} />
      <polygon
        ref={floorLightRef}
        points={`${doorL},${ground} ${doorR},${ground} 1480,${ground + 520} 120,${ground + 520}`}
        fill="url(#kg-spill)"
        opacity={0}
      />
      <rect x={604} y={ground} width={392} height={14} fill="url(#kg-marble)" />
      <rect x={604} y={ground + 14} width={392} height={4} fill="#8c7d63" />
    </svg>
  )
}

function ShopWindow({ x, label }: { x: number; label: string }) {
  const w = 280
  const top = 440
  const spring = 580
  const bottom = 770
  const arch = `M${x} ${bottom} V${spring} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${spring} V${bottom} Z`
  const items = ["kg-mini-cone", "kg-mini-pop", "kg-mini-bar", "kg-mini-cone", "kg-mini-pop", "kg-mini-bar"]
  return (
    <g>
      <ellipse cx={x + w / 2} cy={620} rx={230} ry={220} fill="url(#kg-warm)" opacity={0.35} />
      <path d={arch} fill="url(#kg-window)" />
      {/* display shelves */}
      {[690, 755].map((y, row) => (
        <g key={y}>
          {items.slice(row * 3, row * 3 + 3).concat(items.slice(row * 3, row * 3 + 2)).map((id, i) => (
            <use key={i} href={`#${id}`} x={x + 22 + i * 50} y={y - 62} width={id === "kg-mini-cone" ? 34 : 26} height={60} />
          ))}
          <rect x={x} y={y - 2} width={w} height={5} fill="url(#kg-gold)" />
        </g>
      ))}
      <text x={x + w / 2} y={560} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontWeight={600} fontSize={26} fill="#a86a00">
        {label}
      </text>
      {/* glazing bars */}
      <line x1={x} y1={spring} x2={x + w} y2={spring} stroke="url(#kg-gold-h)" strokeWidth={5} />
      <line x1={x + w / 2} y1={spring} x2={x + w / 2} y2={bottom} stroke="url(#kg-gold-h)" strokeWidth={5} />
      <path d={arch} fill="url(#kg-glass-shine)" />
      <path d={arch} fill="none" stroke="url(#kg-gold)" strokeWidth={10} />
      <path d={arch} fill="none" stroke="#001e29" strokeWidth={2} transform={`translate(0 0)`} opacity={0.6} />
      {/* sill + bulkhead */}
      <rect x={x - 12} y={bottom} width={w + 24} height={14} fill="url(#kg-gold)" />
      <rect x={x} y={bottom + 14} width={w} height={96} fill="#003d51" />
      <rect x={x + 16} y={bottom + 28} width={w - 32} height={68} fill="none" stroke="#d6a12a" strokeWidth={2.5} opacity={0.85} />
    </g>
  )
}

// ─────────────────────────────────────────────────────────────
// Parlour interior (1600 × 1000 units)
// ─────────────────────────────────────────────────────────────
function Parlour() {
  const wave = "M-800 770 C -600 700, -400 820, -200 760 S 200 700, 400 770 S 800 840, 1000 760 S 1400 690, 1600 770 S 2000 830, 2400 760 L 2400 2200 L -800 2200 Z"
  const stripe = "M-800 830 C -600 770, -400 880, -200 822 S 200 770, 400 834 S 800 900, 1000 824 S 1400 760, 1600 834 S 2000 890, 2400 824"
  return (
    <svg viewBox={`0 0 ${INT_W} ${INT_H}`} width={INT_W} height={INT_H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <defs>
        <radialGradient id="ki-wall" cx="800" cy="430" r="1100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffdb6e" />
          <stop offset="0.45" stopColor={YELLOW} />
          <stop offset="1" stopColor="#d98e00" />
        </radialGradient>
        <linearGradient id="ki-niche" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0bd" />
          <stop offset="1" stopColor="#ffc93d" />
        </linearGradient>
        <radialGradient id="ki-glow">
          <stop offset="0" stopColor="#fff6d6" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffe08a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ki-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset="0.35" stopColor="#f9c846" />
          <stop offset="0.7" stopColor="#c98a00" />
          <stop offset="1" stopColor="#f7cf5a" />
        </linearGradient>
        <path id="ki-seal-top" d="M-55.5 22.5 A60 60 0 1 1 55.5 22.5" />
      </defs>

      {/* back wall */}
      <rect x={-1200} y={-1200} width={INT_W + 2400} height={INT_H + 2400} fill="url(#ki-wall)" />
      {/* wall panels */}
      {[
        [70, 170],
        [1190, 170],
      ].map(([x, y]) => (
        <g key={x} opacity={0.55}>
          <rect x={x} y={y} width={340} height={520} rx={14} fill="none" stroke="#d48c00" strokeWidth={4} />
          <rect x={x + 18} y={y + 18} width={304} height={484} rx={8} fill="none" stroke="#ffe08a" strokeWidth={2} />
        </g>
      ))}
      {/* crown frieze */}
      <rect x={-1200} y={92} width={INT_W + 2400} height={6} fill="#d48c00" opacity={0.5} />

      {/* arched display niche */}
      <path d="M548 780 V400 A252 252 0 0 1 1052 400 V780 Z" fill="#c98000" opacity={0.35} transform="translate(0 10)" />
      <path d="M548 780 V400 A252 252 0 0 1 1052 400 V780 Z" fill="url(#ki-niche)" />
      <path d="M548 780 V400 A252 252 0 0 1 1052 400 V780 Z" fill="none" stroke="url(#ki-gold)" strokeWidth={10} />
      <ellipse cx={800} cy={420} rx={260} ry={240} fill="url(#ki-glow)" opacity={0.8} />

      {/* pendant lamps */}
      {[320, 1280].map((x) => (
        <g key={x}>
          <line x1={x} y1={-1200} x2={x} y2={150} stroke="#6b4500" strokeWidth={3} />
          <ellipse cx={x} cy={250} rx={170} ry={150} fill="url(#ki-glow)" opacity={0.85} />
          <path d={`M${x - 62} 210 A62 60 0 0 1 ${x + 62} 210 Z`} fill="url(#ki-gold)" />
          <rect x={x - 66} y={206} width={132} height={8} rx={4} fill="#b77a00" />
          <ellipse cx={x} cy={216} rx={34} ry={9} fill="#fffbe8" />
        </g>
      ))}

      {/* ice creams on a milk splash */}
      <g className="king-hero-float" style={{ transformOrigin: "800px 520px" }}>
        <g transform="translate(500 250)">
          <IceCreamTrio />
        </g>
      </g>

      {/* sparkles */}
      {SPARKLES.map(([x, y, r, d], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fff7d1" className="king-hero-twinkle" style={{ animationDelay: `${d}s` }} />
      ))}

      {/* brand wave counter */}
      <path d={wave} fill={BLUE} />
      <path d={stripe} fill="none" stroke={YELLOW} strokeWidth={12} />
      <path d={stripe} fill="none" stroke="#ffd56b" strokeWidth={2} transform="translate(0 -5)" opacity={0.7} />
      {[
        [140, 735, 13],
        [205, 712, 8],
        [960, 735, 10],
        [1500, 742, 12],
        [1450, 715, 7],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={BLUE} />
      ))}

      {/* "goodness of milk" seal */}
      <g transform="translate(1330 650)">
        <circle r={84} fill="url(#ki-gold)" />
        <circle r={72} fill={BLUE_DEEP} />
        <circle r={72} fill="none" stroke="#fff1b8" strokeWidth={2} />
        <text fontFamily={SANS} fontWeight={800} fontSize={11} letterSpacing={2} fill="#ffd769">
          <textPath href="#ki-seal-top" startOffset="50%" textAnchor="middle">
            MADE WITH GOODNESS OF
          </textPath>
        </text>
        <path d="M0 -26 C 10 -12, 18 -2, 18 8 A18 18 0 0 1 -18 8 C -18 -2, -10 -12, 0 -26 Z" fill="#fffdf6" />
        <text y={52} textAnchor="middle" fontFamily={SERIF} fontWeight={800} fontSize={24} letterSpacing={3} fill="#fff">
          MILK
        </text>
      </g>
    </svg>
  )
}

const SPARKLES: [number, number, number, number][] = [
  [470, 300, 3, 0],
  [1120, 260, 2.5, 0.8],
  [600, 160, 2, 1.6],
  [1010, 520, 3, 0.4],
  [430, 560, 2, 2.1],
  [1180, 600, 2.5, 1.2],
  [760, 120, 2, 2.6],
  [880, 210, 3, 1.9],
]

function IceCreamTrio() {
  // Drawn in a 600 × 520 box: orange popsicle, chocolate cone, choco-nut bar.
  const nuts: [number, number, number][] = [
    [-30, -80, 5],
    [12, -60, 4],
    [-14, -30, 6],
    [26, -10, 4],
    [-34, 6, 5],
    [8, 26, 6],
    [-20, 50, 4],
    [30, 54, 5],
    [-6, 80, 5],
    [22, -96, 4],
  ]
  return (
    <g>
      <defs>
        <linearGradient id="ic-orange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffc35a" />
          <stop offset="0.5" stopColor="#f7941d" />
          <stop offset="1" stopColor="#d97400" />
        </linearGradient>
        <linearGradient id="ic-choco" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a4424" />
          <stop offset="0.45" stopColor="#4f2712" />
          <stop offset="1" stopColor="#2b1206" />
        </linearGradient>
        <linearGradient id="ic-cone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f0bd72" />
          <stop offset="0.6" stopColor="#d9974c" />
          <stop offset="1" stopColor="#a96a2c" />
        </linearGradient>
        <linearGradient id="ic-cream" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#e9d3ad" />
        </linearGradient>
        <linearGradient id="ic-stick" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3d7a6" />
          <stop offset="1" stopColor="#d2ab6c" />
        </linearGradient>
        <pattern id="ic-waffle" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="18" height="18" fill="none" />
          <path d="M0 0 H18 M0 0 V18" stroke="#9a5e24" strokeWidth="2.4" opacity="0.75" />
        </pattern>
        <clipPath id="ic-cone-clip">
          <path d="M238 250 L362 250 L300 505 Z" />
        </clipPath>
        <mask id="ic-bite">
          <rect x="-100" y="-160" width="200" height="340" fill="#fff" />
          <circle cx="48" cy="-112" r="26" fill="#000" />
          <circle cx="20" cy="-128" r="22" fill="#000" />
          <circle cx="62" cy="-82" r="20" fill="#000" />
        </mask>
        <filter id="ic-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#7a4a00" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* milk splash */}
      <path
        d="M40 430 C 70 360, 120 400, 150 330 C 170 380, 200 370, 230 300 C 250 350, 280 345, 300 280 C 320 345, 350 350, 370 300 C 400 370, 430 380, 450 330 C 480 400, 530 360, 560 430 C 520 480, 80 480, 40 430 Z"
        fill="#fffdf6"
        opacity={0.95}
      />
      {[
        [150, 300, 8],
        [232, 262, 6],
        [372, 262, 7],
        [452, 296, 6],
        [100, 360, 5],
        [512, 360, 5],
        [300, 244, 5],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fffdf6" />
      ))}

      {/* orange popsicle */}
      <g transform="translate(170 270) rotate(-24)" filter="url(#ic-shadow)">
        <rect x={-14} y={88} width={28} height={92} rx={12} fill="url(#ic-stick)" />
        <rect x={-62} y={-130} width={124} height={230} rx={52} fill="url(#ic-orange)" />
        <rect x={-46} y={-108} width={16} height={170} rx={8} fill="#ffe0a8" opacity={0.55} />
      </g>

      {/* choco-nut bar with a bite */}
      <g transform="translate(430 270) rotate(22)" filter="url(#ic-shadow)">
        <rect x={-14} y={88} width={28} height={92} rx={12} fill="url(#ic-stick)" />
        <g mask="url(#ic-bite)">
          <rect x={-62} y={-130} width={124} height={230} rx={40} fill="url(#ic-choco)" />
          {nuts.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "#d9a066" : "#f0c58c"} />
          ))}
          <rect x={-48} y={-110} width={12} height={170} rx={6} fill="#fff" opacity={0.12} />
        </g>
        <path d="M24 -106 C 34 -90, 48 -88, 56 -64" fill="none" stroke="#9a5a2c" strokeWidth={6} strokeLinecap="round" />
      </g>

      {/* chocolate cone (front) */}
      <g filter="url(#ic-shadow)">
        <path d="M238 250 L362 250 L300 505 Z" fill="url(#ic-cone)" />
        <rect x={238} y={250} width={124} height={260} fill="url(#ic-waffle)" clipPath="url(#ic-cone-clip)" />
        <rect x={230} y={240} width={140} height={24} rx={12} fill="#c4813d" />
        <rect x={232} y={242} width={136} height={6} rx={3} fill="#e7b072" />
        {/* swirl */}
        <path
          d="M226 246 C 214 210, 240 190, 262 196 C 252 160, 300 140, 318 162 C 336 132, 380 156, 366 192 C 392 198, 388 236, 374 246 Z"
          fill="url(#ic-cream)"
        />
        <path d="M262 196 C 286 206, 320 200, 340 186" fill="none" stroke="#d8bd8f" strokeWidth={4} strokeLinecap="round" />
        <path d="M250 228 C 280 236, 330 236, 360 222" fill="none" stroke="#d8bd8f" strokeWidth={4} strokeLinecap="round" />
        {/* chocolate drizzle */}
        <path
          d="M236 214 C 252 230, 262 196, 280 214 C 296 232, 304 176, 322 198 C 338 220, 348 168, 364 206"
          fill="none"
          stroke="#3b1a09"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path d="M280 214 L282 238 M322 198 L320 228 M252 222 L250 240" stroke="#3b1a09" strokeWidth={7} strokeLinecap="round" />
        <path d="M244 210 C 256 220, 266 194, 282 208" fill="none" stroke="#8a4b25" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
        {[
          [270, 176, 0],
          [302, 160, 30],
          [334, 178, -20],
          [292, 190, 60],
          [352, 196, 10],
        ].map(([x, y, r], i) => (
          <rect key={i} x={x - 5} y={y - 4} width={10} height={8} rx={2} fill="#c68b4e" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    </g>
  )
}

const KEYFRAMES = `
@keyframes king-hero-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50% { transform: translateY(5px); opacity: 1; }
}
@keyframes king-hero-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes king-hero-twinkle {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 1; }
}
.king-hero-float { animation: king-hero-float 5s ease-in-out infinite; }
.king-hero-twinkle { animation: king-hero-twinkle 2.8s ease-in-out infinite; }
.king-hero-btn {
  display: inline-flex; align-items: center; gap: 10px;
  height: 52px; padding: 0 26px; border-radius: 999px;
  font-family: ${SANS}; font-size: 15px; font-weight: 700; letter-spacing: 0.02em;
  text-decoration: none; transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}
.king-hero-btn:hover { transform: translateY(-2px); }
.king-hero-btn:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
.king-hero-btn--primary {
  background: ${GOLD_CSS}; color: ${BLUE_DEEP};
  box-shadow: 0 10px 30px rgba(0,40,55,0.35), inset 0 1px 0 rgba(255,255,255,0.6);
}
.king-hero-btn--primary:hover { box-shadow: 0 14px 36px rgba(0,40,55,0.45), inset 0 1px 0 rgba(255,255,255,0.6); }
.king-hero-btn--ghost {
  color: #fff; border: 1.5px solid rgba(255,241,184,0.75); background: rgba(0,70,94,0.35);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
}
.king-hero-btn--ghost:hover { background: rgba(0,70,94,0.6); }
.king-hero-skip {
  position: absolute; right: clamp(12px, 2.5vw, 24px); bottom: clamp(14px, 2.4vw, 22px); z-index: 3;
  font-family: ${SANS}; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(255,246,227,0.75); background: rgba(0,30,42,0.35); border: 1px solid rgba(255,241,184,0.35);
  border-radius: 999px; padding: 8px 14px; cursor: pointer; transition: opacity .4s ease, color .2s ease;
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
}
.king-hero-skip:hover { color: #fff; }
@media (max-width: 480px) {
  .king-hero-btn { height: 46px; padding: 0 18px; font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .king-hero-float, .king-hero-twinkle { animation: none; }
}
`
