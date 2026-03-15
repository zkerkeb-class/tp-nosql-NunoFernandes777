export function toRawPokemonShape(pokemon) {
  const id = pokemon?.id ?? pokemon?.id_pokedex ?? pokemon?.pokedex_id;
  const rawTypes = Array.isArray(pokemon?.type) ? pokemon.type : pokemon?.types;
  const type = Array.isArray(rawTypes)
    ? rawTypes.map((item) => (typeof item === "string" ? item : item?.name)).filter(Boolean)
    : [];
  const rawBase = pokemon?.base || {};
  const base = {
    HP: rawBase.HP,
    Attack: rawBase.Attack,
    Defense: rawBase.Defense,
    SpecialAttack:
      rawBase.SpecialAttack ??
      rawBase["Sp. Attack"] ??
      rawBase.specialAttack,
    SpecialDefense:
      rawBase.SpecialDefense ??
      rawBase["Sp. Defense"] ??
      rawBase.specialDefense,
    Speed: rawBase.Speed,
  };

  return {
    id,
    name: {
      english:
        pokemon?.name?.english ||
        pokemon?.name?.en ||
        pokemon?.name?.fr ||
        pokemon?.name,
      japanese: pokemon?.name?.japanese || "",
      chinese: pokemon?.name?.chinese || "",
      french:
        pokemon?.name?.french ||
        pokemon?.name?.fr ||
        pokemon?.name?.english ||
        pokemon?.name?.en ||
        pokemon?.name,
    },
    type,
    base,
    image: pokemon?.image || `undefined/assets/pokemons/${id}.png`,
  };
}
