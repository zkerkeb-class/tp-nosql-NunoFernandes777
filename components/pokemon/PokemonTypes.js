import Image from "next/image";

const getTypeStyles = (typeName) => {
  const styles = {
    Normal: { bg: "bg-gray-400", border: "border-gray-500", text: "text-gray-800" },
    Fire: { bg: "bg-red-500", border: "border-red-600", text: "text-white" },
    Water: { bg: "bg-blue-500", border: "border-blue-600", text: "text-white" },
    Grass: { bg: "bg-green-500", border: "border-green-600", text: "text-white" },
    Electric: { bg: "bg-yellow-400", border: "border-yellow-500", text: "text-gray-800" },
    Ice: { bg: "bg-cyan-300", border: "border-cyan-400", text: "text-gray-800" },
    Fighting: { bg: "bg-orange-600", border: "border-orange-700", text: "text-white" },
    Poison: { bg: "bg-purple-500", border: "border-purple-600", text: "text-white" },
    Ground: { bg: "bg-amber-600", border: "border-amber-700", text: "text-white" },
    Flying: { bg: "bg-indigo-400", border: "border-indigo-500", text: "text-white" },
    Psychic: { bg: "bg-pink-500", border: "border-pink-600", text: "text-white" },
    Bug: { bg: "bg-lime-500", border: "border-lime-600", text: "text-gray-800" },
    Rock: { bg: "bg-stone-600", border: "border-stone-700", text: "text-white" },
    Ghost: { bg: "bg-violet-600", border: "border-violet-700", text: "text-white" },
    Dragon: { bg: "bg-indigo-600", border: "border-indigo-800", text: "text-white" },
    Dark: { bg: "bg-gray-800", border: "border-gray-900", text: "text-white" },
    Steel: { bg: "bg-gray-500", border: "border-gray-600", text: "text-white" },
    Fairy: { bg: "bg-pink-300", border: "border-pink-400", text: "text-gray-800" },
  };
  return styles[typeName] || styles.Normal;
};

export default function PokemonTypes({ types }) {
  if (!types || types.length === 0) return null;

  return (
    <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Types</h3>
      <div className="flex flex-wrap gap-3">
        {types.map((type) => {
          const style = getTypeStyles(type.name);
          return (
            <div
              key={type.name}
              className={`${style.bg} ${style.border} ${style.text} border-2 rounded-xl px-6 py-3 flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              {type.image && (
                <Image src={type.image} width={24} height={24} alt={type.name} className="object-contain" />
              )}
              <span className="font-bold text-sm capitalize">{type.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
