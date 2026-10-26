import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductsStack } from "@/components/products/ProductsStack";

export const metadata: Metadata = {
  title: "Products | King Ice Cream",
  description:
    "Explore King Ice Cream's range — Cones, Cups, Kulfi, Sticks, Family Packs, Sundaes and Sip Ups.",
};

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <ProductsStack />
      </main>
      <Footer transitionFrom="#00799b" />
    </div>
  );
}
