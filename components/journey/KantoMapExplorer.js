"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import kantoTrainers from "../../data/kanto_trainers.json";
import pokedexData from "../../data/pokemons.json";
import brockSprite from "../../data/GymLeaders_sprites/Spr_RG_Brock.png";
import mistySprite from "../../data/GymLeaders_sprites/Spr_RG_Misty.png";
import ltSurgeSprite from "../../data/GymLeaders_sprites/Spr_RG_Lt_Surge.png";
import erikaSprite from "../../data/GymLeaders_sprites/Spr_RG_Erika.png";
import kogaSprite from "../../data/GymLeaders_sprites/Spr_RG_Koga.png";
import sabrinaSprite from "../../data/GymLeaders_sprites/Spr_RG_Sabrina.png";
import blaineSprite from "../../data/GymLeaders_sprites/Spr_RG_Blaine.png";
import giovanniSprite from "../../data/GymLeaders_sprites/Spr_RG_Giovanni.png";
import loreleiSprite from "../../data/EliteFour_sprites/Spr_RG_Lorelei.png";
import brunoSprite from "../../data/EliteFour_sprites/Spr_RG_Bruno.png";
import agathaSprite from "../../data/EliteFour_sprites/Spr_RG_Agatha.png";
import lanceSprite from "../../data/EliteFour_sprites/Spr_RG_Lance.png";

const VERSION_KEYS = ["red", "green", "blue", "yellow"];
const KANTO_MAP_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Kanto_Map.png";
const KANTO_MAP_SOURCE = "https://commons.wikimedia.org/wiki/File:Kanto_Map.png";
const CIRCLE_MARKER_IDS = new Set([
  "RockTunnel",
  "power",
  "diggletscavewest",
  "diggletscaveeast",
  "seafoam",
  "mt-moon",
  "ViridianForest",
  "victory",
]);
const BLUE_MARKER_AREA_IDS = new Set(["cinnabar", "pallet", "lavender"]);
const RED_MARKER_AREA_IDS = new Set([
  "indigo",
  "pewter",
  "viridian",
  "celadon",
  "saffron",
  "cerulean",
  "vermilion",
  "fuchsia",
]);
const WATER_ENCOUNTER_AREA_IDS = new Set(["cerulean", "vermilion", "fuchsia", "cinnabar", "seafoam"]);

const GYM_LEADER_SPRITES = {
  Brock: brockSprite,
  Misty: mistySprite,
  "Lt. Surge": ltSurgeSprite,
  Erika: erikaSprite,
  Koga: kogaSprite,
  Sabrina: sabrinaSprite,
  Blaine: blaineSprite,
  Giovanni: giovanniSprite,
};

const ELITE_FOUR_SPRITES = {
  Lorelei: loreleiSprite,
  Bruno: brunoSprite,
  Agatha: agathaSprite,
  Lance: lanceSprite,
};

const TRAINER_SPRITES = {
  ...GYM_LEADER_SPRITES,
  ...ELITE_FOUR_SPRITES,
};

const POKEDEX_NAME_BY_ID = new Map(
  (pokedexData || []).map((pokemon) => [pokemon.id, pokemon.name?.english || pokemon.name?.french || `Pokemon #${pokemon.id}`])
);

const POKEMON = {
  1: "Bulbasaur",
  4: "Charmander",
  7: "Squirtle",
  10: "Caterpie",
  11: "Metapod",
  13: "Weedle",
  14: "Kakuna",
  16: "Pidgey",
  19: "Rattata",
  21: "Spearow",
  23: "Ekans",
  25: "Pikachu",
  26: "Raichu",
  27: "Sandshrew",
  35: "Clefairy",
  37: "Vulpix",
  39: "Jigglypuff",
  41: "Zubat",
  42: "Golbat",
  43: "Oddish",
  50: "Diglett",
  51: "Dugtrio",
  48: "Venonat",
  52: "Meowth",
  54: "Psyduck",
  56: "Mankey",
  58: "Growlithe",
  60: "Poliwag",
  63: "Abra",
  66: "Machop",
  67: "Machoke",
  69: "Bellsprout",
  72: "Tentacool",
  74: "Geodude",
  75: "Graveler",
  77: "Ponyta",
  79: "Slowpoke",
  81: "Magnemite",
  83: "Farfetch'd",
  86: "Seel",
  87: "Dewgong",
  88: "Grimer",
  90: "Shellder",
  92: "Gastly",
  95: "Onix",
  98: "Krabby",
  100: "Voltorb",
  104: "Cubone",
  108: "Lickitung",
  109: "Koffing",
  111: "Rhyhorn",
  113: "Chansey",
  114: "Tangela",
  120: "Staryu",
  122: "Mr. Mime",
  123: "Scyther",
  125: "Electabuzz",
  126: "Magmar",
  127: "Pinsir",
  129: "Magikarp",
  131: "Lapras",
  133: "Eevee",
  137: "Porygon",
  138: "Omanyte",
  140: "Kabuto",
  143: "Snorlax",
  144: "Articuno",
  145: "Zapdos",
  146: "Moltres",
};

const AREAS = [
  {
    id: "pallet",
    name: "Pallet Town",
    kind: "Town",
    x: 29.9,
    y: 69.9,
    summary: "Your start point. Choose your first Pokemon and begin the Kanto run.",
    wild: { red: [], green: [], blue: [], yellow: [] },
    landmarks: ["Professor Oak's Lab", "Starter Selection"],
  },
  {
    id: "viridian",
    name: "Viridian City",
    kind: "City",
    x: 29.9,
    y: 49.9,
    summary: "First major stop before heading north to Pewter and east to Route 22.",
    wild: { red: [16, 19], green: [16, 19], blue: [16, 19], yellow: [16, 19] },
    landmarks: ["Viridian Gym", "Trainer School"],
    gym: { leader: "Giovanni", type: "Ground" },
  },
  {
    id: "pewter",
    name: "Pewter City",
    kind: "Gym",
    x: 29.9,
    y: 20,
    summary: "Rock-type Gym. Brock blocks your first badge challenge.",
    wild: { red: [74, 95], green: [74, 95], blue: [74, 95], yellow: [74, 95] },
    landmarks: ["Boulder Badge", "Pewter Museum"],
    gym: { leader: "Brock", type: "Rock" },
  },
  {
    id: "mt-moon",
    name: "Mt. Moon",
    kind: "Cave",
    x: 46.8,
    y: 20,
    summary: "Cave route to Cerulean with fossils and heavy Zubat/Geodude encounters.",
    wild: { red: [41, 74, 35], green: [41, 74, 35], blue: [41, 74, 35], yellow: [41, 74, 35] },
    landmarks: ["Fossil Choice", "Team Rocket Event", "Rare Clefairy Spot"],
  },
  {
    id: "cerulean",
    name: "Cerulean City",
    kind: "Gym",
    x: 62.9,
    y: 20,
    summary: "Misty's Water Gym and one of the strongest mid-early progression hubs.",
    wild: { red: [54, 60], green: [54, 60], blue: [54, 60], yellow: [54, 60] },
    landmarks: ["Cascade Badge", "Bike Voucher Route"],
    gym: { leader: "Misty", type: "Water" },
  },
  {
    id: "saffron",
    name: "Saffron City",
    kind: "Gym",
    x: 62.8,
    y: 38.3,
    summary: "Central Kanto city with Silph Co. and Sabrina's Psychic Gym.",
    wild: { red: [63, 100], green: [63, 100], blue: [63, 100], yellow: [63, 100] },
    landmarks: ["Marsh Badge", "Silph Co."],
    gym: { leader: "Sabrina", type: "Psychic" },
  },
  {
    id: "celadon",
    name: "Celadon City",
    kind: "Gym",
    x: 48.1,
    y: 38.3,
    summary: "Shopping city and Erika's Grass Gym. Major item progression area.",
    wild: { red: [43, 52], green: [43, 52], blue: [43, 52], yellow: [43, 52] },
    landmarks: ["Rainbow Badge", "Department Store", "Eevee Gift"],
    gym: { leader: "Erika", type: "Grass" },
  },
  {
    id: "lavender",
    name: "Lavender Town",
    kind: "Town",
    x: 83.45,
    y: 38.3,
    summary: "Pokemon Tower ghost arc and a key story checkpoint.",
    wild: { red: [92, 109], green: [92, 109], blue: [92, 109], yellow: [92, 109] },
    landmarks: ["Pokemon Tower", "Poke Flute Event"],
  },
  {
    id: "vermilion",
    name: "Vermilion City",
    kind: "Gym",
    x: 62.85,
    y: 53.5,
    summary: "Lt. Surge's Electric Gym and the S.S. Anne questline.",
    wild: { red: [72, 98, 90], green: [72, 98, 90], blue: [72, 98, 90], yellow: [72, 98, 90] },
    landmarks: ["Thunder Badge", "S.S. Anne"],
    gym: { leader: "Lt. Surge", type: "Electric" },
  },
  {
    id: "fuchsia",
    name: "Fuchsia City",
    kind: "Gym",
    x: 57.8,
    y: 77.95,
    summary: "Koga's Poison Gym and access to Safari Zone catches.",
    wild: { red: [48, 111], green: [48, 111], blue: [48, 111], yellow: [48, 111] },
    landmarks: ["Soul Badge", "Safari Zone"],
    gym: { leader: "Koga", type: "Poison" },
  },
  {
    id: "cinnabar",
    name: "Cinnabar Island",
    kind: "Gym",
    x: 29.9,
    y: 87.73,
    summary: "Blaine's Fire Gym and late-game sea routes.",
    wild: { red: [72, 126], green: [72, 126], blue: [72, 126], yellow: [72, 126] },
    landmarks: ["Volcano Badge", "Pokemon Lab"],
    gym: { leader: "Blaine", type: "Fire" },
  },
  {
    id: "seafoam",
    name: "Seafoam Islands",
    kind: "Cave",
    x: 43.94,
    y: 87.73,
    summary: "Ice cave system and Articuno's legendary encounter zone.",
    wild: { red: [86, 90, 79, 42], green: [86, 90, 79, 42], blue: [86, 90, 79, 42], yellow: [86, 90, 79, 42] },
    landmarks: ["Articuno", "Sea Current Puzzle", "Ice Route Cave"],
  },
  {
    id: "power",
    name: "Power Plant",
    kind: "Facility",
    x: 86.15,
    y: 25.85,
    summary: "Electric-focused side area with Zapdos encounter.",
    wild: { red: [81, 100, 125], green: [81, 100, 125], blue: [81, 100, 125], yellow: [81, 100, 125] },
    landmarks: ["Zapdos", "Voltorb Field", "High-Level Electric Encounters"],
  },
  {
    id: "victory",
    name: "Victory Road",
    kind: "Cave",
    x: 13.3,
    y: 29.6,
    summary: "Final cave gauntlet before the Indigo Plateau elite battles.",
    wild: { red: [42, 67, 75, 95], green: [42, 67, 75, 95], blue: [42, 67, 75, 95], yellow: [42, 67, 75, 95] },
    landmarks: ["Strength Puzzles", "Final Trainers"],
  },
  {
    id: "indigo",
    name: "Indigo Plateau",
    kind: "League",
    x: 13.3,
    y: 15.55,
    summary: "Pokemon League challenge against Elite Four and Champion.",
    wild: { red: [], green: [], blue: [], yellow: [] },
    landmarks: ["Elite Four", "Champion Battle"],
  },
  {
    id: "diggletscavewest",
    name: "Digglet's Cave West",
    kind: "Cave",
    x: 29.9,
    y: 27.85,
    summary: "Western entrance of Diglett's Cave near Route 2 / Pewter side.",
    wild: { red: [50, 51], green: [50, 51], blue: [50, 51], yellow: [50, 51] },
    landmarks: ["Route 2 Exit", "Shortcut to Vermilion"],
  },
  {
    id: "diggletscaveeast",
    name: "Digglet's Cave East",
    kind: "Cave",
    x: 69.2,
    y: 53.5,
    summary: "Eastern entrance of Diglett's Cave near Vermilion City.",
    wild: { red: [50, 51], green: [50, 51], blue: [50, 51], yellow: [50, 51] },
    landmarks: ["Vermilion Entrance", "Route 11 Access"],
  },
  {
    id: "ViridianForest",
    name: "Viridian Forest",
    kind: "Forest",
    x: 29.9,
    y: 36.3,
    summary: "Early forest zone filled with bug Pokemon and rare Pikachu encounters.",
    wild: { red: [10, 11, 13, 14, 25], green: [10, 11, 13, 14, 25], blue: [10, 11, 13, 14, 25], yellow: [10, 11, 13, 14, 25] },
    landmarks: ["Bug Catcher Path", "Pikachu Encounter"],
  },
  {
    id: "RockTunnel",
    name: "Rock Tunnel",
    kind: "Cave",
    x: 83.45,
    y: 20,
    summary: "Dark cave route connecting Cerulean side to Lavender Town.",
    wild: { red: [41, 66, 74, 95, 104], green: [41, 66, 74, 95, 104], blue: [41, 66, 74, 95, 104], yellow: [41, 66, 74, 95, 104] },
    landmarks: ["Flash Recommended", "Long Trainer Tunnel"],
  },
];

function getPokemonData(id) {
  const numericId = Number(id);
  const safeId = Number.isFinite(numericId) ? numericId : id;
  return {
    id: safeId,
    name: POKEDEX_NAME_BY_ID.get(safeId) || POKEMON[safeId] || `Pokemon #${safeId}`,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${safeId}.png`,
  };
}

function splitEvenly(list) {
  const midpoint = Math.ceil(list.length / 2);
  return [list.slice(0, midpoint), list.slice(midpoint)];
}

function getEncounterGroups(area, version) {
  const baseWild = [...new Set(area.wild[version] || [])];
  if (baseWild.length === 0) return [];

  if (area.kind === "Cave") {
    return [{ method: "cave", pokemonIds: baseWild }];
  }

  if (area.kind === "Forest") {
    return [{ method: "grass", pokemonIds: baseWild }];
  }

  if (WATER_ENCOUNTER_AREA_IDS.has(area.id)) {
    const [surfGroup, fishingGroup] = splitEvenly(baseWild);
    return [
      { method: "surf", pokemonIds: surfGroup },
      { method: "fishing", pokemonIds: fishingGroup },
    ].filter((group) => group.pokemonIds.length > 0);
  }

  return [{ method: "grass", pokemonIds: baseWild }];
}

function formatMethod(method) {
  if (method === "grass") return "In Grass";
  if (method === "cave") return "In Cave";
  if (method === "surf") return "Surfing";
  if (method === "fishing") return "Fishing";
  return method;
}

export default function KantoMapExplorer({ version: versionProp, showVersionTabs = true }) {
  const [versionState, setVersionState] = useState("red");
  const [selectedAreaId, setSelectedAreaId] = useState("pallet");
  const [activeTrainerName, setActiveTrainerName] = useState(null);
  const pathname = usePathname();
  const version = versionProp || versionState;
  const fromPath = typeof pathname === "string" && pathname.startsWith("/") ? pathname : "/journey/map";
  const trainerByName = useMemo(() => {
    const map = new Map();
    (kantoTrainers.gymLeaders || []).forEach((trainer) => map.set(trainer.name, { ...trainer, role: "Gym Leader" }));
    (kantoTrainers.eliteFour || []).forEach((trainer) => map.set(trainer.name, { ...trainer, role: "Elite Four" }));
    return map;
  }, []);

  const selectedArea = useMemo(
    () => AREAS.find((area) => area.id === selectedAreaId) || AREAS[0],
    [selectedAreaId]
  );

  const encounterGroups = getEncounterGroups(selectedArea, version);
  const gymLeaderSprite = selectedArea.gym ? GYM_LEADER_SPRITES[selectedArea.gym.leader] : null;
  const showEliteFour = selectedArea.id === "indigo";
  const activeTrainer = activeTrainerName ? trainerByName.get(activeTrainerName) || null : null;
  const activeTrainerSprite = activeTrainer ? TRAINER_SPRITES[activeTrainer.name] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr]">
        <section className="rounded-3xl border border-white/25 bg-white/10 p-4 backdrop-blur-xl">
        {showVersionTabs ? (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {VERSION_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setVersionState(key)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  version === key
                    ? "bg-white text-black"
                    : "border border-white/30 bg-black/60 text-white hover:bg-white/10"
                }`}
              >
                {`Pokemon ${key}`}
              </button>
            ))}
          </div>
        ) : null}

        <div className="relative aspect-[1177/1056] overflow-hidden rounded-2xl border border-white/20 bg-black">
          <img
            src={KANTO_MAP_IMAGE}
            alt="Kanto map base"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30" />

          {AREAS.map((area) => {
            const isActive = area.id === selectedAreaId;
            const isCircleMarker = CIRCLE_MARKER_IDS.has(area.id);
            const isBlueMarker = BLUE_MARKER_AREA_IDS.has(area.id);
            const isRedMarker = RED_MARKER_AREA_IDS.has(area.id);
            const markerColorClasses = isCircleMarker
              ? isActive
                ? "border-emerald-200 bg-emerald-500 shadow-[0_0_0_2px_rgba(0,0,0,0.5)]"
                : "border-emerald-300/90 bg-emerald-700 hover:bg-emerald-600"
              : isBlueMarker
              ? isActive
                ? "border-blue-200 bg-blue-500 shadow-[0_0_0_2px_rgba(0,0,0,0.5)]"
                : "border-blue-300/90 bg-blue-700 hover:bg-blue-600"
              : isRedMarker
              ? isActive
                ? "border-red-200 bg-red-500 shadow-[0_0_0_2px_rgba(0,0,0,0.5)]"
                : "border-red-300/90 bg-red-700 hover:bg-red-600"
              : isActive
              ? "border-pink-200 bg-pink-500 shadow-[0_0_0_2px_rgba(0,0,0,0.5)]"
              : "border-pink-300/90 bg-pink-700 hover:bg-pink-600";
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedAreaId(area.id)}
                aria-label={area.name}
                title={area.name}
                className={`absolute -translate-x-1/2 -translate-y-1/2 h-6.5 w-6.5 border p-0 transition-all ${
                  isActive ? "z-20" : "z-10"
                } ${markerColorClasses} ${isCircleMarker ? "rounded-full" : "rounded-none"}`}
                style={{ left: `${area.x}%`, top: `${area.y}%` }}
              />
            );
          })}
        </div>
        <p className="mt-2 text-[10px] text-white/60">
          Map base:{" "}
          <a href={KANTO_MAP_SOURCE} target="_blank" rel="noreferrer" className="underline hover:text-white/85">
            Wikimedia Commons (CC0)
          </a>
        </p>

        <div className="mt-4 rounded-2xl border border-white/20 bg-black/40 p-3">
          <div className="mb-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{selectedArea.kind}</p>
            <h2 className="text-xl font-black uppercase tracking-wide">{selectedArea.name}</h2>
          </div>
          <p className="mb-3 text-sm text-white/85">{selectedArea.summary}</p>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/70">Key Landmarks</p>
          <div className="flex flex-wrap gap-2">
            {selectedArea.landmarks.map((landmark) => (
              <span
                key={landmark}
                className="rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[11px] font-semibold"
              >
                {landmark}
              </span>
            ))}
          </div>
        </div>
        </section>

        <aside className="rounded-3xl border border-white/25 bg-white/10 p-4 backdrop-blur-xl">
          <div className="mb-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/70">Region Trainers</p>
            {selectedArea.gym ? (
              <button
                type="button"
                onClick={() => setActiveTrainerName(selectedArea.gym.leader)}
                className="w-full rounded-xl border border-white/25 bg-black/45 p-3 text-xs text-left transition-colors hover:bg-white/10"
              >
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/70">Gym Leader</div>
                <div className="flex items-center gap-3">
                  {gymLeaderSprite ? (
                    <Image
                      src={gymLeaderSprite}
                      alt={selectedArea.gym.leader}
                      width={72}
                      height={72}
                      className="rounded-lg border border-white/20 bg-black/30 p-1"
                    />
                  ) : null}
                  <div>
                    <div className="text-sm font-bold text-white">{selectedArea.gym.leader}</div>
                    <div className="mt-1 inline-flex rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
                      {selectedArea.gym.type}-type Gym
                    </div>
                  </div>
                </div>
              </button>
            ) : null}

            {showEliteFour ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(kantoTrainers.eliteFour || []).map((member) => (
                  <button
                    key={member.name}
                    type="button"
                    onClick={() => setActiveTrainerName(member.name)}
                    className="rounded-xl border border-white/25 bg-black/45 p-2 transition-colors hover:bg-white/10"
                  >
                    <div className="flex justify-center">
                      {ELITE_FOUR_SPRITES[member.name] ? (
                        <Image
                          src={ELITE_FOUR_SPRITES[member.name]}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="rounded-lg border border-white/20 bg-black/30 p-1"
                        />
                      ) : null}
                    </div>
                    <div className="mt-2 text-center text-[11px] font-bold text-white">{member.name}</div>
                    <div className="text-center text-[10px] text-white/70">{member.specialtyType}</div>
                  </button>
                ))}
              </div>
            ) : null}
            {!selectedArea.gym && !showEliteFour ? (
              <div className="rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-xs text-white/75">
                No Gym Leader or Elite Four member tied to this area.
              </div>
            ) : null}
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/70">
              Wild Pokemon ({`Pokemon ${version}`})
            </p>
            {encounterGroups.length === 0 ? (
              <div className="rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-xs text-white/75">
                No standard wild encounters listed for this zone.
              </div>
            ) : (
              <div className="space-y-3">
                {encounterGroups.map((group) => (
                  <div
                    key={`${selectedArea.id}-${group.method}`}
                    className="rounded-xl border border-white/20 bg-black/35 p-2"
                  >
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                      {formatMethod(group.method)}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {group.pokemonIds.map((id) => {
                        const mon = getPokemonData(id);
                        return (
                          <Link
                            key={`${selectedArea.id}-${group.method}-${id}`}
                            href={`/pokemon/${id}?from=${encodeURIComponent(fromPath)}`}
                            className="group rounded-xl border border-white/25 bg-black/45 p-2 transition-colors hover:bg-white/10"
                          >
                            <div className="mb-1 text-[10px] font-bold text-white/75">#{String(id).padStart(3, "0")}</div>
                            <div className="flex justify-center">
                              <Image
                                src={mon.image}
                                alt={mon.name}
                                width={56}
                                height={56}
                                className="drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="mt-1 text-center text-[11px] font-semibold text-white/95">{mon.name}</div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {activeTrainer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-2xl border border-white/25 bg-zinc-950 p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {activeTrainerSprite ? (
                  <Image
                    src={activeTrainerSprite}
                    alt={activeTrainer.name}
                    width={72}
                    height={72}
                    className="rounded-lg border border-white/20 bg-black/30 p-1"
                  />
                ) : null}
                <div>
                  <div className="text-lg font-black uppercase tracking-wide text-white">{activeTrainer.name}</div>
                  <div className="mt-1 inline-flex rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
                    {activeTrainer.role} - {activeTrainer.specialtyType}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTrainerName(null)}
                className="rounded-lg border border-white/25 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            {(activeTrainer.team || []).length === 0 ? (
              <div className="rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-xs text-white/75">
                No team data yet for this trainer.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeTrainer.team.map((member, index) => {
                  const hasPokemonId = Number.isFinite(Number(member.pokemonId));
                  const mon = hasPokemonId ? getPokemonData(member.pokemonId) : null;
                  const stats = member.stats || {};

                  return (
                    <div key={`${activeTrainer.name}-${index}`} className="rounded-xl border border-white/20 bg-black/35 p-3">
                      <div className="mb-2 flex items-center gap-3">
                        {hasPokemonId ? (
                          <Image
                            src={mon.image}
                            alt={mon.name}
                            width={56}
                            height={56}
                            className="rounded-md border border-white/20 bg-black/30"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-white/20 bg-black/30 text-[10px] text-white/60">
                            N/A
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold text-white">{hasPokemonId ? mon.name : "Unknown Pokemon"}</div>
                          <div className="text-[11px] text-white/70">
                            {hasPokemonId ? `#${String(mon.id).padStart(3, "0")}` : "#---"} - Lv {member.level ?? "-"}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-white/85">
                        <span>HP: {stats.hp ?? "-"}</span>
                        <span>ATK: {stats.attack ?? "-"}</span>
                        <span>DEF: {stats.defense ?? "-"}</span>
                        <span>SpA: {stats.specialAttack ?? "-"}</span>
                        <span>SpD: {stats.specialDefense ?? "-"}</span>
                        <span>SPD: {stats.speed ?? "-"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
