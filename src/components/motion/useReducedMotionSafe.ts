"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The reader's reduced-motion preference, reported as `false` until after
 * hydration. The server cannot know the preference, so branching on it during
 * the first client render would make the markup diverge from the server HTML.
 */
export function useReducedMotionSafe() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduced;
}
