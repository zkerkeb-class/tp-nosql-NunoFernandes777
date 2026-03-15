const TYPE_ORDER = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
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

const TYPE_CHART = {
  Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
  Fire: {
    Fire: 0.5,
    Water: 0.5,
    Grass: 2,
    Ice: 2,
    Bug: 2,
    Rock: 0.5,
    Dragon: 0.5,
    Steel: 2,
  },
  Water: {
    Fire: 2,
    Water: 0.5,
    Grass: 0.5,
    Ground: 2,
    Rock: 2,
    Dragon: 0.5,
  },
  Electric: {
    Water: 2,
    Electric: 0.5,
    Grass: 0.5,
    Ground: 0,
    Flying: 2,
    Dragon: 0.5,
  },
  Grass: {
    Fire: 0.5,
    Water: 2,
    Grass: 0.5,
    Poison: 0.5,
    Ground: 2,
    Flying: 0.5,
    Bug: 0.5,
    Rock: 2,
    Dragon: 0.5,
    Steel: 0.5,
  },
  Ice: {
    Fire: 0.5,
    Water: 0.5,
    Grass: 2,
    Ground: 2,
    Flying: 2,
    Dragon: 2,
    Steel: 0.5,
    Ice: 0.5,
  },
  Fighting: {
    Normal: 2,
    Ice: 2,
    Poison: 0.5,
    Flying: 0.5,
    Psychic: 0.5,
    Bug: 0.5,
    Rock: 2,
    Ghost: 0,
    Dark: 2,
    Steel: 2,
    Fairy: 0.5,
  },
  Poison: {
    Grass: 2,
    Poison: 0.5,
    Ground: 0.5,
    Rock: 0.5,
    Ghost: 0.5,
    Steel: 0,
    Fairy: 2,
  },
  Ground: {
    Fire: 2,
    Electric: 2,
    Grass: 0.5,
    Poison: 2,
    Flying: 0,
    Bug: 0.5,
    Rock: 2,
    Steel: 2,
  },
  Flying: {
    Electric: 0.5,
    Grass: 2,
    Fighting: 2,
    Bug: 2,
    Rock: 0.5,
    Steel: 0.5,
  },
  Psychic: {
    Fighting: 2,
    Poison: 2,
    Psychic: 0.5,
    Dark: 0,
    Steel: 0.5,
  },
  Bug: {
    Fire: 0.5,
    Grass: 2,
    Fighting: 0.5,
    Poison: 0.5,
    Flying: 0.5,
    Psychic: 2,
    Ghost: 0.5,
    Dark: 2,
    Steel: 0.5,
    Fairy: 0.5,
  },
  Rock: {
    Fire: 2,
    Ice: 2,
    Fighting: 0.5,
    Ground: 0.5,
    Flying: 2,
    Bug: 2,
    Steel: 0.5,
  },
  Ghost: {
    Normal: 0,
    Psychic: 2,
    Ghost: 2,
    Dark: 0.5,
  },
  Dragon: {
    Dragon: 2,
    Steel: 0.5,
    Fairy: 0,
  },
  Dark: {
    Fighting: 0.5,
    Psychic: 2,
    Ghost: 2,
    Dark: 0.5,
    Fairy: 0.5,
  },
  Steel: {
    Fire: 0.5,
    Water: 0.5,
    Electric: 0.5,
    Ice: 2,
    Rock: 2,
    Steel: 0.5,
    Fairy: 2,
  },
  Fairy: {
    Fire: 0.5,
    Fighting: 2,
    Poison: 0.5,
    Dragon: 2,
    Dark: 2,
    Steel: 0.5,
  },
};

function toTitleCase(value) {
  const str = String(value || "").trim().toLowerCase();
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isValidType(typeName) {
  return TYPE_ORDER.includes(typeName);
}

function getMultiplier(attackerType, defenderType) {
  return TYPE_CHART[attackerType]?.[defenderType] ?? 1;
}

function normalizeTypes(typeNames) {
  return Array.from(
    new Set(
      (typeNames || [])
        .map(toTitleCase)
        .filter(isValidType)
    )
  );
}

function sortMatchups(entries) {
  return [...entries].sort(
    (a, b) => b.multiplier - a.multiplier || a.name.localeCompare(b.name)
  );
}

/**
 * Defensive:
 * What attack types are strong/weak against this Pokémon?
 * Example: ["Fire","Flying"] => Charizard defensive profile
 */
export function getDefensiveMatchups(typeNames) {
  const defenderTypes = normalizeTypes(typeNames);

  const all = TYPE_ORDER.map((attackType) => {
    const multiplier = defenderTypes.reduce(
      (total, defenderType) => total * getMultiplier(attackType, defenderType),
      1
    );

    return {
      name: attackType,
      multiplier,
    };
  });

  return {
    weaknesses: sortMatchups(all.filter((x) => x.multiplier > 1)),
    resistances: sortMatchups(all.filter((x) => x.multiplier > 0 && x.multiplier < 1)),
    immunities: sortMatchups(all.filter((x) => x.multiplier === 0)),
    neutral: sortMatchups(all.filter((x) => x.multiplier === 1)),
    all: sortMatchups(all),
  };
}

/**
 * Offensive:
 * What defending types do this Pokémon's own types hit well?
 * Uses best available multiplier among the given attacking types.
 * Example: ["Fire","Flying"] => offensive coverage if using either Fire or Flying attacks
 */
export function getOffensiveMatchups(typeNames) {
  const attackerTypes = normalizeTypes(typeNames);

  const all = TYPE_ORDER.map((defenderType) => {
    const bestAttack = attackerTypes.reduce(
      (best, attackerType) => {
        const multiplier = getMultiplier(attackerType, defenderType);
        if (multiplier > best.multiplier) {
          return { type: attackerType, multiplier };
        }
        return best;
      },
      { type: null, multiplier: 1 }
    );

    return {
      name: defenderType,
      multiplier: bestAttack.multiplier,
      bestAttackType: bestAttack.type,
    };
  });

  return {
    strengths: sortMatchups(all.filter((x) => x.multiplier > 1)),
    notEffective: sortMatchups(all.filter((x) => x.multiplier > 0 && x.multiplier < 1)),
    noEffect: sortMatchups(all.filter((x) => x.multiplier === 0)),
    neutral: sortMatchups(all.filter((x) => x.multiplier === 1)),
    all: sortMatchups(all),
  };
}

/**
 * Combined helper.
 * Keeps your original API idea, but more complete.
 */
export function getTypeMatchups(typeNames) {
  const safeTypes = normalizeTypes(typeNames);

  return {
    types: safeTypes,
    defense: getDefensiveMatchups(safeTypes),
    offense: getOffensiveMatchups(safeTypes),
  };
}
