"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionContext } from "@/context/TransitionContext";
import { ReactNode, MouseEvent, AnchorHTMLAttributes } from "react";

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  onBeforeNavigate?: () => void;
}

export function TransitionLink({
  href,
  children,
  className,
  onBeforeNavigate,
  onClick: _onClick,
  ...rest
}: TransitionLinkProps) {
  const { trigger, isTransitioning } = useTransitionContext();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      href.startsWith("#") ||
      pathname === href
    ) {
      return;
    }

    e.preventDefault();

    if (isTransitioning) return;

    onBeforeNavigate?.();
    trigger(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
