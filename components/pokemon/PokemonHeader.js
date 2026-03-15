import Image from "next/image";
import Link from "next/link";

const getTypeGradient = (typeName) => {
  const gradients = {
    Normal: "from-gray-400 to-gray-500",
    Fire: "from-red-500 to-orange-600",
    Water: "from-blue-400 to-blue-600",
    Grass: "from-green-400 to-green-600",
    Electric: "from-yellow-400 to-yellow-500",
    Ice: "from-cyan-300 to-cyan-400",
    Fighting: "from-orange-600 to-red-700",
    Poison: "from-purple-500 to-purple-700",
    Ground: "from-amber-600 to-amber-700",
    Flying: "from-indigo-400 to-indigo-500",
    Psychic: "from-pink-500 to-pink-600",
    Bug: "from-lime-500 to-lime-600",
    Rock: "from-stone-600 to-stone-700",
    Ghost: "from-violet-600 to-violet-700",
    Dragon: "from-indigo-600 to-indigo-800",
    Dark: "from-gray-800 to-gray-900",
    Steel: "from-gray-500 to-gray-600",
    Fairy: "from-pink-300 to-pink-400",
  };
  return gradients[typeName] || "from-gray-400 to-gray-500";
};

const PokemonHeader = ({ pokemon, backHref = "/" }) => {
  const primaryType = pokemon.types?.[0]?.name || "Normal";
  const gradient = getTypeGradient(primaryType);
  const pokemonNameRaw =
    pokemon.name?.en || pokemon.name?.english || pokemon.name?.fr || pokemon.name;
  const pokemonName =
    typeof pokemonNameRaw === "string" ? pokemonNameRaw : "Pokemon";
  const pokemonId = pokemon.pokedex_id ?? pokemon.id_pokedex ?? pokemon.id;
  const imageSrc = pokemon.sprites?.regular;
  const hasValidImage =
    typeof imageSrc === "string" &&
    imageSrc.startsWith("https://raw.githubusercontent.com/");

  return (
    <div className="relative">
      <Link
        href={backHref}
        className="absolute top-4 left-4 z-20 bg-white hover:bg-yellow-400 text-gray-700 hover:text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      <div className={`bg-gradient-to-br ${gradient} rounded-t-3xl p-8 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center mb-6">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-bold">
            #{String(pokemonId).padStart(3, "0")}
          </span>
        </div>

        <div className="relative z-10 flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border-4 border-white/30">
              {hasValidImage ? (
                <Image
                  src={imageSrc}
                  width={280}
                  height={280}
                  alt={pokemonName}
                  className="drop-shadow-2xl animate-pulse-slow"
                />
              ) : (
                <div className="w-[280px] h-[280px] rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-semibold">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg capitalize mb-2">{pokemonName}</h1>
        </div>
      </div>
    </div>
  );
};

export default PokemonHeader;
