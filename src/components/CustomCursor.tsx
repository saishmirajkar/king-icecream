"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], [data-cursor-text]");
      if (interactive) {
        setIsHovering(true);
        const text = interactive.getAttribute("data-cursor-text") || "View";
        setCursorText(text);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], [data-cursor-text]");
      if (interactive) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    const handlePageLeave = () => setIsVisible(false);
    const handlePageEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mouseleave", handlePageLeave);
    document.addEventListener("mouseenter", handlePageEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseleave", handlePageLeave);
      document.removeEventListener("mouseenter", handlePageEnter);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            x: isHovering ? -40 : -20,
            y: isHovering ? -40 : -20,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <motion.span
            className="text-white text-xs font-sans uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full bg-white mix-blend-difference"
          animate={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            x: isHovering ? 0 : -3,
            y: isHovering ? 0 : -3,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        />
      </motion.div>
    </>
  );
}
