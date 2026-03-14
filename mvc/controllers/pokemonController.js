import { connectToDatabase } from "@/lib/mongodb";
import Pokemon from "@/mvc/models/Pokemon";
import { getAllPokemons, getPokemonsById } from "@/services/pokemonServices";
import { toRawPokemonShape } from "@/mvc/controllers/pokemonMapper";

export async function listPokemonsController() {
  const pokemons = await getAllPokemons();
  return pokemons.map(toRawPokemonShape);
}

export async function queryPokemonsController({
  type,
  name,
  nameLanguage,
  sort,
  page = 1,
  limit = 50,
}) {
  await connectToDatabase();
  const allowedLanguages = ["english", "japanese", "chinese", "french"];

  const filter = {};

  if (type) {
    filter.type = type;
  }

  if (name) {
    if (nameLanguage && allowedLanguages.includes(nameLanguage)) {
      filter[`name.${nameLanguage}`] = { $regex: name, $options: "i" };
    } else {
      filter.$or = allowedLanguages.map((language) => ({
        [`name.${language}`]: { $regex: name, $options: "i" },
      }));
    }
  }

  const safePage = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const safeLimit =
    Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 50;
  const skip = (safePage - 1) * safeLimit;
  const safeLanguage = allowedLanguages.includes(nameLanguage)
    ? nameLanguage
    : "english";
  let resolvedSort = sort;

  if (sort === "name" || sort === "-name") {
    const direction = sort.startsWith("-") ? "-" : "";
    resolvedSort = `${direction}name.${safeLanguage}`;
  }

  let query = Pokemon.find(filter);
  if (resolvedSort) {
    query = query.sort(resolvedSort);
  }

  const [items, total] = await Promise.all([
    query.skip(skip).limit(safeLimit).lean(),
    Pokemon.countDocuments(filter),
  ]);

  const pokemons = items.map(toRawPokemonShape);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));

  return {
    data: pokemons,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    },
  };
}

export async function getPokemonByIdController(id) {
  const pokemon = await getPokemonsById(id);
  if (!pokemon) return null;
  return toRawPokemonShape(pokemon);
}

export async function getPokemonByIdViewController(id) {
  return getPokemonsById(id);
}

export async function createPokemonController(payload) {
  await connectToDatabase();
  const created = await Pokemon.create(payload);
  return toRawPokemonShape(created?.toObject ? created.toObject() : created);
}

export async function updatePokemonByIdController(id, payload) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;

  await connectToDatabase();
  const safePayload = { ...payload, id: numericId };
  const updated = await Pokemon.findOneAndUpdate(
    { id: numericId },
    { $set: safePayload },
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!updated) return null;
  return toRawPokemonShape(updated);
}

export async function deletePokemonByIdController(id) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;

  await connectToDatabase();
  const deleted = await Pokemon.findOneAndDelete({ id: numericId }).lean();
  if (!deleted) return null;
  return toRawPokemonShape(deleted);
}
