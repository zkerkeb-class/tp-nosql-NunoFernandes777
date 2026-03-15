import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Team, { TEAM_MAX_POKEMONS } from "@/models/team";
import Pokemon from "@/models/pokemon";
import { toRawPokemonShape } from "@/mvc/controllers/pokemonMapper";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeTeamName(value, isRequired = true) {
  const name = String(value || "").trim();
  if (!name && isRequired) {
    throw createHttpError(400, "Le nom de l'equipe est requis.");
  }

  return name;
}

function normalizePokemonIds(rawPokemons) {
  if (rawPokemons === undefined) return null;
  if (!Array.isArray(rawPokemons)) {
    throw createHttpError(400, "Le champ pokemons doit etre un tableau d'identifiants.");
  }

  if (rawPokemons.length > TEAM_MAX_POKEMONS) {
    throw createHttpError(
      400,
      `Une equipe ne peut pas contenir plus de ${TEAM_MAX_POKEMONS} Pokemon.`
    );
  }

  return rawPokemons.map((entry) => {
    const candidate =
      typeof entry === "object" && entry !== null ? entry.id ?? entry.pokemonId ?? entry._id : entry;
    const numericId = Number(candidate);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw createHttpError(400, "Chaque Pokemon doit etre reference par un id valide.");
    }

    return numericId;
  });
}

async function resolvePokemonReferences(rawPokemons) {
  const pokemonIds = normalizePokemonIds(rawPokemons);
  if (pokemonIds === null) return null;
  if (pokemonIds.length === 0) return [];

  await connectToDatabase();
  const pokemons = await Pokemon.find({ id: { $in: pokemonIds } }).select("_id id").lean();
  const pokemonById = new Map(pokemons.map((pokemon) => [Number(pokemon.id), pokemon]));
  const orderedRefs = pokemonIds.map((id) => pokemonById.get(id)?._id || null);

  const missingIds = pokemonIds.filter((_id, index) => !orderedRefs[index]);
  if (missingIds.length > 0) {
    throw createHttpError(
      404,
      `Pokemon introuvable(s) pour les id suivants : ${missingIds.join(", ")}.`
    );
  }

  return orderedRefs;
}

async function populateTeam(teamQuery) {
  return teamQuery.populate("pokemons");
}

function formatTeam(team) {
  if (!team) return null;

  const populatedPokemons = Array.isArray(team.pokemons)
    ? team.pokemons.map((pokemon) =>
        typeof pokemon?.toObject === "function"
          ? toRawPokemonShape(pokemon.toObject())
          : toRawPokemonShape(pokemon)
      )
    : [];

  return {
    id: String(team._id),
    user: typeof team.user === "object" && team.user !== null ? String(team.user._id) : String(team.user),
    name: team.name,
    pokemons: populatedPokemons,
    pokemonIds: populatedPokemons.map((pokemon) => pokemon.id),
    createdAt: team.createdAt,
    updatedAt: team.updatedAt,
  };
}

export async function createTeamController(userId, payload) {
  await connectToDatabase();
  const name = normalizeTeamName(payload?.name);
  const pokemons = await resolvePokemonReferences(payload?.pokemons ?? payload?.pokemonIds ?? []);
  const createdTeam = await Team.create({
    user: userId,
    name,
    pokemons,
  });
  const populated = await populateTeam(createdTeam);
  return formatTeam(populated);
}

export async function listTeamsController(userId) {
  await connectToDatabase();
  const teams = await Team.find({ user: userId }).sort({ updatedAt: -1, createdAt: -1 }).populate("pokemons");
  return teams.map(formatTeam);
}

export async function getTeamByIdController(userId, teamId) {
  if (!mongoose.isValidObjectId(teamId)) return null;

  await connectToDatabase();
  const team = await Team.findOne({ _id: teamId, user: userId }).populate("pokemons");
  return formatTeam(team);
}

export async function updateTeamByIdController(userId, teamId, payload) {
  if (!mongoose.isValidObjectId(teamId)) return null;

  await connectToDatabase();
  const team = await Team.findOne({ _id: teamId, user: userId });
  if (!team) return null;

  if (Object.prototype.hasOwnProperty.call(payload || {}, "name")) {
    team.name = normalizeTeamName(payload?.name);
  }

  if (
    Object.prototype.hasOwnProperty.call(payload || {}, "pokemons") ||
    Object.prototype.hasOwnProperty.call(payload || {}, "pokemonIds")
  ) {
    const refs = await resolvePokemonReferences(payload?.pokemons ?? payload?.pokemonIds ?? []);
    team.pokemons = refs || [];
  }

  await team.save();
  await populateTeam(team);
  return formatTeam(team);
}

export async function deleteTeamByIdController(userId, teamId) {
  if (!mongoose.isValidObjectId(teamId)) return null;

  await connectToDatabase();
  const deleted = await Team.findOneAndDelete({ _id: teamId, user: userId });
  return formatTeam(deleted);
}
