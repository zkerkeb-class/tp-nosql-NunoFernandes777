import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import Pokemon from "@/mvc/models/Pokemon";

export const runtime = "nodejs";

function getPokemonId(params) {
  const pokemonId = Number(params?.pokemonId);
  return Number.isFinite(pokemonId) ? pokemonId : null;
}

export async function POST(request, { params }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { pokemonId: rawPokemonId } = await params;
    const pokemonId = getPokemonId({ pokemonId: rawPokemonId });
    if (!pokemonId) {
      return NextResponse.json({ error: "Identifiant de Pokemon invalide." }, { status: 400 });
    }

    await connectToDatabase();
    const exists = await Pokemon.exists({ id: pokemonId });
    if (!exists) {
      return NextResponse.json({ error: "Pokemon introuvable." }, { status: 404 });
    }

    const updated = await User.findByIdAndUpdate(
      auth.user.userId,
      { $addToSet: { favorites: pokemonId } },
      { new: true }
    ).select("favorites").lean();

    return NextResponse.json({ favorites: updated?.favorites || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible d'ajouter le favori.", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { pokemonId: rawPokemonId } = await params;
    const pokemonId = getPokemonId({ pokemonId: rawPokemonId });
    if (!pokemonId) {
      return NextResponse.json({ error: "Identifiant de Pokemon invalide." }, { status: 400 });
    }

    await connectToDatabase();
    const updated = await User.findByIdAndUpdate(
      auth.user.userId,
      { $pull: { favorites: pokemonId } },
      { new: true }
    ).select("favorites").lean();

    return NextResponse.json({ favorites: updated?.favorites || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de retirer le favori.", details: String(error) },
      { status: 500 }
    );
  }
}
