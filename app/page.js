import Link from "next/link";
import PokedexExplorer from "@/components/pokemons/PokedexExplorer";
import PokemonDeckCarousel from "@/components/pokemons/PokemonDeckCarousel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const featureCards = [
  {
    eyebrow: "National Index",
    title: "Jump straight into the Pokedex",
    description: "Go directly to the searchable catalog section when you already know you want the dex.",
    href: "#pokedex-explorer",
    cta: "Open pokedex",
    accent: "from-red-300/40 via-rose-400/20 to-transparent",
  },
  {
    eyebrow: "Field Log",
    title: "Track a run through Kanto",
    description: "Switch from discovery mode to route planning with map checkpoints, leaders, and wild encounter zones.",
    href: "/journey",
    cta: "Open journey tracker",
    accent: "from-amber-300/40 via-orange-400/20 to-transparent",
  },
  {
    eyebrow: "Squad Build",
    title: "Shape a team with intent",
    description: "Keep the roster separate from the dex so composition, favorites, and progression stay readable.",
    href: "/team",
    cta: "Review my team",
    accent: "from-emerald-300/40 via-teal-400/20 to-transparent",
  },
  {
    eyebrow: "Matchups",
    title: "Check type pressure quickly",
    description: "Use the chart as a tactical layer instead of forcing matchup details into every card on the homepage.",
    href: "/type-chart",
    cta: "Open type chart",
    accent: "from-sky-300/40 via-cyan-400/20 to-transparent",
  },
];

const statPills = [
  { value: "151", label: "Kanto entries" },
  { value: "8", label: "Gym paths" },
  { value: "4", label: "League battles" },
];

const showcaseSections = [
  {
    title: "Fire Type Pokemon",
    eyebrow: "Type Stage 01",
    cards: [
      {
        id: 6,
        name: "Charizard",
        label: "Flame lead",
        headline: "Fire Type Pokemon",
        type: "Fire / Flying",
        deckSide: "right",
        sectionClass: "bg-[linear-gradient(135deg,#8f1d14_0%,#b91c1c_42%,#5f1414_100%)]",
        accent: "from-orange-300/60 via-red-400/30 to-transparent",
        description: "Charizard opens the fire section with the broadest silhouette and the most aggressive card entrance from the right side.",
        stats: [
          { label: "Dex", value: "#006" },
          { label: "Role", value: "Sweeper" },
          { label: "Aura", value: "Blaze" },
        ],
      },
      {
        id: 59,
        name: "Arcanine",
        label: "Power card",
        headline: "Fire Type Pokemon",
        type: "Fire",
        deckSide: "right",
        sectionClass: "bg-[linear-gradient(135deg,#8f1d14_0%,#b91c1c_42%,#5f1414_100%)]",
        accent: "from-amber-300/60 via-orange-400/30 to-transparent",
        description: "Arcanine keeps the same section but shifts the feel toward speed and pressure, still arriving with the fire deck from the right.",
        stats: [
          { label: "Dex", value: "#059" },
          { label: "Role", value: "Rush" },
          { label: "Aura", value: "Heat" },
        ],
      },
      {
        id: 126,
        name: "Magmar",
        label: "Heat core",
        headline: "Fire Type Pokemon",
        type: "Fire",
        deckSide: "right",
        sectionClass: "bg-[linear-gradient(135deg,#8f1d14_0%,#b91c1c_42%,#5f1414_100%)]",
        accent: "from-red-300/60 via-orange-300/30 to-transparent",
        description: "Magmar gives the section a denser volcanic feel while preserving the same full-width deck staging.",
        stats: [
          { label: "Dex", value: "#126" },
          { label: "Role", value: "Mage" },
          { label: "Aura", value: "Burn" },
        ],
      },
    ],
  },
  {
    title: "Water Type Pokemon",
    eyebrow: "Type Stage 02",
    cards: [
      {
        id: 131,
        name: "Lapras",
        label: "Tidal lead",
        headline: "Water Type Pokemon",
        type: "Water / Ice",
        deckSide: "left",
        sectionClass: "bg-[linear-gradient(135deg,#0f3f78_0%,#0369a1_42%,#082f49_100%)]",
        accent: "from-sky-300/60 via-cyan-300/30 to-transparent",
        description: "The water section cools the whole page down and flips the deck entry so the card mass comes from the left.",
        stats: [
          { label: "Dex", value: "#131" },
          { label: "Role", value: "Tank" },
          { label: "Aura", value: "Tide" },
        ],
      },
      {
        id: 134,
        name: "Vaporeon",
        label: "Flow card",
        headline: "Water Type Pokemon",
        type: "Water",
        deckSide: "left",
        sectionClass: "bg-[linear-gradient(135deg,#0f3f78_0%,#0369a1_42%,#082f49_100%)]",
        accent: "from-cyan-300/60 via-blue-300/30 to-transparent",
        description: "Vaporeon keeps the motion from the left but shifts the showcase toward a cleaner, more fluid water palette.",
        stats: [
          { label: "Dex", value: "#134" },
          { label: "Role", value: "Flow" },
          { label: "Aura", value: "Mist" },
        ],
      },
      {
        id: 130,
        name: "Gyarados",
        label: "Pressure card",
        headline: "Water Type Pokemon",
        type: "Water / Flying",
        deckSide: "left",
        sectionClass: "bg-[linear-gradient(135deg,#0f3f78_0%,#0369a1_42%,#082f49_100%)]",
        accent: "from-blue-300/60 via-sky-400/30 to-transparent",
        description: "Gyarados closes the water section with a heavier silhouette while the stage keeps the same ocean-toned background.",
        stats: [
          { label: "Dex", value: "#130" },
          { label: "Role", value: "Breaker" },
          { label: "Aura", value: "Storm" },
        ],
      },
    ],
  },
];

export default function PokemonPage() {
  return (
    <main className="min-h-screen bg-[#08111f]">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 md:px-6 xl:px-0">
        <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
          {featureCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0d1828] p-5 shadow-[0_20px_50px_rgba(3,10,22,0.28)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80`} />
              <div className="relative z-10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-200/75">{card.eyebrow}</div>
                <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">{card.title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200/78">{card.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                  {card.cta}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    {"->"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="overflow-hidden rounded-[2.2rem] border border-white/12 bg-[#0d1828] p-6 shadow-[0_30px_80px_rgba(3,10,22,0.34)] md:p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200/85">
              Kanto Control Room
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl font-sans text-4xl font-black uppercase tracking-tight text-white sm:text-5xl xl:text-6xl">
                One background, old POKEDEX sign, and a type stage that takes the whole page.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-200/78 sm:text-base">
                The shortcuts stay first, but the Pokemon presentation is now a full-width stage. Each type changes the color
                of the whole section, and each type now gets its own separate block with multiple matching Pokemon.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#pokedex-explorer"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Open dex preview
              </Link>
              <Link
                href="/journey"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/14"
              >
                Open journey tools
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {statPills.map((item) => (
                <div
                  key={item.label}
                  className="min-w-28 rounded-2xl border border-white/12 bg-slate-950/35 px-4 py-3"
                >
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-slate-300/70">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-4 self-stretch lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-200/70">
                      Card Motion
                    </div>
                    <div className="mt-1 text-xl font-black uppercase text-white">Deck Rotation</div>
                  </div>
                  <div className="rounded-full border border-sky-300/25 bg-sky-300/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-100">
                    focus
                  </div>
                </div>
                <div className="space-y-3 text-sm text-slate-200/80">
                  <p>Cards sit angled like a standing deck, then rotate one by one into the center.</p>
                  <p>The active card expands across most of the width, with details on one side and the Pokemon on the other.</p>
                  <p>Fire keeps its own section, then Water appears below it as a different section with its own direction.</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/15 bg-slate-950/35 p-5">
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-200/70">
                  Main Flow
                </div>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/90">Shortcuts</div>
                    <p className="mt-2 text-sm text-slate-200/72">Navigation cards now sit above the control room instead of below it.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/90">Deck</div>
                    <p className="mt-2 text-sm text-slate-200/72">Featured Pokemon are revealed one at a time through rotation.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/90">Dex</div>
                    <p className="mt-2 text-sm text-slate-200/72">The searchable Pokedex remains below as the main data layer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {showcaseSections.map((section) => (
          <PokemonDeckCarousel
            key={section.title}
            sectionTitle={section.title}
            sectionEyebrow={section.eyebrow}
            cards={section.cards}
          />
        ))}

        <section
          id="pokedex-explorer"
          className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d1828] p-5 shadow-[0_24px_80px_rgba(3,10,22,0.34)] md:p-8"
        >
          <div className="mb-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200/70">Pokedex Explorer</div>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Search when you want depth, not before.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/76 sm:text-base">
                The homepage now opens with a twelve-card preview. Filters are still here, but the catalog expands only when
                someone asks for more.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-300/70">Preview</div>
                <div className="mt-2 text-lg font-black text-white">12 cards</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-300/70">Deck</div>
                <div className="mt-2 text-lg font-black text-white">Type sections</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-300/70">Catalog</div>
                <div className="mt-2 text-lg font-black text-white">Below hero</div>
              </div>
            </div>
          </div>

          <PokedexExplorer previewLimit={12} />
        </section>
      </div>
    </main>
  );
}
