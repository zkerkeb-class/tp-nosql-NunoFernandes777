import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import {
  deletePokemonByIdController,
  getPokemonByIdController,
  updatePokemonByIdController,
} from "@/mvc/controllers/pokemonController";

function getMutationErrorResponse(error, fallbackMessage) {
  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (error?.code === 11000) {
    return NextResponse.json({ error: "Un Pokemon avec cet id existe deja." }, { status: 400 });
  }

  return NextResponse.json(
    { error: fallbackMessage, details: String(error) },
    { status: 500 }
  );
}

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
    return getMutationErrorResponse(error, "Failed to update pokemon");
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

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete pokemon", details: String(error) },
      { status: 500 }
    );
  }
}
