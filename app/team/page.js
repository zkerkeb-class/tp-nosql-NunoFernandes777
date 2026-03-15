"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PokemonCard from "@/components/pokemons/PokemonCard";

function toUiPokemon(pokemon) {
  const id = pokemon?.id;
  const safeImage =
    typeof pokemon?.image === "string" &&
    pokemon.image.startsWith("https://raw.githubusercontent.com/")
      ? pokemon.image
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return {
    id,
    id_pokedex: id,
    pokedex_id: id,
    name: {
      english: pokemon?.name?.english || "Pokemon",
      french: pokemon?.name?.french || pokemon?.name?.english || "Pokemon",
      japanese: pokemon?.name?.japanese || pokemon?.name?.english || "Pokemon",
      chinese: pokemon?.name?.chinese || pokemon?.name?.english || "Pokemon",
    },
    types: Array.isArray(pokemon?.type)
      ? pokemon.type.map((typeName) => ({ name: typeName }))
      : [{ name: "Normal" }],
    sprites: {
      regular: safeImage,
    },
  };
}

const EMPTY_TEAM = Array(6).fill(null);

export default function TeamPage() {
  const [team, setTeam] = useState(EMPTY_TEAM);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPokedex() {
      try {
        const response = await fetch("/api/pokemons?limit=1000", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to load pokedex");
        const payload = await response.json();
        const source = Array.isArray(payload?.data) ? payload.data : [];
        if (mounted) {
          setAllPokemons(source.map(toUiPokemon));
        }
      } catch (_error) {
        if (mounted) {
          setAllPokemons([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPokedex();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredPokemons = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allPokemons;
    return allPokemons.filter((pokemon) =>
      String(pokemon?.name?.english || "").toLowerCase().includes(query)
    );
  }, [allPokemons, search]);

  const openPickerForSlot = (slotIndex) => {
    setActiveSlot(slotIndex);
    setPickerOpen(true);
  };

  const choosePokemon = (pokemon) => {
    if (activeSlot === null) return;
    setTeam((prev) => {
      const next = [...prev];
      next[activeSlot] = pokemon;
      return next;
    });
    setPickerOpen(false);
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
            My Team
          </h1>
          <p className="text-white/70 mt-2">
            Choose 6 Pokemon for your team
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((slotPokemon, index) => (
            <div key={`team-slot-${index}`} className="relative">
              {slotPokemon ? (
                <div className="space-y-2">
                  <PokemonCard pokemon={slotPokemon} displayLanguage="english" />
                  <button
                    type="button"
                    onClick={() => openPickerForSlot(index)}
                    className="w-full rounded-xl border border-white/25 bg-white/10 py-2 text-sm font-semibold hover:bg-white/20 transition-colors"
                  >
                    Change Pokemon
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openPickerForSlot(index)}
                  className="w-full min-h-[295px] rounded-2xl border border-dashed border-white/40 bg-white/5 hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                  aria-label={`Add Pokemon to slot ${index + 1}`}
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 text-4xl font-light text-white/80">
                    +
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {pickerOpen ? (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-4">
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl border border-white/20 bg-zinc-900/95 max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-white/15 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Select a Pokemon</h2>
              <button
                type="button"
                onClick={() => {
                  setPickerOpen(false);
                  setSearch("");
                }}
                className="rounded-lg border border-white/25 px-3 py-1.5 text-sm hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="p-4 border-b border-white/15">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pokemon by english name..."
                className="w-full h-11 rounded-xl border border-white/25 bg-black px-4 text-white outline-none focus:border-cyan-300"
              />
            </div>

            <div className="overflow-y-auto p-3 space-y-2">
              {loading ? (
                <p className="text-white/70 p-3">Loading pokedex...</p>
              ) : filteredPokemons.length === 0 ? (
                <p className="text-white/70 p-3">No pokemon found.</p>
              ) : (
                filteredPokemons.map((pokemon) => (
                  <button
                    key={`picker-${pokemon.id}`}
                    type="button"
                    onClick={() => choosePokemon(pokemon)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Image
                        src={pokemon.sprites?.regular}
                        width={52}
                        height={52}
                        alt={pokemon.name?.english || "Pokemon"}
                        className="drop-shadow-md"
                      />
                      <div className="min-w-0">
                        <p className="font-bold truncate">
                          #{String(pokemon.id).padStart(3, "0")} {pokemon.name?.english}
                        </p>
                        <p className="text-xs text-white/70 truncate">
                          {pokemon.types?.map((t) => t.name).join(" / ")}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold rounded-full border border-white/20 px-2 py-1">
                      Select
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
