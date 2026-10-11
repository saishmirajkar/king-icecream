import KingStoreHero from "@/components/ui/king-store-hero"

const flavours = [
  { name: "Mango Royale", note: "Alphonso mango, slow-churned", color: "#f7941d" },
  { name: "Belgian Choco Nut", note: "Dark chocolate, roasted almonds", color: "#4f2712" },
  { name: "Classic Vanilla", note: "Madagascar vanilla, fresh milk", color: "#e9d3ad" },
]

export default function Home() {
  return (
    <main>
      {/* Section 1 — scroll-locked storefront hero */}
      <KingStoreHero />

      {/* Placeholder content so you can feel the hand-off from the hero to the page */}
      <section id="flavours" className="bg-king-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-king-blue">Our Flavours</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-king-blue-deep md:text-5xl">
            Crowned favourites
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {flavours.map((f) => (
              <div key={f.name} className="rounded-3xl bg-white p-8 shadow-[0_20px_50px_-20px_rgba(0,70,94,0.35)]">
                <div className="h-14 w-14 rounded-full" style={{ background: f.color }} />
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold text-king-blue-deep">{f.name}</h3>
                <p className="mt-2 text-sm text-king-blue-deep/70">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stores" className="bg-king-blue px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-king-yellow">Visit us</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold md:text-5xl">Find a King parlour near you</h2>
          <p className="mt-4 max-w-xl text-white/80">Replace this with your real store locator.</p>
        </div>
      </section>
    </main>
  )
}
