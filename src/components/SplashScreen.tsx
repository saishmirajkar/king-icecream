"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("king-splash-shown");
      if (!hasVisited) {
        setShowSplash(true);
        sessionStorage.setItem("king-splash-shown", "true");
        const timer = setTimeout(() => {
          setShowSplash(false);
        }, 1800);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!showSplash && !isComplete) {
      const timer = setTimeout(() => setIsComplete(true), 700);
      return () => clearTimeout(timer);
    }
  }, [showSplash, isComplete]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Horizontal lines — top */}
            <motion.div
              className="absolute top-[30%] left-0 right-0 h-[1px] bg-white/[0.06]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute bottom-[30%] left-0 right-0 h-[1px] bg-white/[0.06]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Vertical lines */}
            <motion.div
              className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-white/[0.04]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-white/[0.04]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Gold accent line — center */}
            <motion.div
              className="absolute top-1/2 left-[15%] right-[15%] h-[1px] -translate-y-1/2 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </motion.div>

            {/* Logo */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/logos/king logo.png"
                alt="King Ice Cream"
                width={400}
                height={160}
                className="h-16 sm:h-24 md:h-28 w-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={!isComplete ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
