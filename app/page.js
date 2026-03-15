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

const createShowcaseStats = (dex, role, aura) => [
  { label: "Dex", value: dex },
  { label: "Role", value: role },
  { label: "Aura", value: aura },
];

function buildShowcaseSection({ title, eyebrow, sectionClass, cards }) {
  return {
    title,
    eyebrow,
    cards: cards.map((card) => ({
      id: card.id,
      name: card.name,
      label: card.label,
      headline: title,
      type: card.type,
      deckSide: "left",
      sectionClass,
      accent: card.accent,
      description: card.description,
      stats: createShowcaseStats(card.dex, card.role, card.aura),
    })),
  };
}

const showcaseSections = [
  buildShowcaseSection({
    title: "Fire Type Pokemon",
    eyebrow: "Type Stage 01",
    sectionClass: "bg-[linear-gradient(135deg,#8f1d14_0%,#b91c1c_42%,#5f1414_100%)]",
    cards: [
      { id: 4, name: "Charmander", label: "Starter spark", type: "Fire", accent: "from-orange-200/55 via-red-300/25 to-transparent", description: "Charmander opens the fire deck with a lighter silhouette and the feeling of a run just starting to heat up.", dex: "#004", role: "Scout", aura: "Spark" },
      { id: 5, name: "Charmeleon", label: "Blaze climb", type: "Fire", accent: "from-red-200/55 via-orange-400/30 to-transparent", description: "Charmeleon sharpens the stage with a more aggressive posture and a hotter, mid-run tempo.", dex: "#005", role: "Striker", aura: "Flare" },
      { id: 6, name: "Charizard", label: "Flame lead", type: "Fire / Flying", accent: "from-orange-300/60 via-red-400/30 to-transparent", description: "Charizard brings the broadest fire silhouette and gives the whole section its headline energy.", dex: "#006", role: "Sweeper", aura: "Blaze" },
      { id: 37, name: "Vulpix", label: "Fox ember", type: "Fire", accent: "from-amber-100/60 via-orange-300/25 to-transparent", description: "Vulpix softens the section with a smaller frame and a quick, glowing transition between heavier cards.", dex: "#037", role: "Charm", aura: "Ember" },
      { id: 38, name: "Ninetales", label: "Ember veil", type: "Fire", accent: "from-amber-200/60 via-orange-300/30 to-transparent", description: "Ninetales adds elegance and makes the deck feel more mystical without losing the furnace heat.", dex: "#038", role: "Oracle", aura: "Ember" },
      { id: 58, name: "Growlithe", label: "Pack heat", type: "Fire", accent: "from-yellow-100/55 via-orange-300/30 to-transparent", description: "Growlithe makes the carousel feel faster and more alert, like the section is moving on instinct.", dex: "#058", role: "Scout", aura: "Howl" },
      { id: 59, name: "Arcanine", label: "Power card", type: "Fire", accent: "from-amber-300/60 via-orange-400/30 to-transparent", description: "Arcanine shifts the fire stage toward speed and pressure with a larger, more commanding frame.", dex: "#059", role: "Rush", aura: "Heat" },
      { id: 77, name: "Ponyta", label: "Flame stride", type: "Fire", accent: "from-amber-100/55 via-orange-200/25 to-transparent", description: "Ponyta adds a cleaner running silhouette that keeps the deck light on its feet.", dex: "#077", role: "Sprint", aura: "Trail" },
      { id: 78, name: "Rapidash", label: "Sprint flare", type: "Fire", accent: "from-yellow-200/55 via-orange-400/35 to-transparent", description: "Rapidash gives the stage a sharper burst of motion and a more dramatic mane of fire.", dex: "#078", role: "Dash", aura: "Flash" },
      { id: 126, name: "Magmar", label: "Heat core", type: "Fire", accent: "from-red-300/60 via-orange-300/30 to-transparent", description: "Magmar densifies the section with a volcanic shape and a heavier central mass.", dex: "#126", role: "Mage", aura: "Burn" },
      { id: 136, name: "Flareon", label: "Heat bloom", type: "Fire", accent: "from-orange-200/55 via-red-300/30 to-transparent", description: "Flareon rounds the fire sequence out with a softer glow and a fuller silhouette.", dex: "#136", role: "Burst", aura: "Kindle" },
      { id: 146, name: "Moltres", label: "Sky furnace", type: "Fire / Flying", accent: "from-yellow-100/60 via-red-400/35 to-transparent", description: "Moltres closes the fire run like a mythic flare-up, with wings that stretch the whole stage open.", dex: "#146", role: "Mythic", aura: "Inferno" },
    ],
  }),
  buildShowcaseSection({
    title: "Water Type Pokemon",
    eyebrow: "Type Stage 02",
    sectionClass: "bg-[linear-gradient(135deg,#0f3f78_0%,#0369a1_42%,#082f49_100%)]",
    cards: [
      { id: 8, name: "Wartortle", label: "Current scout", type: "Water", accent: "from-sky-200/55 via-cyan-300/25 to-transparent", description: "Wartortle opens the water section with a calmer shape that eases the carousel into motion.", dex: "#008", role: "Scout", aura: "Wave" },
      { id: 9, name: "Blastoise", label: "Shell cannon", type: "Water", accent: "from-sky-200/60 via-blue-400/30 to-transparent", description: "Blastoise adds heavy structure and makes the whole section feel more defensive and deliberate.", dex: "#009", role: "Tank", aura: "Shell" },
      { id: 55, name: "Golduck", label: "Glide pulse", type: "Water", accent: "from-cyan-200/55 via-sky-300/25 to-transparent", description: "Golduck gives the deck a sleeker rhythm and a more focused, forward-leaning profile.", dex: "#055", role: "Glide", aura: "Ripple" },
      { id: 62, name: "Poliwrath", label: "River brawler", type: "Water / Fighting", accent: "from-blue-300/60 via-cyan-400/30 to-transparent", description: "Poliwrath brings physical weight to the water lineup while keeping the same cool movement.", dex: "#062", role: "Bruiser", aura: "Surf" },
      { id: 73, name: "Tentacruel", label: "Deep drift", type: "Water / Poison", accent: "from-cyan-100/55 via-blue-300/25 to-transparent", description: "Tentacruel adds a looser, tentacled silhouette that makes the section feel more oceanic.", dex: "#073", role: "Drift", aura: "Current" },
      { id: 80, name: "Slowbro", label: "Tide hold", type: "Water / Psychic", accent: "from-violet-100/45 via-sky-300/25 to-transparent", description: "Slowbro slows the tempo down and gives the deck a heavier, more grounded pause.", dex: "#080", role: "Hold", aura: "Calm" },
      { id: 87, name: "Dewgong", label: "Ice wake", type: "Water / Ice", accent: "from-slate-100/60 via-cyan-200/25 to-transparent", description: "Dewgong cools the palette and smooths the middle stretch of the water sequence.", dex: "#087", role: "Glide", aura: "Frost" },
      { id: 91, name: "Cloyster", label: "Reef lock", type: "Water / Ice", accent: "from-slate-200/55 via-sky-200/25 to-transparent", description: "Cloyster sharpens the section with a tougher shell and more angular shapes.", dex: "#091", role: "Wall", aura: "Shell" },
      { id: 117, name: "Seadra", label: "Needle surge", type: "Water", accent: "from-blue-200/60 via-cyan-300/25 to-transparent", description: "Seadra brings a narrower profile that makes the carousel feel faster between bulkier cards.", dex: "#117", role: "Lancer", aura: "Jet" },
      { id: 121, name: "Starmie", label: "Star current", type: "Water / Psychic", accent: "from-cyan-200/60 via-sky-300/30 to-transparent", description: "Starmie introduces sharper geometry so the water deck feels faster and more precise.", dex: "#121", role: "Core", aura: "Prism" },
      { id: 130, name: "Gyarados", label: "Pressure card", type: "Water / Flying", accent: "from-blue-300/60 via-sky-400/30 to-transparent", description: "Gyarados raises the stakes with the heaviest silhouette in the section and a stormy finish.", dex: "#130", role: "Breaker", aura: "Storm" },
      { id: 131, name: "Lapras", label: "Tidal lead", type: "Water / Ice", accent: "from-sky-300/60 via-cyan-300/30 to-transparent", description: "Lapras gives the carousel a long, calm shape that feels like the sea opening up ahead.", dex: "#131", role: "Tank", aura: "Tide" },
    ],
  }),
  buildShowcaseSection({
    title: "Grass Type Pokemon",
    eyebrow: "Type Stage 03",
    sectionClass: "bg-[linear-gradient(135deg,#14532d_0%,#15803d_42%,#052e16_100%)]",
    cards: [
      { id: 2, name: "Ivysaur", label: "Leaf climb", type: "Grass / Poison", accent: "from-lime-200/55 via-green-300/25 to-transparent", description: "Ivysaur starts the grass stage with a balanced frame that feels rooted but still moving upward.", dex: "#002", role: "Climb", aura: "Sap" },
      { id: 3, name: "Venusaur", label: "Canopy anchor", type: "Grass / Poison", accent: "from-lime-200/55 via-green-300/30 to-transparent", description: "Venusaur brings a grounded heavyweight silhouette that makes the whole section feel rooted.", dex: "#003", role: "Anchor", aura: "Bloom" },
      { id: 43, name: "Oddish", label: "Sprout beat", type: "Grass / Poison", accent: "from-emerald-100/55 via-lime-300/20 to-transparent", description: "Oddish lightens the lineup with a smaller silhouette and a playful green rhythm.", dex: "#043", role: "Sprout", aura: "Dew" },
      { id: 44, name: "Gloom", label: "Shade drift", type: "Grass / Poison", accent: "from-rose-100/45 via-green-300/20 to-transparent", description: "Gloom makes the deck moodier and gives the green palette a denser mid-stage atmosphere.", dex: "#044", role: "Shade", aura: "Musk" },
      { id: 45, name: "Vileplume", label: "Bloom haze", type: "Grass / Poison", accent: "from-pink-200/45 via-green-300/25 to-transparent", description: "Vileplume changes the mood of the grass deck without losing its jungle density.", dex: "#045", role: "Spore", aura: "Mist" },
      { id: 46, name: "Paras", label: "Mushroom spark", type: "Bug / Grass", accent: "from-orange-100/45 via-green-300/20 to-transparent", description: "Paras adds a smaller woodland profile that keeps the section textured and alive.", dex: "#046", role: "Creep", aura: "Spore" },
      { id: 47, name: "Parasect", label: "Forest shell", type: "Bug / Grass", accent: "from-amber-100/45 via-green-300/20 to-transparent", description: "Parasect gives the deck a broader mushroom silhouette and a darker forest mood.", dex: "#047", role: "Guard", aura: "Root" },
      { id: 69, name: "Bellsprout", label: "Stem snap", type: "Grass / Poison", accent: "from-yellow-100/55 via-lime-300/25 to-transparent", description: "Bellsprout narrows the stage into a more agile shape that feels ready to spring.", dex: "#069", role: "Snap", aura: "Stem" },
      { id: 70, name: "Weepinbell", label: "Hanging trap", type: "Grass / Poison", accent: "from-lime-100/55 via-yellow-300/25 to-transparent", description: "Weepinbell makes the lineup feel more dangerous with a suspended, predatory profile.", dex: "#070", role: "Trap", aura: "Sap" },
      { id: 71, name: "Victreebel", label: "Vine trap", type: "Grass / Poison", accent: "from-yellow-200/50 via-lime-300/30 to-transparent", description: "Victreebel sharpens the green stage with a stronger sense of ambush.", dex: "#071", role: "Trap", aura: "Snap" },
      { id: 103, name: "Exeggutor", label: "Palm mind", type: "Grass / Psychic", accent: "from-emerald-200/50 via-lime-200/25 to-transparent", description: "Exeggutor brings a stranger silhouette that makes the green section feel more eccentric.", dex: "#103", role: "Control", aura: "Grove" },
      { id: 114, name: "Tangela", label: "Moss coil", type: "Grass", accent: "from-green-200/55 via-emerald-300/25 to-transparent", description: "Tangela closes the grass run with a tangled mass that makes the final card feel overgrown.", dex: "#114", role: "Wall", aura: "Vine" },
    ],
  }),
  buildShowcaseSection({
    title: "Electric Type Pokemon",
    eyebrow: "Type Stage 04",
    sectionClass: "bg-[linear-gradient(135deg,#854d0e_0%,#ca8a04_42%,#422006_100%)]",
    cards: [
      { id: 25, name: "Pikachu", label: "Spark lead", type: "Electric", accent: "from-yellow-200/60 via-amber-300/30 to-transparent", description: "Pikachu starts the electric stage with the brightest energy on the homepage.", dex: "#025", role: "Lead", aura: "Static" },
      { id: 26, name: "Raichu", label: "Charge burst", type: "Electric", accent: "from-amber-200/60 via-yellow-300/30 to-transparent", description: "Raichu makes the sequence feel faster and louder, like the deck itself is carrying current.", dex: "#026", role: "Volt", aura: "Flash" },
      { id: 81, name: "Magnemite", label: "Field pulse", type: "Electric / Steel", accent: "from-slate-200/60 via-yellow-200/20 to-transparent", description: "Magnemite introduces a more technical shape and a magnetic precision to the carousel.", dex: "#081", role: "Field", aura: "Static" },
      { id: 82, name: "Magneton", label: "Field lock", type: "Electric / Steel", accent: "from-slate-200/60 via-yellow-200/25 to-transparent", description: "Magneton pushes the electric deck from playful to controlled with a denser cluster silhouette.", dex: "#082", role: "Field", aura: "Flux" },
      { id: 100, name: "Voltorb", label: "Quick flash", type: "Electric", accent: "from-red-100/45 via-yellow-300/25 to-transparent", description: "Voltorb adds a compact burst of motion that keeps the electric run lively.", dex: "#100", role: "Burst", aura: "Snap" },
      { id: 101, name: "Electrode", label: "Overcharge", type: "Electric", accent: "from-red-100/45 via-amber-300/25 to-transparent", description: "Electrode raises the tempo with a more unstable energy and a stronger end-to-end spin.", dex: "#101", role: "Rush", aura: "Amp" },
      { id: 125, name: "Electabuzz", label: "Live wire", type: "Electric", accent: "from-yellow-100/60 via-orange-300/30 to-transparent", description: "Electabuzz adds a jagged frame that pushes the electric carousel toward aggression.", dex: "#125", role: "Pressure", aura: "Surge" },
      { id: 135, name: "Jolteon", label: "Needle flash", type: "Electric", accent: "from-lime-100/60 via-yellow-300/30 to-transparent", description: "Jolteon sharpens the whole section with a silhouette built for speed and sudden turns.", dex: "#135", role: "Dash", aura: "Bolt" },
      { id: 145, name: "Zapdos", label: "Storm crown", type: "Electric / Flying", accent: "from-yellow-100/60 via-amber-200/30 to-transparent", description: "Zapdos brings the biggest wing shape in the lineup and a near-legendary charge.", dex: "#145", role: "Mythic", aura: "Thunder" },
      { id: 172, name: "Pichu", label: "Mini spark", type: "Electric", accent: "from-yellow-100/55 via-lime-200/20 to-transparent", description: "Pichu lightens the section with a smaller, brighter beat before the heavier cards return.", dex: "#172", role: "Starter", aura: "Glow" },
      { id: 181, name: "Ampharos", label: "Beacon shine", type: "Electric", accent: "from-yellow-100/55 via-orange-200/20 to-transparent", description: "Ampharos gives the deck a calmer glow and a more vertical lighthouse-like presence.", dex: "#181", role: "Beacon", aura: "Shine" },
      { id: 239, name: "Elekid", label: "Arc pulse", type: "Electric", accent: "from-amber-100/55 via-yellow-300/25 to-transparent", description: "Elekid closes the electric lineup with a smaller but high-voltage finish.", dex: "#239", role: "Pulse", aura: "Arc" },
    ],
  }),
  buildShowcaseSection({
    title: "Psychic Type Pokemon",
    eyebrow: "Type Stage 05",
    sectionClass: "bg-[linear-gradient(135deg,#701a75_0%,#c026d3_42%,#3b0764_100%)]",
    cards: [
      { id: 63, name: "Abra", label: "Quiet blink", type: "Psychic", accent: "from-fuchsia-100/55 via-violet-200/20 to-transparent", description: "Abra opens the psychic stage with the lightest touch, like the deck is appearing by teleport.", dex: "#063", role: "Scout", aura: "Blink" },
      { id: 64, name: "Kadabra", label: "Mind split", type: "Psychic", accent: "from-fuchsia-200/55 via-pink-300/25 to-transparent", description: "Kadabra sharpens the section with a more angular profile and a stronger sense of control.", dex: "#064", role: "Focus", aura: "Mind" },
      { id: 65, name: "Alakazam", label: "Mind spear", type: "Psychic", accent: "from-fuchsia-200/55 via-pink-300/30 to-transparent", description: "Alakazam gives the psychic stage its cleanest and most focused silhouette.", dex: "#065", role: "Caster", aura: "Focus" },
      { id: 79, name: "Slowpoke", label: "Dream drift", type: "Water / Psychic", accent: "from-rose-100/45 via-violet-200/20 to-transparent", description: "Slowpoke slows the psychic rhythm down and gives the carousel a softer pause.", dex: "#079", role: "Drift", aura: "Calm" },
      { id: 80, name: "Slowbro", label: "Calm tide", type: "Water / Psychic", accent: "from-violet-200/55 via-pink-200/25 to-transparent", description: "Slowbro adds more mass and makes the section feel heavier in the middle turns.", dex: "#080", role: "Tank", aura: "Calm" },
      { id: 96, name: "Drowzee", label: "Sleep hum", type: "Psychic", accent: "from-amber-100/45 via-pink-300/20 to-transparent", description: "Drowzee introduces a sleepy tension and turns the purple stage a little stranger.", dex: "#096", role: "Trance", aura: "Hum" },
      { id: 97, name: "Hypno", label: "Dream pull", type: "Psychic", accent: "from-amber-200/45 via-fuchsia-300/25 to-transparent", description: "Hypno deepens the mood with an eerie silhouette and a stronger late-night feel.", dex: "#097", role: "Control", aura: "Sleep" },
      { id: 122, name: "Mr. Mime", label: "Barrier play", type: "Psychic / Fairy", accent: "from-rose-100/55 via-violet-200/25 to-transparent", description: "Mr. Mime gives the carousel a surreal silhouette and a playful but uncanny energy.", dex: "#122", role: "Guard", aura: "Barrier" },
      { id: 124, name: "Jynx", label: "Frost echo", type: "Ice / Psychic", accent: "from-sky-100/50 via-pink-300/25 to-transparent", description: "Jynx cools the palette with brighter highlights and a more theatrical stage presence.", dex: "#124", role: "Muse", aura: "Frost" },
      { id: 150, name: "Mewtwo", label: "Final pulse", type: "Psychic", accent: "from-fuchsia-100/60 via-violet-300/30 to-transparent", description: "Mewtwo turns the section into an endgame reveal with the cleanest, most severe frame.", dex: "#150", role: "Boss", aura: "Core" },
      { id: 151, name: "Mew", label: "Myth drift", type: "Psychic", accent: "from-pink-100/60 via-fuchsia-200/20 to-transparent", description: "Mew softens the pressure and gives the final stretch of the psychic deck a lighter mystery.", dex: "#151", role: "Mythic", aura: "Wish" },
      { id: 196, name: "Espeon", label: "Night gleam", type: "Psychic", accent: "from-violet-100/60 via-fuchsia-200/20 to-transparent", description: "Espeon closes the psychic lineup with a sleek, high-alert silhouette and a polished finish.", dex: "#196", role: "Gleam", aura: "Moon" },
    ],
  }),
];

export default function PokemonPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0a0a0a_0%,#050914_8%,#08111f_18%,#08111f_100%)]">
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
          <div className="mb-8">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200/70">Pokedex Explorer</div>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Explore the Pokedex.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200/76 sm:text-base">
                Browse all Pokemon here and use the filters only when you need them.
              </p>
            </div>
          </div>

          <PokedexExplorer />
        </section>
      </div>
    </main>
  );
}
