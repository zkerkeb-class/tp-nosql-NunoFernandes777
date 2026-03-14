const STAT_CONFIG = [
  { key: "HP", label: "HP" },
  { key: "Attack", label: "Attack" },
  { key: "Defense", label: "Defense" },
  { key: "SpecialAttack", label: "Special Attack" },
  { key: "SpecialDefense", label: "Special Defense" },
  { key: "Speed", label: "Speed" },
];

function getStatValue(base, key) {
  if (!base) return null;
  if (base[key] != null) return base[key];
  if (key === "SpecialAttack") return base["Sp. Attack"] ?? base.specialAttack ?? null;
  if (key === "SpecialDefense") return base["Sp. Defense"] ?? base.specialDefense ?? null;
  return null;
}

export default function PokemonStats({ base }) {
  if (!base) return null;

  return (
    <div className="px-8 py-6 bg-white border-t border-gray-200">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Stats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {STAT_CONFIG.map((stat) => (
          <div key={stat.key} className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
              <span className="text-base font-black text-gray-900">{getStatValue(base, stat.key) ?? "-"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
