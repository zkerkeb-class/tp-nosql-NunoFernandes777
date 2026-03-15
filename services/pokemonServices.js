import { connectToDatabase } from "@/lib/mongodb";
import Pokemon from "@/mvc/models/Pokemon";

const typeToEnglish = {
  Normal: "Normal",
  Feu: "Fire",
  Eau: "Water",
  Plante: "Grass",
  Electrik: "Electric",
  Glace: "Ice",
  Combat: "Fighting",
  Poison: "Poison",
  Sol: "Ground",
  Vol: "Flying",
  Psy: "Psychic",
  Insecte: "Bug",
  Roche: "Rock",
  Spectre: "Ghost",
  Dragon: "Dragon",
  Tenebres: "Dark",
  Acier: "Steel",
  Fee: "Fairy",
};

function normalizeTypes(pokemon) {
  if (Array.isArray(pokemon.types) && pokemon.types.length > 0) {
    return pokemon.types.map((type) => {
      if (typeof type === "string") {
        return { name: typeToEnglish[type] || type };
      }
      const rawName = type?.name || "Normal";
      return { ...type, name: typeToEnglish[rawName] || rawName };
    });
  }

  if (Array.isArray(pokemon.type) && pokemon.type.length > 0) {
    return pokemon.type.map((type) => ({ name: typeToEnglish[type] || type }));
  }

  return [{ name: "Normal" }];
}

function normalizePokemon(pokemon) {
  const id = pokemon.id ?? pokemon.pokedex_id ?? pokemon.id_pokedex;
  const englishName =
    pokemon.name?.en ||
    pokemon.name?.english ||
    pokemon.name?.fr ||
    pokemon.name?.french ||
    pokemon.name ||
    "Pokemon";
  const frenchName =
    pokemon.name?.fr || pokemon.name?.french || pokemon.name?.english || englishName;

  const image =
    pokemon.sprites?.regular ||
    (id
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      : null);

  return {
    ...pokemon,
    id,
    id_pokedex: id,
    pokedex_id: id,
    name: {
      fr: frenchName,
      en: pokemon.name?.en || pokemon.name?.english || englishName,
      ...pokemon.name,
    },
    types: normalizeTypes(pokemon),
    sprites: {
      regular: image,
      ...pokemon.sprites,
    },
  };
}

function toStoragePokemonShape(pokemon) {
  const id = Number(pokemon.id ?? pokemon.id_pokedex ?? pokemon.pokedex_id);
  const safeId = Number.isFinite(id) ? id : pokemon.id;
  const rawTypes = Array.isArray(pokemon.type) ? pokemon.type : pokemon.types;
  const type = Array.isArray(rawTypes)
    ? rawTypes.map((item) => (typeof item === "string" ? item : item?.name)).filter(Boolean)
    : [];
  const rawBase = pokemon.base || {};
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
    id: safeId,
    name: {
      english: pokemon.name?.english || pokemon.name?.en || pokemon.name?.fr || pokemon.name,
      japanese: pokemon.name?.japanese || "",
      chinese: pokemon.name?.chinese || "",
      french:
        pokemon.name?.french ||
        pokemon.name?.fr ||
        pokemon.name?.english ||
        pokemon.name?.en ||
        pokemon.name,
    },
    type,
    base,
    image: pokemon.image || `undefined/assets/pokemons/${safeId}.png`,
  };
}

export async function getAllPokemons() {
  await connectToDatabase();
  const data = await Pokemon.find({}).sort({ id: 1 }).lean();
  return data.map(normalizePokemon);
}

export async function getPokemonsById(id) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;

  await connectToDatabase();
  const pokemon = await Pokemon.findOne({ id: numericId }).lean();
  return pokemon ? normalizePokemon(pokemon) : null;
}

export async function addPokemon(pokemon) {
  try {
    await connectToDatabase();
    const storageShape = toStoragePokemonShape(pokemon);
    const id = Number(storageShape.id);

    if (Number.isFinite(id)) {
      const updated = await Pokemon.findOneAndUpdate(
        { id },
        {
          $set: storageShape,
          $unset: {
            id_pokedex: "",
            pokedex_id: "",
            sprites: "",
            types: "",
            evolution: "",
            evolutions: "",
            __v: "",
          },
        },
        { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return normalizePokemon(updated);
    }

    const created = await Pokemon.create(storageShape);
    const doc = created?.toObject ? created.toObject() : created;
    return normalizePokemon(doc);
  } catch (error) {
    console.error("Error adding pokemon in MongoDB:", error);
    return null;
  }
}
