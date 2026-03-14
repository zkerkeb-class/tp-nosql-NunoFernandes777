"use client";

import Image from "next/image";
import { useState } from "react";
import KantoMapExplorer from "@/components/journey/KantoMapExplorer";

const KANTO_BASE_GAMES = ["Pokemon Red", "Pokemon Green", "Pokemon Blue"];
const STARTER_POKEMONS = {
  1: { id: 1, name: "Bulbasaur", typeColor: "bg-green-500" },
  4: { id: 4, name: "Charmander", typeColor: "bg-red-500" },
  7: { id: 7, name: "Squirtle", typeColor: "bg-blue-500" },
  25: { id: 25, name: "Pikachu", typeColor: "bg-yellow-400" },
};
const GAME_DETAILS = {
  "Pokemon Red": {
    accent: "from-red-500/30 to-red-900/30",
    tabFill: "from-red-500/30 to-red-900/30",
    tabBorder: "border-red-400/90",
    tabGlow: "shadow-[0_0_18px_rgba(248,113,113,0.35)]",
    panelBorder: "border-red-400/90",
    text: "Classic Kanto journey with version-exclusive Pokemon and Gym progression.",
    starters: [1, 4, 7],
  },
  "Pokemon Green": {
    accent: "from-green-500/30 to-green-900/30",
    tabFill: "from-green-500/30 to-green-900/30",
    tabBorder: "border-emerald-400/90",
    tabGlow: "shadow-[0_0_18px_rgba(52,211,153,0.35)]",
    panelBorder: "border-emerald-400/90",
    text: "Original Japanese pair counterpart focused on the same Kanto adventure.",
    starters: [1, 4, 7],
  },
  "Pokemon Blue": {
    accent: "from-blue-500/30 to-blue-900/30",
    tabFill: "from-blue-500/30 to-blue-900/30",
    tabBorder: "border-sky-400/90",
    tabGlow: "shadow-[0_0_18px_rgba(56,189,248,0.35)]",
    panelBorder: "border-sky-400/90",
    text: "Refined Kanto version with its own encounter distribution and pacing.",
    starters: [1, 4, 7],
  },
  "Pokemon Yellow": {
    accent: "from-yellow-400/30 to-yellow-900/30",
    tabFill: "from-yellow-400/30 to-yellow-900/30",
    tabBorder: "border-amber-300/90",
    tabGlow: "shadow-[0_0_18px_rgba(252,211,77,0.35)]",
    panelBorder: "border-amber-300/90",
    text: "Pikachu-focused Kanto run with anime-inspired story adjustments.",
    starters: [25, 1, 4, 7],
  },
};

const MAP_VERSION_BY_GAME = {
  "Pokemon Red": "red",
  "Pokemon Green": "green",
  "Pokemon Blue": "blue",
  "Pokemon Yellow": "yellow",
};

export default function JourneyPage() {
  const [activeGame, setActiveGame] = useState(null);
  const [selectedStarterByGame, setSelectedStarterByGame] = useState({});

  const toggleGame = (game) => {
    setActiveGame((prev) => (prev === game ? null : game));
  };
  const toggleStarter = (game, starterId) => {
    setSelectedStarterByGame((prev) => ({
      ...prev,
      [game]: prev[game] === starterId ? null : starterId,
    }));
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {KANTO_BASE_GAMES.map((game) => (
              <button
                type="button"
                key={game}
                onClick={() => toggleGame(game)}
                className={`px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide transition-all ${
                  activeGame === game
                    ? `relative z-10 -mb-px rounded-t-xl rounded-b-none border-2 border-b-transparent bg-gradient-to-br ${GAME_DETAILS[game].tabFill} ${GAME_DETAILS[game].tabBorder} ${GAME_DETAILS[game].tabGlow}`
                    : "rounded-xl border border-white/25 bg-black/70 hover:bg-white/10"
                }`}
              >
                {game}
              </button>
            ))}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeGame
                ? `${KANTO_BASE_GAMES.includes(activeGame) ? "" : "mt-2"} max-h-[2200px] opacity-100`
                : "max-h-0 opacity-0"
            }`}
          >
            {activeGame && (
              <>
                <div
                  className={`rounded-b-2xl ${
                    activeGame === "Pokemon Green"
                      ? "rounded-t-2xl"
                      : activeGame === "Pokemon Blue"
                      ? "rounded-tr-none"
                      : "rounded-tr-2xl"
                  } border-2 bg-gradient-to-br ${GAME_DETAILS[activeGame].accent} ${GAME_DETAILS[activeGame].panelBorder} p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]`}
                >
                  {(() => {
                    const starters = GAME_DETAILS[activeGame].starters;
                    const selectedStarterId = selectedStarterByGame[activeGame] ?? null;
                    const columns = starters.length >= 4 ? 4 : 3;

                    return (
                      <>
                  <div className="mb-2 text-lg font-bold uppercase tracking-wide">{activeGame}</div>
                  <p className="text-sm text-white/90">{GAME_DETAILS[activeGame].text}</p>
                  <div className="mt-3 rounded-xl border border-white/25 bg-black/40 px-3 py-3 text-xs">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                      Starters
                    </div>
                    <div
                      className="grid gap-2"
                      style={{
                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                      }}
                    >
                      {starters.map((starterId) => {
                        const starter = STARTER_POKEMONS[starterId];
                        if (!starter) return null;
                        const isSelected = selectedStarterId === starter.id;
                        const hasSelected = selectedStarterId !== null;
                        const isDimmed = hasSelected && !isSelected;

                        return (
                          <button
                            type="button"
                            key={starter.id}
                            onClick={() => toggleStarter(activeGame, starter.id)}
                            className={`group overflow-hidden rounded-xl border bg-white/10 text-left transition-all ${
                              isSelected
                                ? "border-white/80 ring-2 ring-white/70 shadow-[0_0_14px_rgba(255,255,255,0.35)]"
                                : "border-white/25 hover:bg-white/15"
                            } ${isDimmed ? "opacity-45 grayscale saturate-50" : ""}`}
                          >
                            <div className={`${starter.typeColor} flex items-center justify-between border-b border-white/25 px-2 py-1`}>
                              <span className="text-[10px] font-bold text-white/90">
                                #{String(starter.id).padStart(3, "0")}
                              </span>
                            </div>
                            <div className="flex items-center justify-center bg-gradient-to-b from-white/12 to-white/6 p-2">
                              <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${starter.id}.png`}
                                width={56}
                                height={56}
                                alt={starter.name}
                                className="drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                            <div className="border-t border-white/20 bg-white/10 px-2 py-1.5 text-center text-[11px] font-semibold text-white/95">
                              {starter.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-4">
                    <KantoMapExplorer version={MAP_VERSION_BY_GAME[activeGame]} showVersionTabs={false} />
                  </div>
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </div>

          <div className="relative my-6 h-3 w-full">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-gradient-to-b from-black from-0% via-black via-48% to-white to-52% shadow-[0_0_12px_rgba(255,255,255,0.65)]">
              <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-white/95" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-black" />
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs">
            <button
              type="button"
              onClick={() => toggleGame("Pokemon Yellow")}
              className={`w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide transition-all ${
                activeGame === "Pokemon Yellow"
                  ? `border-2 bg-black/80 ${GAME_DETAILS["Pokemon Yellow"].tabBorder} ${GAME_DETAILS["Pokemon Yellow"].tabGlow}`
                  : "border-white/25 bg-black/70 hover:bg-white/10"
              }`}
            >
              Pokemon Yellow
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
