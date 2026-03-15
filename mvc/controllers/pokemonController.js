import { connectToDatabase } from "@/lib/mongodb";
import Pokemon from "@/mvc/models/Pokemon";
import { getAllPokemons, getPokemonsById } from "@/services/pokemonServices";
import { toRawPokemonShape } from "@/mvc/controllers/pokemonMapper";

const ALLOWED_LANGUAGES = ["english", "japanese", "chinese", "french"];

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildPokemonQueryFilter({ type, name, nameLanguage }) {
  const filter = {};
  const normalizedName = String(name || "").trim();

  if (type) {
    filter.type = String(type);
  }

  if (normalizedName) {
    const regex = new RegExp(escapeRegex(normalizedName), "i");
    if (ALLOWED_LANGUAGES.includes(nameLanguage)) {
      filter[`name.${nameLanguage}`] = regex;
    } else {
      filter.$or = ALLOWED_LANGUAGES.map((language) => ({
        [`name.${language}`]: regex,
      }));
    }
  }

  return filter;
}

function buildPokemonSort(sortKey, safeLanguage, direction) {
  if (!sortKey) {
    return "id";
  }

  const prefix = direction === -1 ? "-" : "";
  const normalizedSortKey = sortKey === "name" ? `name.${safeLanguage}` : sortKey;
  return `${prefix}${normalizedSortKey}`;
}

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
  responseShape = "paginated",
}) {
  const safePage = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const safeLimit =
    Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 50;
  const skip = (safePage - 1) * safeLimit;
  const safeLanguage = ALLOWED_LANGUAGES.includes(nameLanguage)
    ? nameLanguage
    : "english";
  const normalizedName = String(name || "").trim().toLowerCase();
  const sortValue = String(sort || "");
  const direction = sortValue.startsWith("-") ? -1 : 1;
  const sortKey = sortValue.startsWith("-") ? sortValue.slice(1) : sortValue;
  const filter = buildPokemonQueryFilter({
    type,
    name: normalizedName,
    nameLanguage,
  });
  const sortDefinition = buildPokemonSort(sortKey, safeLanguage, direction);

  await connectToDatabase();

  if (responseShape === "array") {
    const items = await Pokemon.find(filter).sort(sortDefinition).lean();
    return items.map(toRawPokemonShape);
  }

  const total = await Pokemon.countDocuments(filter);
  const items = await Pokemon.find(filter)
    .sort(sortDefinition)
    .skip(skip)
    .limit(safeLimit)
    .lean();
  const rawItems = items.map(toRawPokemonShape);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));

  return {
    data: rawItems,
    page: safePage,
    limit: safeLimit,
    total,
    totalPages,
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
