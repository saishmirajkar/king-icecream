"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type TransitionType = "curtain" | "columns" | "diagonal" | "fade" | "zoom";

interface TransitionContextType {
  isTransitioning: boolean;
  transitionType: TransitionType;
  trigger: (href: string) => void;
  onNavigate: () => void;
  complete: () => void;
}

// Map routes to transition styles
function getTransitionType(href: string): TransitionType {
  if (href === "/" ) return "zoom";
  if (href === "/products") return "columns";
  if (href === "/aboutus") return "diagonal";
  if (href === "/franchise") return "curtain";
  if (href === "/locate") return "fade";
  if (href === "/contact") return "curtain";
  return "curtain";
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  transitionType: "curtain",
  trigger: () => {},
  onNavigate: () => {},
  complete: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);
  const [transitionType, setTransitionType] = useState<TransitionType>("curtain");

  const trigger = useCallback(
    (href: string) => {
      if (isTransitioning) return;
      setTargetRoute(href);
      setTransitionType(getTransitionType(href));
      setIsTransitioning(true);
    },
    [isTransitioning]
  );

  const onNavigate = useCallback(() => {
    if (targetRoute) {
      router.push(targetRoute);
    }
  }, [targetRoute, router]);

  const complete = useCallback(() => {
    setIsTransitioning(false);
    setTargetRoute(null);
  }, []);

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, transitionType, trigger, onNavigate, complete }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}
