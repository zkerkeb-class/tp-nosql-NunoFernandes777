import { NextResponse } from "next/server";
import { createPokemonController } from "@/mvc/controllers/pokemonController";
import { requireAuth } from "@/mvc/middlewares/authMiddleware";

export async function POST(request) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const payload = await request.json();
    const created = await createPokemonController(payload);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Pokemon id already exists" }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create pokemon", details: String(error) },
      { status: 400 }
    );
  }
}
