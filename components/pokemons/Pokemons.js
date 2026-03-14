"use client";

import { useEffect, useState } from "react";
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

export default function Pokemons({ filters, displayLanguage = "english" }) {
  const [pokemons, setPokemons] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    let isMounted = true;

    async function loadAuthAndFavorites() {
      try {
        const authResponse = await fetch("/api/auth/me", { cache: "no-store" });
        const authPayload = await authResponse.json();
        const authenticated = Boolean(authPayload?.authenticated);
        if (!isMounted) return;
        setIsAuthenticated(authenticated);

        if (!authenticated) {
          setFavorites(new Set());
          return;
        }

        const favoritesResponse = await fetch("/api/auth/favorites", { cache: "no-store" });
        const favoritesPayload = await favoritesResponse.json();
        if (!isMounted) return;
        const ids = Array.isArray(favoritesPayload?.favorites)
          ? favoritesPayload.favorites.map(Number).filter(Number.isFinite)
          : [];
        setFavorites(new Set(ids));
      } catch (_error) {
        if (isMounted) {
          setIsAuthenticated(false);
          setFavorites(new Set());
        }
      }
    }

    loadAuthAndFavorites();

    const onAuthChanged = () => {
      loadAuthAndFavorites();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth-changed", onAuthChanged);
    }

    return () => {
      isMounted = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("auth-changed", onAuthChanged);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemons() {
      try {
        const params = new URLSearchParams();
        if (filters?.name) params.set("name", filters.name);
        if (filters?.nameLanguage) params.set("nameLanguage", filters.nameLanguage);
        if (filters?.type) params.set("type", filters.type);
        if (filters?.sort) params.set("sort", filters.sort);
        if (filters?.page) params.set("page", String(filters.page));
        if (filters?.limit) params.set("limit", String(filters.limit));

        const query = params.toString();
        const url = query ? `/api/pokemons?${query}` : "/api/pokemons";
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load pokemons");
        }
        const payload = await response.json();
        if (isMounted) {
          const source = Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.data)
              ? payload.data
              : [];
          const list = source.map(toUiPokemon);
          setPokemons(list);
        }
      } catch (_error) {
        if (isMounted) {
          setPokemons([]);
        }
      }
    }

    loadPokemons();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  if (pokemons === null) {
    return <p>Loading pokemons...</p>;
  }

  const visiblePokemons = filters?.favoritesOnly
    ? pokemons.filter((pokemon) => favorites.has(Number(pokemon.id)))
    : pokemons;

  if (visiblePokemons.length === 0) {
    return <p>No pokemon found</p>;
  }

  const toggleFavorite = async (pokemonId) => {
    if (!isAuthenticated || !Number.isFinite(Number(pokemonId))) return;
    const id = Number(pokemonId);
    const currentlyFavorite = favorites.has(id);

    setFavorites((prev) => {
      const next = new Set(prev);
      if (currentlyFavorite) next.delete(id);
      else next.add(id);
      return next;
    });

    try {
      const response = await fetch(
        currentlyFavorite ? `/api/auth/favorites/${id}` : "/api/auth/favorites",
        currentlyFavorite
          ? { method: "DELETE" }
          : {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ pokemonId: id }),
            }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }

      const payload = await response.json();
      const ids = Array.isArray(payload?.favorites)
        ? payload.favorites.map(Number).filter(Number.isFinite)
        : [];
      setFavorites(new Set(ids));
    } catch (_error) {
      setFavorites((prev) => {
        const reverted = new Set(prev);
        if (currentlyFavorite) reverted.add(id);
        else reverted.delete(id);
        return reverted;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
      {visiblePokemons.map((pokemon, index) => (
        <PokemonCard
          key={`${pokemon.pokedex_id ?? pokemon.id_pokedex ?? pokemon.id ?? "pokemon"}-${index}`}
          pokemon={pokemon}
          displayLanguage={displayLanguage}
          isAuthenticated={isAuthenticated}
          isFavorite={favorites.has(Number(pokemon.id))}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
