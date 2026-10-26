"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { usePageScroll } from "@/components/LenisProvider";

type StoryStyle = CSSProperties & {
  "--panel-index"?: number;
};

export type ScrollingStory = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  category: string;
  date: string;
  readTime: string;
};

function formatStoryDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function ScrollingFeatureShowcase({
  stories,
}: {
  stories: ScrollingStory[];
}) {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const scrollTo = usePageScroll();

  const updateActiveStory = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || stories.length <= 1) {
        setActiveIndex(0);
        return;
      }
      const stickyTop = window.innerWidth <= 600 ? 72 : 88;
      const step = Math.max(1, track.querySelector<HTMLElement>(".story-interval")?.getBoundingClientRect().height || window.innerHeight - stickyTop);
      const trackStart = window.scrollY + track.getBoundingClientRect().top;
      const progress = window.scrollY - (trackStart - stickyTop);
      const nextIndex = Math.max(
        0,
        Math.min(stories.length - 1, Math.floor(Math.max(0, progress) / step)),
      );
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
    });
  }, [stories.length]);

  useEffect(() => {
    if (!stories.length) return;
    updateActiveStory();
    window.addEventListener("scroll", updateActiveStory, { passive: true });
    window.addEventListener("resize", updateActiveStory, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveStory);
      window.removeEventListener("resize", updateActiveStory);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [stories.length, updateActiveStory]);

  const jumpToStory = (index: number) => {
    const track = trackRef.current;
    if (!track || !stories.length) return;
    const stickyTop = window.innerWidth <= 600 ? 72 : 88;
    const step = Math.max(1, track.querySelector<HTMLElement>(".story-interval")?.getBoundingClientRect().height || window.innerHeight - stickyTop);
    const trackStart = window.scrollY + track.getBoundingClientRect().top;
    // Use the site's controller so a click also cancels any unfinished wheel
    // movement. One extra pixel avoids rounding into the preceding story.
    scrollTo(
      Math.max(0, trackStart - stickyTop + index * step + 1),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  };

  if (!stories.length) {
    return (
      <div className="king-shell story-empty">
        <p>There are no more stories in the journal just yet.</p>
      </div>
    );
  }

  const currentIndex = Math.min(activeIndex, stories.length - 1);
  const activeStory = stories[currentIndex];

  return (
    <div className={`king-shell story-showcase${stories.length === 1 ? " is-single" : ""}`}>
      <div className="story-motion">
        <section
          className="story-track"
          id="story-scroll-panel"
          ref={trackRef}
          aria-label="More stories from the King Journal"
        >
          <div className="story-stage">
            <div className="story-split">
              <div className="story-copy-side">
                <div className="story-copy-topline">
                  <span className="story-collection-label">From the journal</span>
                  <span className="story-counter" aria-live="polite">
                    {String(currentIndex + 1).padStart(2, "0")}
                    <span aria-hidden="true"> / </span>
                    {String(stories.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="story-copy-stack">
                  {stories.map((story, index) => (
                    <article
                      className={`story-copy ${index === currentIndex ? "is-active" : ""}`}
                      key={story.slug}
                      aria-hidden={index !== currentIndex}
                      inert={index !== currentIndex}
                    >
                      <div className="story-meta">
                        <span className="story-category">{story.category}</span>
                        <span className="story-meta-dot" aria-hidden="true" />
                        <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
                        <span className="story-meta-dot" aria-hidden="true" />
                        <span>{story.readTime}</span>
                      </div>
                      <h3>{story.title}</h3>
                      <p>{story.excerpt}</p>
                      <Link className="story-read-link" href={`/blog/${story.slug}`}>
                        Read this story <ArrowDownRight size={17} strokeWidth={2.5} aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
                </div>

                <div className="story-controls">
                  <div className="story-pagination" aria-label="Choose a story">
                    {stories.map((story, index) => (
                      <button
                        className={`story-step ${index === currentIndex ? "is-active" : ""}`}
                        type="button"
                        key={story.slug}
                        aria-label={`Show story ${index + 1}: ${story.title}`}
                        aria-current={index === currentIndex ? "step" : undefined}
                        data-testid={`story-select-${story.slug}`}
                        onClick={() => jumpToStory(index)}
                      >
                        <span className="sr-only">{story.title}</span>
                      </button>
                    ))}
                  </div>
                  <div className="story-control-arrows">
                    <button
                      type="button"
                      className="story-arrow"
                      aria-label="Previous story"
                      disabled={currentIndex === 0}
                      onClick={() => jumpToStory(Math.max(0, currentIndex - 1))}
                    >
                      <ArrowLeft size={17} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="story-arrow story-arrow-next"
                      aria-label="Next story"
                      disabled={currentIndex === stories.length - 1}
                      onClick={() => jumpToStory(Math.min(stories.length - 1, currentIndex + 1))}
                    >
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="story-image-side" role="img" aria-label={failedImages[activeStory.slug] ? `Image unavailable: ${activeStory.coverAlt}` : activeStory.coverAlt}>
                <div className="story-image-track" style={{ transform: `translate3d(0, -${currentIndex * 100}%, 0)` }}>
                  {stories.map((story, index) => (
                    <div
                      className="story-image-panel"
                      key={story.slug}
                      aria-hidden="true"
                      style={{ "--panel-index": index } as StoryStyle}
                    >
                      {failedImages[story.slug] ? (
                        <div className="story-image-unavailable">
                          <span className="story-image-unavailable-mark" aria-hidden="true">K</span>
                          <span>Image unavailable</span>
                        </div>
                      ) : (
                        <img
                          src={story.coverImage}
                          alt=""
                          loading={index < 2 ? "eager" : "lazy"}
                          onError={() => setFailedImages((previous) => ({ ...previous, [story.slug]: true }))}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="story-image-caption" aria-hidden="true">
                  <span>Belagavi, with love</span>
                  <span className="story-caption-rule" />
                </div>
                <span className="story-image-stamp" aria-hidden="true">KING<br />JOURNAL</span>
              </div>
            </div>
          </div>
          {stories.map((story) => (
            <div className="story-interval" key={`interval-${story.slug}`} aria-hidden="true" />
          ))}
        </section>
      </div>

      <div className="story-static" aria-label="All stories from the King Journal">
        {stories.map((story) => (
          <article className="story-static-card" key={`static-${story.slug}`}>
            <Link href={`/blog/${story.slug}`} className="story-static-image">
              {failedImages[story.slug] ? (
                <span className="story-image-unavailable">
                  <span className="story-image-unavailable-mark" aria-hidden="true">K</span>
                  Image unavailable
                </span>
              ) : (
                <img
                  src={story.coverImage}
                  alt={story.coverAlt}
                  loading="lazy"
                  onError={() => setFailedImages((previous) => ({ ...previous, [story.slug]: true }))}
                />
              )}
            </Link>
            <div className="story-static-copy">
              <div className="story-meta">
                <span className="story-category">{story.category}</span>
                <span className="story-meta-dot" aria-hidden="true" />
                <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
                <span className="story-meta-dot" aria-hidden="true" />
                <span>{story.readTime}</span>
              </div>
              <h3><Link href={`/blog/${story.slug}`}>{story.title}</Link></h3>
              <p>{story.excerpt}</p>
              <Link className="story-read-link" href={`/blog/${story.slug}`}>
                Read this story <ArrowDownRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
