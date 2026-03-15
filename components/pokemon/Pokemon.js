import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getKantoEvolutionRole } from "@/lib/kantoEvolutionFamilies";
import { getTypeMatchups } from "@/lib/typeEffectiveness";

const STAT_CONFIG = [
  { key: "HP", label: "HP" },
  { key: "Attack", label: "Attack" },
  { key: "Defense", label: "Defense" },
  { key: "SpecialAttack", label: "Sp. Attack" },
  { key: "SpecialDefense", label: "Sp. Defense" },
  { key: "Speed", label: "Speed" },
];

const TYPE_THEMES = {
  Normal: {
    accent: "from-slate-300/20 via-slate-200/8 to-transparent",
    aura: "bg-slate-200/18",
    badge: "border-slate-200/20 bg-slate-300/12 text-slate-100",
    meter: "from-slate-200 via-slate-300 to-slate-500",
  },
  Fire: {
    pageBackground: "bg-[#09111d]",
    accent: "from-red-500/30 via-orange-400/12 to-transparent",
    aura: "bg-red-400/24",
    badge: "border-red-200/28 bg-red-500/18 text-red-50",
    meter: "from-orange-200 via-red-400 to-red-600",
  },
  Water: {
    pageBackground: "bg-[linear-gradient(135deg,#0f3f78_0%,#0369a1_42%,#082f49_100%)]",
    accent: "from-sky-300/24 via-cyan-300/10 to-transparent",
    aura: "bg-sky-300/20",
    badge: "border-sky-200/25 bg-sky-500/16 text-sky-50",
    meter: "from-cyan-200 via-sky-300 to-blue-500",
  },
  Grass: {
    accent: "from-emerald-300/24 via-green-300/10 to-transparent",
    aura: "bg-emerald-300/20",
    badge: "border-emerald-200/25 bg-emerald-500/16 text-emerald-50",
    meter: "from-lime-200 via-emerald-300 to-green-500",
  },
  Electric: {
    accent: "from-yellow-200/24 via-amber-300/10 to-transparent",
    aura: "bg-yellow-200/22",
    badge: "border-yellow-200/25 bg-yellow-400/16 text-yellow-50",
    meter: "from-yellow-100 via-amber-300 to-yellow-500",
  },
  Ice: {
    accent: "from-cyan-200/24 via-sky-200/10 to-transparent",
    aura: "bg-cyan-200/20",
    badge: "border-cyan-200/25 bg-cyan-400/16 text-cyan-50",
    meter: "from-white via-cyan-200 to-sky-400",
  },
  Fighting: {
    accent: "from-orange-300/20 via-red-500/10 to-transparent",
    aura: "bg-orange-400/20",
    badge: "border-orange-200/25 bg-orange-600/16 text-orange-50",
    meter: "from-orange-200 via-orange-400 to-red-600",
  },
  Poison: {
    accent: "from-fuchsia-300/20 via-violet-400/10 to-transparent",
    aura: "bg-fuchsia-300/18",
    badge: "border-fuchsia-200/25 bg-fuchsia-500/16 text-fuchsia-50",
    meter: "from-fuchsia-200 via-purple-300 to-violet-600",
  },
  Ground: {
    accent: "from-amber-300/20 via-orange-300/10 to-transparent",
    aura: "bg-amber-300/18",
    badge: "border-amber-200/25 bg-amber-600/16 text-amber-50",
    meter: "from-yellow-100 via-amber-300 to-orange-600",
  },
  Flying: {
    accent: "from-indigo-200/20 via-sky-300/10 to-transparent",
    aura: "bg-indigo-200/18",
    badge: "border-indigo-200/25 bg-indigo-500/16 text-indigo-50",
    meter: "from-sky-100 via-indigo-300 to-indigo-500",
  },
  Psychic: {
    accent: "from-pink-300/20 via-fuchsia-400/10 to-transparent",
    aura: "bg-pink-300/18",
    badge: "border-pink-200/25 bg-pink-500/16 text-pink-50",
    meter: "from-pink-100 via-fuchsia-300 to-purple-500",
  },
  Bug: {
    accent: "from-lime-300/20 via-emerald-300/10 to-transparent",
    aura: "bg-lime-300/18",
    badge: "border-lime-200/25 bg-lime-500/16 text-lime-50",
    meter: "from-lime-100 via-lime-300 to-green-500",
  },
  Rock: {
    accent: "from-stone-300/20 via-amber-300/10 to-transparent",
    aura: "bg-stone-300/18",
    badge: "border-stone-200/25 bg-stone-600/16 text-stone-50",
    meter: "from-stone-100 via-stone-300 to-stone-600",
  },
  Ghost: {
    accent: "from-violet-300/20 via-indigo-400/10 to-transparent",
    aura: "bg-violet-300/18",
    badge: "border-violet-200/25 bg-violet-600/16 text-violet-50",
    meter: "from-violet-100 via-violet-300 to-indigo-600",
  },
  Dragon: {
    accent: "from-indigo-300/20 via-blue-400/10 to-transparent",
    aura: "bg-indigo-300/18",
    badge: "border-indigo-200/25 bg-indigo-600/16 text-indigo-50",
    meter: "from-indigo-100 via-indigo-300 to-blue-600",
  },
  Dark: {
    accent: "from-zinc-300/14 via-zinc-400/6 to-transparent",
    aura: "bg-zinc-300/14",
    badge: "border-zinc-200/20 bg-zinc-500/12 text-zinc-100",
    meter: "from-zinc-100 via-zinc-300 to-zinc-600",
  },
  Steel: {
    accent: "from-slate-200/20 via-slate-300/10 to-transparent",
    aura: "bg-slate-200/18",
    badge: "border-slate-200/25 bg-slate-500/16 text-slate-50",
    meter: "from-slate-100 via-slate-300 to-slate-500",
  },
  Fairy: {
    accent: "from-rose-200/24 via-pink-300/10 to-transparent",
    aura: "bg-rose-200/18",
    badge: "border-rose-200/25 bg-rose-400/16 text-rose-50",
    meter: "from-rose-100 via-pink-300 to-fuchsia-500",
  },
};

function getPokemonId(pokemon) {
  return Number(pokemon?.id ?? pokemon?.id_pokedex ?? pokemon?.pokedex_id);
}

function getPokemonName(pokemon, languageOrder = ["english", "en", "french", "fr"]) {
  const safeName = pokemon?.name || {};

  const value = languageOrder
    .map((language) => safeName?.[language])
    .find((candidate) => typeof candidate === "string" && candidate.trim());

  if (value) {
    return value;
  }

  return typeof safeName === "string" ? safeName : "Pokemon";
}

function getPokemonTypes(pokemon) {
  if (Array.isArray(pokemon?.types) && pokemon.types.length > 0) {
    return pokemon.types.map((type) =>
      typeof type === "string" ? { name: type } : { name: type?.name || "Normal" }
    );
  }

  if (Array.isArray(pokemon?.type) && pokemon.type.length > 0) {
    return pokemon.type.map((type) => ({ name: String(type) }));
  }

  return [{ name: "Normal" }];
}

function getStatValue(base, key) {
  if (!base) return 0;
  if (base[key] != null) return Number(base[key]);
  if (key === "SpecialAttack") return Number(base["Sp. Attack"] ?? base.specialAttack ?? 0);
  if (key === "SpecialDefense") return Number(base["Sp. Defense"] ?? base.specialDefense ?? 0);
  return 0;
}

function getArtworkSrc(pokemon, pokemonId) {
  if (Number.isFinite(pokemonId)) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  const fallback = pokemon?.sprites?.regular || pokemon?.image;
  return typeof fallback === "string" && fallback.startsWith("https://") ? fallback : null;
}

function getTheme(typeName) {
  return TYPE_THEMES[typeName] || TYPE_THEMES.Normal;
}

function getTypeBadgeClass(typeName, extraClasses = "") {
  const theme = getTheme(typeName);

  return `${theme.badge} shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_18px_rgba(255,255,255,0.1),inset_0_0_12px_rgba(255,255,255,0.04)] ${extraClasses}`.trim();
}

function getBaseTotal(base) {
  return STAT_CONFIG.reduce((total, stat) => total + getStatValue(base, stat.key), 0);
}

function getHighestStat(base) {
  return STAT_CONFIG.reduce((best, stat) => {
    const value = getStatValue(base, stat.key);
    if (!best || value > best.value) {
      return { label: stat.label, value };
    }
    return best;
  }, null);
}

function getLowestStat(base) {
  return STAT_CONFIG.reduce((lowest, stat) => {
    const value = getStatValue(base, stat.key);
    if (!lowest || value < lowest.value) {
      return { label: stat.label, value };
    }
    return lowest;
  }, null);
}

function getSpeedTier(speed) {
  if (speed >= 120) return "Lightning";
  if (speed >= 90) return "Fast";
  if (speed >= 60) return "Balanced";
  if (speed >= 40) return "Measured";
  return "Heavy";
}

function getBattleStyle(base) {
  const attack = getStatValue(base, "Attack");
  const specialAttack = getStatValue(base, "SpecialAttack");

  if (attack - specialAttack >= 12) return "Physical pressure";
  if (specialAttack - attack >= 12) return "Special pressure";
  return "Mixed pressure";
}

function getDurabilityLabel(base) {
  const bulkScore =
    getStatValue(base, "HP") +
    getStatValue(base, "Defense") +
    getStatValue(base, "SpecialDefense");

  if (bulkScore >= 250) return "Tanky frame";
  if (bulkScore >= 190) return "Steady frame";
  return "Light frame";
}

function getStatWidth(value) {
  return `${Math.min((value / 180) * 100, 100)}%`;
}

function getGenerationLabel(pokemonId) {
  const numericId = Number(pokemonId);

  if (!Number.isFinite(numericId)) {
    return "Unknown";
  }

  if (numericId <= 151) return "Generation I";
  if (numericId <= 251) return "Generation II";
  if (numericId <= 386) return "Generation III";
  if (numericId <= 493) return "Generation IV";
  if (numericId <= 649) return "Generation V";
  if (numericId <= 721) return "Generation VI";
  if (numericId <= 809) return "Generation VII";
  if (numericId <= 905) return "Generation VIII";
  return "Generation IX";
}

function formatMultiplier(multiplier) {
  const normalized = Number(multiplier);

  if (Number.isInteger(normalized)) {
    return `${normalized}x`;
  }

  return `${normalized.toFixed(1)}x`;
}

function getEvolutionStageLabel(role, index, total) {
  if (total <= 1) return "Solo";
  if (role === "Base form") return "Base";
  if (role === "Middle form") return `Stage ${index + 1}`;
  if (role === "Final form") return "Final";
  if (role === "Branch evolution") return "Branch";
  return `Form ${index + 1}`;
}

function QuickInfoCard({ label, value, subvalue = "" }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/48">{label}</div>
      <div className="mt-2 text-[1.65rem] font-black leading-tight text-white">{value}</div>
      {subvalue ? <div className="mt-1 text-sm text-white/62">{subvalue}</div> : null}
    </div>
  );
}

function MatchupCard({
  typeName,
  multiplier,
  tone = "neutral",
  multiplierLabel = "",
}) {
  const theme = getTheme(typeName);
  return (
    <div
      className="relative min-h-[4.65rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/18 px-3 py-2.5"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.accent} opacity-32`} />
      <div className="relative flex h-full items-center gap-3">
        <div
          className={`flex h-[2.85rem] min-w-[4.7rem] shrink-0 items-center justify-center rounded-full border px-4 text-sm font-bold ${getTypeBadgeClass(typeName)}`}
        >
          {typeName}
        </div>
        <div className="flex min-h-[3rem] flex-1 items-center justify-end rounded-full border border-white/12 bg-black/28 px-4 text-white">
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              {multiplierLabel || (tone === "weakness"
                ? "Damage taken"
                : tone === "strength"
                  ? "Damage dealt"
                  : "Value")}
            </div>
            <div className="text-xl font-black">{formatMultiplier(multiplier)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchupPanel({
  phaseLabel,
  title,
  subtitle,
  tone,
  items,
  emptyLabel,
  multiplierLabel,
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.18))] p-5">
      <div className="relative">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {phaseLabel ? (
              <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/72">
                {phaseLabel}
              </div>
            ) : null}
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/62">
              {title}
            </div>
          </div>
          {subtitle ? (
            <p className="mt-2 max-w-sm text-sm leading-7 text-white/62">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3.5">
          {items.length > 0 ? (
            items.map((entry) => (
              <MatchupCard
                key={`${title}-${entry.name}-${entry.multiplier}`}
                typeName={entry.name}
                multiplier={entry.multiplier}
                tone={tone}
                multiplierLabel={multiplierLabel}
              />
            ))
          ) : (
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/62">
              {emptyLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EvolutionConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center px-2">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/50">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" />
          <path d="M13 7l5 5-5 5" />
        </svg>
      </div>
    </div>
  );
}

function EvolutionCard({ member, currentPokemonId, backHref, index, total }) {
  const memberId = getPokemonId(member);
  const memberName = getPokemonName(member);
  const memberTypes = getPokemonTypes(member);
  const memberType = memberTypes[0]?.name || "Normal";
  const memberTheme = getTheme(memberType);
  const artworkSrc = getArtworkSrc(member, memberId);
  const isCurrent = memberId === currentPokemonId;
  const role = getKantoEvolutionRole(memberId);
  const stageLabel = getEvolutionStageLabel(role, index, total);
  const content = (
    <div
      className={`group relative flex min-h-[14rem] w-[11.6rem] flex-col overflow-hidden rounded-[1.75rem] border p-4 transition-all duration-300 ${
        isCurrent
          ? "border-white/35 bg-white/14 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          : "border-white/12 bg-white/7 hover:-translate-y-1.5 hover:border-white/24 hover:bg-white/10"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${memberTheme.accent} opacity-80`} />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
            {stageLabel}
          </div>
          <div className="mt-1 text-sm font-black text-white/85">
            #{String(memberId).padStart(3, "0")}
          </div>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold normal-case tracking-normal ${getTypeBadgeClass(memberType)}`}>
          {memberType}
        </span>
      </div>
      <div className="relative z-10 mt-4 flex flex-1 items-center justify-center">
        <div className={`absolute h-24 w-24 rounded-full blur-2xl ${memberTheme.aura}`} />
        {artworkSrc ? (
          <Image
            src={artworkSrc}
            width={132}
            height={132}
            alt={memberName}
            className={`relative z-10 h-28 w-28 object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.44)] transition-transform duration-300 ${
              isCurrent ? "" : "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/12 bg-white/10 text-xs text-white/60">
            No art
          </div>
        )}
      </div>
      <div className="relative z-10 mt-4 border-t border-white/10 pt-3 text-center">
        <div className="text-base font-black uppercase tracking-tight text-white">{memberName}</div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
          {isCurrent ? "Viewing now" : role}
        </div>
      </div>
    </div>
  );

  if (isCurrent) {
    return content;
  }

  return (
    <Link href={`/pokemon/${memberId}?from=${encodeURIComponent(backHref)}`} className="block">
      {content}
    </Link>
  );
}

export default function Pokemon({ pokemon, backHref = "/", evolutionFamily = [] }) {
  const pokemonId = getPokemonId(pokemon);
  const displayName = getPokemonName(pokemon);
  const typeEntries = getPokemonTypes(pokemon);
  const typeNames = typeEntries.map((type) => type.name);
  const primaryType = typeEntries[0]?.name || "Normal";
  const theme = getTheme(primaryType);
  const artworkSrc = getArtworkSrc(pokemon, pokemonId);
  const stats = STAT_CONFIG.map((stat) => ({
    ...stat,
    value: getStatValue(pokemon?.base, stat.key),
  }));
  const highestStat = getHighestStat(pokemon?.base);
  const lowestStat = getLowestStat(pokemon?.base);
  const speed = getStatValue(pokemon?.base, "Speed");
  const speedTier = getSpeedTier(speed);
  const baseTotal = getBaseTotal(pokemon?.base);
  const generationLabel = getGenerationLabel(pokemonId);
  const evolutionRole = getKantoEvolutionRole(pokemonId);
  const familyMembers = evolutionFamily.length > 0 ? evolutionFamily : [pokemon];
  const matchupProfile = getTypeMatchups(typeNames);
  const weaknesses = matchupProfile?.defense?.weaknesses || [];
  const strengths = matchupProfile?.offense?.strengths || [];
  const battleStyle = getBattleStyle(pokemon?.base);
  const durabilityLabel = getDurabilityLabel(pokemon?.base);
  const typingLabel = typeNames.length > 1 ? "Dual-type build" : "Single-type build";

  return (
    <div className={`relative overflow-hidden rounded-[2.7rem] border border-white/12 ${theme.pageBackground || "bg-[#09111d]"} text-white shadow-[0_35px_100px_rgba(0,0,0,0.46)]`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.accent} opacity-95`} />
      <div className="absolute left-[8%] top-10 h-52 w-52 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />

      <div className="relative z-10 p-5 md:p-8 xl:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/7 px-4 py-2 text-sm font-semibold text-white/86 transition-colors hover:bg-white/12"
          >
            <span aria-hidden="true">{"<-"}</span>
            Back
          </Link>
          <div className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65">
            Pokemon Detail
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(240px,0.78fr)_minmax(0,2.34fr)_minmax(240px,0.78fr)] xl:grid-rows-[auto_auto] xl:items-start">
          <aside className="flex h-full flex-col rounded-[2rem] border border-white/12 bg-white/7 p-5 backdrop-blur-md xl:row-start-1 xl:col-start-1 xl:self-stretch">
            <div className="flex h-full w-full flex-col">
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <QuickInfoCard
                label="National Dex"
                value={`#${String(pokemonId).padStart(3, "0")}`}
              />
              <QuickInfoCard label="Generation" value={generationLabel} />
            </div>
              <div className="mt-4 flex-1 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/48">
                  Field Notes
                </div>
                <p className="mt-3.5 text-[15px] leading-7 text-white/66">
                  {displayName} is a {typingLabel.toLowerCase()} Pokemon with a{" "}
                  {speedTier.toLowerCase()} pace and a {battleStyle.toLowerCase()} lean.
                </p>

                <div className="mt-3.5 grid gap-3">
                  <div className="rounded-[1rem] border border-white/10 bg-white/6 px-3.5 py-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                      Battle Style
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white/84">{battleStyle}</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/10 bg-white/6 px-3.5 py-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                      Pace
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white/84">{speedTier}</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/10 bg-white/6 px-3.5 py-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                      Durability
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white/84">{durabilityLabel}</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/10 bg-white/6 px-3.5 py-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                      Top Edge
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white/84">
                      {highestStat?.label || "None"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="xl:col-start-2 xl:row-start-1">
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/52">
                Center Stage
              </div>
              <div className="mt-3 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                {displayName}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {typeEntries.map((type) => (
                  <span
                    key={`${pokemonId}-center-${type.name}`}
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold ${getTypeBadgeClass(type.name)}`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mt-6 flex min-h-[24rem] w-full items-center justify-center overflow-hidden rounded-[2.3rem] border border-white/12 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0)_58%)] px-3 py-8 md:min-h-[26rem] xl:min-h-[36rem]">
              <div className={`absolute h-52 w-52 rounded-full blur-3xl ${theme.aura}`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]" />
              <div className="absolute inset-x-10 bottom-10 h-10 rounded-full bg-black/35 blur-2xl" />
              {artworkSrc ? (
                <Image
                  src={artworkSrc}
                  width={440}
                  height={440}
                  alt={displayName}
                  className="relative z-10 max-h-[100rem] w-auto object-contain drop-shadow-[0_35px_40px_rgba(0,0,0,0.48)]"
                  priority
                />
              ) : (
                <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border border-white/12 bg-white/10 text-sm text-white/65">
                  No image
                </div>
              )}
            </div>
          </section>

          <aside className="flex h-full flex-col rounded-[2rem] border border-white/12 bg-white/7 p-5 backdrop-blur-md xl:col-start-3 xl:row-start-1 xl:row-span-2 xl:self-stretch">
              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/48">Base Total</div>
                <div className="mt-2 text-[2.2rem] font-black leading-none text-white">{baseTotal}</div>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/48">Highest Stat</div>
                <div className="mt-2 text-lg font-black text-white">{highestStat?.label || "None"}</div>
                <div className="mt-1 text-base font-medium text-white/68">{highestStat?.value ?? 0}</div>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/48">Lowest Stat</div>
                <div className="mt-2 text-lg font-black text-white">{lowestStat?.label || "None"}</div>
                <div className="mt-1 text-base font-medium text-white/68">{lowestStat?.value ?? 0}</div>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/48">Speed Tier</div>
                <div className="mt-2 text-lg font-black text-white">{speedTier}</div>
                <div className="mt-1 text-base font-medium text-white/68">{speed} speed</div>
              </div>
            </div>

            <div className="mt-4 grid gap-2.5 xl:flex-1 xl:min-h-0 xl:grid-rows-6">
              {stats.map((stat) => (
                <div
                  key={`${pokemonId}-${stat.key}`}
                  className="flex min-h-[3.85rem] flex-col justify-center rounded-[1.2rem] border border-white/10 bg-black/20 px-3.5 py-2 xl:h-full"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white/84">{stat.label}</span>
                    <span className="text-[1.05rem] font-black text-white">{stat.value}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.meter}`}
                      style={{ width: getStatWidth(stat.value) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="w-full xl:col-start-1 xl:col-end-3 xl:row-start-2">
            <div className="rounded-[2rem] border border-white/12 bg-white/7 p-5 xl:p-6 backdrop-blur-md">
              <div className="grid gap-5 md:grid-cols-2">
                <MatchupPanel
                  phaseLabel="Defense"
                  title="Weak Against"
                  subtitle=""
                  tone="weakness"
                  items={weaknesses}
                  emptyLabel="No major weaknesses."
                  multiplierLabel="Damage taken"
                />
                <MatchupPanel
                  phaseLabel="Offense"
                  title="Strong Against"
                  subtitle=""
                  tone="strength"
                  items={strengths}
                  emptyLabel="No standout strengths."
                  multiplierLabel="Damage dealt"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/7 p-5 backdrop-blur-md">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
          <div className="absolute right-[-3rem] top-[-2rem] h-32 w-32 rounded-full bg-white/8 blur-3xl" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/58">
                Evolution Line
              </div>
              <div className="mt-2 text-sm text-white/68">
                {familyMembers.length > 1
                  ? "Click another stage in the line to open its detail page."
                  : "This Pokemon stands alone in the Kanto lineup."}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`rounded-full border px-4 py-2 text-sm font-semibold ${theme.badge}`}>
                {evolutionRole}
              </div>
              <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-white/72">
                {familyMembers.length} forms
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-4 lg:gap-2">
            {familyMembers.map((member, index) => (
              <Fragment key={getPokemonId(member)}>
                <EvolutionCard
                  member={member}
                  currentPokemonId={pokemonId}
                  backHref={backHref}
                  index={index}
                  total={familyMembers.length}
                />
                {index < familyMembers.length - 1 ? <EvolutionConnector /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
