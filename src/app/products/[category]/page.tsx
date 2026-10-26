import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CategorySlider } from "@/components/products/CategorySlider";
import {
  CATEGORY_NAMES,
  categoryFromSlug,
  categorySlug,
} from "@/lib/categories";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function generateStaticParams() {
  return CATEGORY_NAMES.map((name) => ({ category: categorySlug(name) }));
}

type Params = { category: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const name = categoryFromSlug(slug);
  if (!name) {
    return { title: "Category not found | King Ice Cream" };
  }
  return {
    title: `${name} | King Ice Cream`,
    description: `Explore all ${name} from King Ice Cream — premium flavours made with 100% pure milk.`,
    alternates: {
      canonical: `https://www.kingicecream.com/products/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const name = categoryFromSlug(slug);
  if (!name) notFound();

  const products = PlaceHolderImages.filter((p) => p.category === name);

  return (
    <div className="bg-background">
      <Header />
      <main>
        <CategorySlider categoryName={name} products={products} />
      </main>
      <Footer transitionFrom="#00799b" />
    </div>
  );
}
