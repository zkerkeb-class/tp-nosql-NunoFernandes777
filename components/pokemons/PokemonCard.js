"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const getTypeColor = (typeName) => {
  const colors = {
    Normal: "bg-gray-400",
    Fire: "bg-red-500",
    Water: "bg-blue-500",
    Grass: "bg-green-500",
    Electric: "bg-yellow-400",
    Ice: "bg-cyan-300",
    Fighting: "bg-orange-600",
    Poison: "bg-purple-500",
    Ground: "bg-amber-600",
    Flying: "bg-indigo-400",
    Psychic: "bg-pink-500",
    Bug: "bg-lime-500",
    Rock: "bg-stone-600",
    Ghost: "bg-violet-600",
    Dragon: "bg-indigo-600",
    Dark: "bg-gray-800",
    Steel: "bg-gray-500",
    Fairy: "bg-pink-300",
  };
  return colors[typeName] || "bg-gray-400";
};

export default function PokemonCard({
  pokemon,
  displayLanguage = "english",
  isAuthenticated = false,
  isFavorite = false,
  onToggleFavorite,
}) {
  const pathname = usePathname();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const primaryType = pokemon.types?.[0]?.name || "Normal";
  const typeColor = getTypeColor(primaryType);
  const pokemonNameRaw =
    pokemon.name?.[displayLanguage] ||
    pokemon.name?.english ||
    pokemon.name?.french ||
    pokemon.name?.japanese ||
    pokemon.name?.chinese ||
    pokemon.name;
  const pokemonName =
    typeof pokemonNameRaw === "string" ? pokemonNameRaw : "Pokemon";
  const pokemonId = pokemon.pokedex_id ?? pokemon.id_pokedex ?? pokemon.id;
  const imageSrc = pokemon.sprites?.regular;
  const hasValidImage =
    typeof imageSrc === "string" &&
    imageSrc.startsWith("https://raw.githubusercontent.com/");

  if (!pokemonId) {
    return null;
  }

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;
    const shiftX = (x - 0.5) * 16;
    const shiftY = (y - 0.5) * 12;
    const easing = 0.45;
    setTilt((prev) => ({
      rotateX: prev.rotateX + (rotateX - prev.rotateX) * easing,
      rotateY: prev.rotateY + (rotateY - prev.rotateY) * easing,
      shiftX: prev.shiftX + (shiftX - prev.shiftX) * easing,
      shiftY: prev.shiftY + (shiftY - prev.shiftY) * easing,
    }));
  };

  const resetTilt = () => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0 });
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(pokemonId);
    }
  };

  return (
    <Link href={`/pokemon/${pokemonId}?from=${encodeURIComponent(pathname || "/")}`} className="block group">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/10 ring-1 ring-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.22)] transition-[box-shadow,border-color] duration-300 hover:border-white/50 hover:shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
        style={{
          transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${isHovering ? -2 : 0}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${50 + tilt.shiftX * 2}% ${45 + tilt.shiftY * 2}%, rgba(255,255,255,0.22), rgba(255,255,255,0) 48%)`,
          }}
        />
        <div className="pointer-events-none absolute -top-12 left-1/2 h-28 w-[130%] -translate-x-1/2 rotate-[-8deg] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl"></div>

        <div className={`${typeColor} px-4 py-2.5 flex justify-between items-center border-b border-white/25`}>
          <span className="text-white/90 text-xs font-bold">#{String(pokemonId).padStart(3, "0")}</span>
          <div className="flex gap-1">
            {pokemon.types?.slice(0, 2).map((type) => (
              <span key={type.name} className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white/95 border border-white/25">
                <span className={`h-1.5 w-1.5 rounded-full ${typeColor}`}></span>
                {type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-white/12 to-white/6 p-6 flex items-center justify-center min-h-[180px]">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`absolute top-3 right-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                isFavorite
                  ? "bg-yellow-400 border-yellow-300 text-black"
                  : "bg-black/35 border-white/40 text-white hover:bg-black/50"
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M12 3.6l2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9z" />
              </svg>
            </button>
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {hasValidImage ? (
            <Image
              src={imageSrc}
              width={140}
              height={140}
              alt={pokemonName}
              className="relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
              style={{
                transform: `translate3d(${tilt.shiftX}px, ${tilt.shiftY}px, 30px) scale(${isHovering ? 1.06 : 1})`,
              }}
            />
          ) : (
            <div className="relative z-10 w-[140px] h-[140px] rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs font-semibold">
              No image
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-white/10 border-t border-white/20">
          <h2 className="text-lg font-bold text-white/95 text-center capitalize group-hover:text-cyan-100 transition-colors duration-300">
            {pokemonName}
          </h2>
        </div>
      </div>
    </Link>
  );
}
