import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Cones, Cups, Kulfi, Sticks, Sundaes & Family Packs",
  description:
    "Explore King Ice Cream's full range — Cones, Cups, Kulfi, Sticks, Sundaes, Sip Ups & Family Packs. Made from 100% pure milk, no palm oil. Chocobar, Kesar Pista, Mango Dolly, Matka Kulfi, Gudbud & more. Order on Zomato & Swiggy.",
  openGraph: {
    title: "King Ice Cream Products",
    description: "Browse our royal collection of premium ice creams — Cones, Cups, Kulfi, Sticks, Sundaes & Family Packs. 100% pure milk, zero palm oil.",
    url: "https://www.kingicecream.com/products",
    images: [{ url: "/images/logos/king logo.png", width: 1200, height: 630, alt: "King Ice Cream Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "King Ice Cream Products",
    description: "Cones, Cups, Kulfi, Sticks, Sundaes & Family Packs. 100% pure milk, zero palm oil.",
  },
  alternates: {
    canonical: "https://www.kingicecream.com/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
