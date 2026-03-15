import Link from "next/link";

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

export default function PokemonEvolution({ evolution }) {
  if (!evolution || (!evolution.name && !evolution.name?.en && !evolution.name?.fr) || !evolution.pokedex_id) {
    return null;
  }

  const primaryType = evolution.types?.[0]?.name || "Normal";
  const typeColor = getTypeColor(primaryType);

  const getEvolutionCondition = () => {
    if (evolution.condition) {
      if (typeof evolution.condition === "string") {
        const levelMatch = evolution.condition.match(/level[:\s]*(\d+)/i) || evolution.condition.match(/(\d+)/);
        if (levelMatch) {
          return `Level ${levelMatch[1]}`;
        }
        return evolution.condition;
      }
      if (typeof evolution.condition === "number") {
        return `Level ${evolution.condition}`;
      }
    }
    if (evolution.level) {
      return `Level ${evolution.level}`;
    }
    if (evolution.evolution_condition) {
      return evolution.evolution_condition;
    }
    return null;
  };

  const condition = getEvolutionCondition();
  const pokemonNameRaw =
    evolution.name?.en ||
    evolution.name?.english ||
    evolution.name?.fr ||
    evolution.name;
  const pokemonName =
    typeof pokemonNameRaw === "string" ? pokemonNameRaw : "Pokemon";

  return (
    <Link href={`/pokemon/${evolution.pokedex_id}`} className="group block w-full max-w-[180px]">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-yellow-400 overflow-hidden hover:-translate-y-1">
        <div className={`${typeColor} px-4 py-2 flex justify-between items-center`}>
          <span className="text-white text-xs font-bold opacity-90">#{String(evolution.pokedex_id).padStart(3, "0")}</span>
          {evolution.types?.[0] && (
            <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-semibold text-white">
              {evolution.types[0].name}
            </span>
          )}
        </div>

        <div className="px-4 py-3 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
          <h3 className="text-base font-bold text-gray-800 text-center capitalize group-hover:text-yellow-600 transition-colors duration-300 mb-1">
            {pokemonName}
          </h3>
          {condition && (
            <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-semibold text-center">{condition}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
