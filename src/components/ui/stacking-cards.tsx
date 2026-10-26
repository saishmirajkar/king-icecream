"use client";

// Animation adapted from Khoa Phan's stacking cards component:
// https://www.pldkhoa.dev

import {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

interface StackingCardsProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions;
  scaleMultiplier?: number;
  totalCards: number;
}

interface StackingCardItemProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  index: number;
  stickyTop?: string;
}

export default function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  });

  return (
    <StackingCardsContext.Provider value={{ progress: scrollYProgress, scaleMultiplier, totalCards }}>
      <div className={className} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  );
}

const StackingCardItem = ({
  index,
  stickyTop = "0px",
  className,
  children,
  ...props
}: StackingCardItemProps) => {
  const { progress, scaleMultiplier, totalCards = 0 } = useStackingCardsContext();
  const reducedMotion = useReducedMotion();
  const scaleTo = 1 - (totalCards - index) * (scaleMultiplier ?? 0.012);
  const scale = useTransform(
    progress,
    [index * (1 / totalCards), 1],
    reducedMotion ? [1, 1] : [1, scaleTo],
  );

  return (
    <div
      className={`king-stack-item ${reducedMotion ? "is-static" : ""} ${className ?? ""}`}
      style={{ top: reducedMotion ? undefined : stickyTop }}
      {...props}
    >
      <motion.div className={`king-stack-card-inner ${reducedMotion ? "is-static" : ""}`} style={{ scale }}>
        {children}
      </motion.div>
    </div>
  );
};

const StackingCardsContext = createContext<{
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards?: number;
} | null>(null);

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext);
  if (!context) throw new Error("StackingCardItem must be used within StackingCards");
  return context;
};

export { StackingCardItem };
