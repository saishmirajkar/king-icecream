import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import { blogPosts } from "@/lib/blog-posts";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import { Reveal, RevealTitle } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/interactive";
import { SpinBadge, Sprinkles } from "@/components/motion/decor";

const BASE_URL = "https://www.kingicecream.com";

export const metadata: Metadata = {
  title: "The King Journal — Stories from Belagavi's Dairy",
  description:
    "News, stories and behind-the-scenes from King Ice Cream — awards, farmer stories, brand history, events across Karnataka, Goa, Maharashtra and Kerala.",
  openGraph: {
    title: "The King Journal — Stories from Belagavi's Dairy",
    description:
      "News, stories and behind-the-scenes from King Ice Cream — awards, farmer stories, brand history and events.",
    url: `${BASE_URL}/blog`,
    images: [
      {
        url: "/images/logos/king logo.png",
        width: 1200,
        height: 630,
        alt: "The King Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The King Journal — Stories from Belagavi's Dairy",
    description:
      "News, stories and behind-the-scenes from King Ice Cream.",
  },
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featured, ...rest] = sorted;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The King Journal",
    url: `${BASE_URL}/blog`,
    description:
      "News, stories and behind-the-scenes from King Ice Cream — a brand of Vijaykant Dairy & Food Products Ltd., Belagavi.",
    publisher: {
      "@type": "Organization",
      name: "King Ice Cream",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logos/king logo.png`,
      },
    },
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <main className="king-interior min-h-[100dvh]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="king-page-hero bg-[#00799b] text-[#fff8e6]">
        <Sprinkles count={14} seed={51} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-50" />
        <div className="king-shell relative z-10">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#ffbf31]">The King Journal</Reveal>
          <RevealTitle as="h1" className="king-page-title max-w-5xl" lines={["Stories from", <em key="b">Belagavi’s dairy.</em>]} gap={0.12} />
          <Reveal delay={0.3}><p className="king-prose mt-8 max-w-2xl text-[#fff8e6]/80">
            News, history and behind-the-scenes from King Ice Cream — the brand,
            the plant, the farmers and the events that keep us busy.
          </p></Reveal>
        </div>
        <div className="king-spin-slow absolute -bottom-32 -right-24 h-[36vw] w-[36vw] rounded-full border-[3rem] border-dashed border-[#ffbf31]/20" aria-hidden="true" />
        <SpinBadge text={`${blogPosts.length} stories • Fresh from the dairy • `} className="absolute bottom-[14%] right-[10%] z-10 hidden h-32 w-32 bg-[#ffbf31] text-[#073c50] shadow-[6px_8px_0_rgba(4,55,72,.25)] lg:grid">
          <span className="king-display text-4xl leading-none">{String(blogPosts.length).padStart(2, "0")}</span>
        </SpinBadge>
      </section>

      {/* Featured post */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="py-20 md:py-28">
        <div className="king-shell">
          <Reveal as="span" className="king-page-kicker king-eyebrow mb-8 text-[#00799b]">Latest</Reveal>

          <Reveal y={60}><Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 items-center gap-8 rounded-[2rem] bg-[#ffcf4f] p-4 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(7,60,80,.16)] md:grid-cols-2 md:gap-12 md:p-8"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#c9e4ef]">
              <Parallax speed={30} className="absolute inset-[-8%]"><Image
                src={featured.coverImage}
                alt={featured.coverAlt}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              /></Parallax>
              <span className="king-page-kicker absolute left-4 top-4 rounded-full bg-[#fff8e6] px-4 py-2 text-[#00799b]">
                {featured.category}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{featured.readTime}</span>
              </div>
              <h2 className="king-section-title mb-4 transition-colors group-hover:text-[#00799b]">
                {featured.title}
              </h2>
              {featured.subtitle && (
                <p className="mb-5 text-lg font-semibold leading-relaxed text-[#073c50]/75">
                  {featured.subtitle}
                </p>
              )}
              <p className="king-prose mb-6">
                {featured.excerpt}
              </p>
              <span className="king-pill king-pill--teal">
                Read the story
                <span className="h-[2px] w-8 bg-current transition-all duration-500 group-hover:w-12" />
              </span>
            </div>
          </Link></Reveal>
        </div>
      </section>

      {/* Scroll-driven archive */}
      <HomeSectionDivider from="#fff8e6" to="#c9e4ef" />
      <section id="more-stories" className="king-more-stories bg-[#c9e4ef] py-20 md:py-28">
        <div className="king-shell mb-9"><Reveal as="p" className="king-page-kicker king-eyebrow mb-4 text-[#00799b]">The archive</Reveal><RevealTitle className="king-section-title" lines={["More stories."]} /></div>
        <ScrollingFeatureShowcase stories={rest.map(({ slug, title, excerpt, coverImage, coverAlt, category, date, readTime }) => ({ slug, title, excerpt, coverImage, coverAlt, category, date, readTime }))} />
      </section>

      <Footer transitionFrom="#c9e4ef" />
    </main>
  );
}
