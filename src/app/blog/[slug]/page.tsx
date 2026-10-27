import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider";
import {
  blogPosts,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  type ContentBlock,
} from "@/lib/blog-posts";
import { Reveal, RevealTitle, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/interactive";
import { Sprinkles } from "@/components/motion/decor";

const BASE_URL = "https://www.kingicecream.com";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const url = `${BASE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: "King Ice Cream",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="king-prose mb-7 text-[#073c50]"
        >
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            key={index}
            className="king-section-title mb-6 mt-14 text-[#073c50]"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          className="mb-4 mt-10 text-2xl font-black leading-tight text-[#073c50] md:text-3xl"
        >
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="my-10 rounded-[1.5rem] border-l-8 border-[#ffbf31] bg-[#c9e4ef] p-6 sm:p-9"
        >
          <p className="text-xl font-black leading-snug text-[#073c50] md:text-3xl">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "list":
      if (block.style === "number") {
        return (
          <ol
            key={index}
            className="king-prose mb-6 list-decimal space-y-2 pl-6 text-[#073c50]"
          >
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul key={index} className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="king-prose flex gap-3 text-[#073c50]"
            >
              <span className="mt-1.5 shrink-0 text-[#00799b]">▪</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside
          key={index}
          className="my-10 rounded-[1.5rem] border-l-8 border-[#00799b] bg-[#ffcf4f] p-6 sm:p-9"
        >
          <p className="king-page-kicker mb-3 text-[#00799b]">
            {block.label}
          </p>
          <p className="king-prose text-[#073c50]">
            {block.text}
          </p>
        </aside>
      );
    case "image":
      return (
        <figure key={index} className="my-8 sm:my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-[#c9e4ef]">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-sans text-xs text-muted-foreground italic text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "embed":
      return (
        <div
          key={index}
          className="my-10 rounded-[1.5rem] bg-[#f8bfd2] p-6 sm:p-9"
        >
          <p className="king-page-kicker mb-3 text-[#00799b]">
            Watch
          </p>
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-bold text-[#073c50] transition-colors hover:text-[#00799b]"
          >
            {block.label}
            <span className="h-[1px] w-8 bg-current" />
          </a>
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "King Ice Cream",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logos/king logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
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
        <Sprinkles count={12} seed={post.slug.length} colors={["#ffbf31", "#f8bfd2", "#fff8e6"]} className="opacity-40" />
        <div className="king-shell relative z-10 max-w-5xl">
          <Reveal><Link
            href="/blog"
            className="group king-page-kicker mb-9 inline-flex items-center gap-3 text-[#ffbf31] transition-colors hover:text-[#fff8e6]"
          >
            <span className="h-[2px] w-6 bg-current transition-all duration-300 group-hover:w-10" />
            The King Journal
          </Link></Reveal>

          <Reveal delay={0.1} className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#fff8e6]/80">
            <span className="font-semibold text-[#ffbf31]">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-background/50" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-background/50" />
            <span>{post.readTime}</span>
          </Reveal>

          <RevealTitle as="h1" className="king-page-title mb-6 max-w-5xl" lines={[post.title]} delay={0.15} />

          {post.subtitle && (
            <Reveal delay={0.3}><p className="max-w-3xl text-lg font-semibold leading-relaxed text-[#fff8e6]/85 md:text-2xl">
              {post.subtitle}
            </p></Reveal>
          )}
        </div>
      </section>

      {/* Cover image */}
      <HomeSectionDivider from="#00799b" to="#fff8e6" />
      <section className="king-shell relative z-10 -mt-10 md:-mt-20">
        <Reveal y={50} scale={0.97} className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.5rem] bg-[#ffcf4f] shadow-[12px_12px_0_rgba(0,121,155,.18)] md:aspect-[21/9] md:rounded-[2rem]">
          <Parallax speed={40} className="absolute inset-[-10%]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </Parallax>
        </Reveal>
      </section>

      {/* Body */}
      <article className="king-shell py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {post.content.map((block, i) => <Reveal key={i} y={block.type === "paragraph" ? 18 : 30}>{renderBlock(block, i)}</Reveal>)}

          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground mr-2 self-center">
                Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#00799b]/30 bg-[#c9e4ef] px-4 py-2 text-xs font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.sources && post.sources.length > 0 && (
            <div className="mt-10 rounded-[1.5rem] bg-[#c9e4ef] p-6 sm:p-8">
              <p className="king-page-kicker mb-4 text-[#00799b]">
                Sources
              </p>
              <ul className="space-y-2.5">
                {post.sources.map((s) => (
                  <li
                    key={s.url}
                    className="font-serif text-sm text-muted-foreground leading-relaxed"
                  >
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-gold transition-colors underline-offset-4 hover:underline"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <>
        <HomeSectionDivider from="#fff8e6" to="#f8bfd2" />
        <section className="bg-[#f8bfd2] py-20 md:py-28">
          <div className="king-shell mb-10">
            <Reveal as="span" className="king-page-kicker king-eyebrow mb-5 text-[#00799b]">Keep Reading</Reveal>
            <RevealTitle className="king-section-title" lines={[<span key="l">More from <em>the journal.</em></span>]} />
          </div>

          <Stagger className="king-shell grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
            {related.map((r) => (
              <StaggerItem key={r.slug}><Tilt className="h-full rounded-[2rem]" max={5}><Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="king-editorial-card group block h-full bg-[#fff8e6] p-5 sm:p-6"
              >
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#c9e4ef]">
                  <Image
                    src={r.coverImage}
                    alt={r.coverAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <span className="king-page-kicker mb-3 text-[#00799b]">
                  {r.category}
                </span>
                <h3 className="text-xl font-black leading-tight transition-colors group-hover:text-[#00799b]">
                  {r.title}
                </h3>
              </Link></Tilt></StaggerItem>
            ))}
          </Stagger>
        </section>
        </>
      )}

      <Footer transitionFrom={related.length > 0 ? "#f8bfd2" : "#fff8e6"} />
    </main>
  );
}
