"use client";

import { useMemo, useState } from "react";
import Pokemons from "@/components/pokemons/Pokemons";

const FULL_CATALOG_LIMIT = 1000;

const TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

export default function PokedexExplorer() {
  const [name, setName] = useState("");
  const [nameLanguage, setNameLanguage] = useState("english");
  const [type, setType] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("none");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const sortValue = useMemo(() => {
    if (sortDirection === "none") return "";
    const fieldMap = {
      name: "name",
      hp: "base.HP",
      attack: "base.Attack",
      defense: "base.Defense",
      specialAttack: "base.SpecialAttack",
      specialDefense: "base.SpecialDefense",
      speed: "base.Speed",
    };
    const selectedField = fieldMap[sortField] || "name";
    return sortDirection === "desc" ? `-${selectedField}` : selectedField;
  }, [sortField, sortDirection]);

  const filters = useMemo(
    () => ({
      name: name.trim(),
      nameLanguage,
      type,
      sort: sortValue,
      favoritesOnly,
      limit: FULL_CATALOG_LIMIT,
    }),
    [name, nameLanguage, type, sortValue, favoritesOnly]
  );

  const cycleSortDirection = () => {
    setSortDirection((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <>
      <div className="mb-10">
        <div className="mb-5">
          <div
            onClick={toggleFilters}
            className="cursor-pointer select-none rounded-[1.5rem] border border-white/18 bg-white/8 px-4 py-4 backdrop-blur-md transition-colors hover:bg-white/12"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300/70">Search Controls</div>
                <div className="mt-1 text-sm font-bold text-white">
                  {showFilters ? "Filters are open" : "Keep filters tucked away until needed"}
                </div>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="h-1.5 w-10 rounded-full bg-white/35" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/75">
                  {showFilters ? "Hide" : "Reveal"}
                </span>
                <span className="h-1.5 w-10 rounded-full bg-white/35" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            showFilters ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-3 rounded-[1.75rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:grid-cols-4">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={nameLanguage}
                onChange={(e) => setNameLanguage(e.target.value)}
                className="sm:col-span-1 h-11 rounded-xl border border-white/25 bg-slate-950 px-4 text-white outline-none focus:border-cyan-300"
              >
                <option value="english">English</option>
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
              </select>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Search by name"
                className="sm:col-span-2 h-11 rounded-xl border border-white/25 bg-slate-950 px-4 text-white placeholder:text-gray-300 outline-none focus:border-cyan-300"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-11 rounded-xl border border-white/25 bg-slate-950 px-4 text-white outline-none focus:border-cyan-300"
            >
              <option value="">All types</option>
              {TYPES.map((typeName) => (
                <option key={typeName} value={typeName}>
                  {typeName}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="flex-1 h-11 rounded-xl border border-white/25 bg-slate-950 px-4 text-white outline-none focus:border-cyan-300"
              >
                <option value="name">Name</option>
                <option value="hp">HP</option>
                <option value="attack">Attack</option>
                <option value="defense">Defense</option>
                <option value="specialAttack">Special Attack</option>
                <option value="specialDefense">Special Defense</option>
                <option value="speed">Speed</option>
              </select>

              <button
                type="button"
                onClick={cycleSortDirection}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-slate-950 text-white transition-colors hover:bg-white/10"
                aria-label="Change sort direction"
              >
                {sortDirection === "none" ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 6v12" />
                    <path d="M8 6l-3 3" />
                    <path d="M8 6l3 3" />
                    <path d="M16 18V6" />
                    <path d="M16 18l-3-3" />
                    <path d="M16 18l3-3" />
                  </svg>
                ) : sortDirection === "asc" ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 18V6" />
                    <path d="M12 6l-4 4" />
                    <path d="M12 6l4 4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6v12" />
                    <path d="M12 18l-4-4" />
                    <path d="M12 18l4-4" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => setFavoritesOnly((prev) => !prev)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                  favoritesOnly
                    ? "bg-yellow-400 border-yellow-300 text-black"
                    : "bg-slate-950 border-white/30 text-white hover:bg-white/10"
                }`}
                aria-label="Show only favorites"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill={favoritesOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 3.6l2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Pokemons filters={filters} displayLanguage={nameLanguage} />
    </>
  );
}
