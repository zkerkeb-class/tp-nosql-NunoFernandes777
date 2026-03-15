import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import Pokemon from "@/mvc/models/Pokemon";
import { toRawPokemonShape } from "@/mvc/controllers/pokemonMapper";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    await connectToDatabase();
    const user = await User.findById(auth.user.userId).select("favorites").lean();
    const favoriteIds = Array.isArray(user?.favorites)
      ? user.favorites.map(Number).filter(Number.isFinite)
      : [];

    if (favoriteIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const pokemons = await Pokemon.find({ id: { $in: favoriteIds } }).lean();
    const pokemonsById = new Map(
      pokemons.map((pokemon) => [Number(pokemon.id), toRawPokemonShape(pokemon)])
    );
    const orderedFavorites = favoriteIds
      .map((id) => pokemonsById.get(id))
      .filter(Boolean);

    return NextResponse.json(orderedFavorites, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de recuperer les favoris.", details: String(error) },
      { status: 500 }
    );
  }
}
