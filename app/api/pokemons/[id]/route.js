import { NextResponse } from "next/server";
import {
  deletePokemonByIdController,
  getPokemonByIdController,
  updatePokemonByIdController,
} from "@/mvc/controllers/pokemonController";
import { requireAuth } from "@/mvc/middlewares/authMiddleware";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const pokemon = await getPokemonByIdController(id);

    if (!pokemon) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    return NextResponse.json(pokemon, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pokemon", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const payload = await request.json();
    const updated = await updatePokemonByIdController(id, payload);

    if (!updated) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Pokemon id already exists" }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to update pokemon", details: String(error) },
      { status: 400 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const auth = requireAuth(_request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const deleted = await deletePokemonByIdController(id);

    if (!deleted) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Pokemon deleted successfully", pokemon: deleted },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete pokemon", details: String(error) },
      { status: 500 }
    );
  }
}
