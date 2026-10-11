# King Ice Cream — scroll-locked storefront hero

Landing-page **Section 1** for King Ice Cream. The visitor lands in front of
the King storefront on a sunny Mediterranean terrace. The bougainvillea,
potted flowers and trees sway in the breeze, the sea ripples and glints,
petals drift down and the lanterns flicker. As they scroll, the gold glass
doors swing open, the camera glides through the doorway, and they arrive
inside a cream-marble and teal parlour where the real King products sit in
arched niches, with the headline and CTAs.

Built on the same scroll-lock / scrub idea as the 21st.dev
`scroll-locked-video-hero` reference, but driven by the storefront artwork
(no video file).

```
components/ui/king-store-hero.tsx           ← the King hero (use this)
components/ui/scroll-locked-video-hero.tsx   ← original reference component
components/demo.tsx                          ← original reference demo
public/store/storefront.webp                 ← storefront artwork, door leaves painted out
public/store/door-left.webp, door-right.webp ← the two door leaves, cut out to swing open
public/store/wind-mask.png                   ← which pixels sway (red = plants) or ripple (green = sea)
public/products/*.webp                       ← product photos, cut out on transparent backgrounds
public/brand/king-logo.png                   ← logo, transparent background (not needed by the hero)
app/page.tsx                                 ← demo landing page (hero + sample sections)
app/reference/page.tsx                       ← the original video hero, for comparison
```

## Run it here

```bash
npm install
npm run dev        # http://localhost:3000   (reference: /reference)
```

## How it behaves

| Scroll progress | What happens |
| --- | --- |
| before scrolling | flowers and trees sway, the sea ripples, petals fall, lanterns flicker |
| 0 – 55 % | camera eases toward the store, the gold glass doors swing inward |
| 40 – 88 % | camera flies through the doorway, a soft golden flash hides the cut |
| 85 – 100 % | parlour settles, headline, sub-copy and CTAs fade in |

* While the hero is at the top of the page, the page **does not scroll**: wheel,
  touch, and keyboard (↓ ↑ PgDn PgUp Space Home) only scrub the scene,
  forwards and backwards.
* When the scene is finished and the visitor keeps scrolling down, the page
  **unlocks** and continues to the next section. Scrolling back to the top
  **re-locks** it and plays the scene in reverse.
* A small **Skip intro** button jumps to the end.
* `prefers-reduced-motion`: no lock, the finished parlour is shown straight away.
* Touch: drag scrubs, with momentum on release.
* The swaying plants use a small WebGL shader. It only runs while the
  storefront is on screen. Without WebGL the artwork shows as a still image.

## Moving it into the Replit project

1. **Copy the component and images** into the Replit project:
   * `components/ui/king-store-hero.tsx` → `components/ui/` (or `src/components/ui/` in a Vite app)
   * the whole `public/store/` folder → `public/store/`
   * the whole `public/products/` folder → `public/products/`
2. **Install the icon package** (only dependency): `npm install lucide-react`
3. **Load the fonts** (Playfair Display + Inter). Put this in `<head>`:
   `index.html` for Vite, or `app/layout.tsx` for Next.js:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" />
   ```
   Without it the component falls back to Georgia / system fonts; it still works.
4. **Use it as the first section** of the landing page:
   ```tsx
   import KingStoreHero from "@/components/ui/king-store-hero"

   export default function Home() {
     return (
       <main>
         <KingStoreHero
           primaryCta={{ label: "Explore Flavours", href: "#flavours" }}
           secondaryCta={{ label: "Find a Store", href: "#stores" }}
         />
         {/* …the rest of the existing landing page… */}
       </main>
     )
   }
   ```
   If the project has no `@/` path alias, use a relative import instead
   (`../components/ui/king-store-hero`).

### Things to check in the Replit app

* The hero must be the **first thing on the page** (a fixed/sticky navbar on
  top of it is fine; give the navbar a `z-index`).
* The page must scroll on the **window**. If the app wraps everything in a
  scrolling `<div>` with `height: 100vh; overflow: auto`, the lock can't
  hold. Remove that wrapper or let the body scroll.
* Make `#flavours` / `#stores` (or whatever hrefs you pass) exist further
  down the page.

## Props

| Prop | Default | Notes |
| --- | --- | --- |
| `title` | `A Royal Welcome Awaits` | Intro line in front of the store (the page's `<h1>`) |
| `scrollHint` | `Scroll` | Label above the animated arrow at the bottom |
| `tagline` | `["THE TASTE", "OF ROYALTY"]` | Gold lettering on the teal fascia, left and right of the sign. `false` hides it |
| `eyebrow` | `Welcome to the Kingdom` | Small caps above the final headline |
| `headline` | `Every Scoop, A Royal Treat` | Final reveal (`<h2>`) |
| `subheadline` | `Handcrafted ice creams made with the goodness of milk.` | |
| `primaryCta` / `secondaryCta` | Explore Flavours / Find a Store | `{ label, href }` or `false` to hide |
| `products` | the 7 photos in `public/products` | `{ hero, heroLeft, heroRight, tubs[], bars[] }`. Any key you pass replaces the default. `hero` stands front and centre in the parlour with `heroLeft` / `heroRight` either side; `tubs` and `bars` fill the side shelves |
| `assets` | the files in `public/store` | `{ storefront, doorLeft, doorRight, windMask }`, if you host them elsewhere |
| `scrubDistance` | `2600` | Scroll distance (px) for the whole scene. Higher = slower |
| `showSkip` | `true` | Show the "Skip intro" button |
| `className` / `style` | | Applied to the `<section>` |

## Project setup notes

This repo is a minimal **Next.js (App Router) + TypeScript + Tailwind CSS v4**
project with the **shadcn** layout (`components.json`, `lib/utils.ts`,
`components/ui`). To create the same setup from scratch:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npx shadcn@latest init
npm install lucide-react
```

**Why `components/ui`?** It's the folder the shadcn CLI installs components
into (the `ui` alias in `components.json`), and the folder that 21st.dev /
shadcn snippets import from (`@/components/ui/...`). Keeping copied components
there means future `npx shadcn add …` components and pasted snippets resolve
without changing import paths.

The hero itself doesn't need Tailwind: it uses inline styles plus one scoped
`<style>` block, so it also works in a plain React + Vite app. Only the demo
sections in `app/page.tsx` use Tailwind classes.

## Credits

Scroll-lock scrub technique adapted from *MetroHero* by
[Guglielmo Giannattasio](https://www.guglielmogiannattasio.it) (21st.dev).
Storefront artwork and product photos are King Ice Cream's own; the parlour interior is SVG.
