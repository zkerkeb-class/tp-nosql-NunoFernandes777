import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import {
  createPokemonController,
  listPokemonsController,
  queryPokemonsController,
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

export async function GET(request) {
  try {
    const typeQuery = request.nextUrl.searchParams.get("type");
    const nameQuery = request.nextUrl.searchParams.get("name");
    const nameLanguageQuery = request.nextUrl.searchParams.get("nameLanguage");
    const sortQuery = request.nextUrl.searchParams.get("sort");
    const pageQuery = request.nextUrl.searchParams.get("page");
    const limitQuery = request.nextUrl.searchParams.get("limit");
    const hasPaginationQueryParams = pageQuery || limitQuery;
    const hasQueryParams =
      typeQuery ||
      nameQuery ||
      nameLanguageQuery ||
      sortQuery ||
      pageQuery ||
      limitQuery;

    if (!hasQueryParams) {
      const pokemons = await listPokemonsController();
      return NextResponse.json(pokemons, { status: 200 });
    }

    const result = await queryPokemonsController({
      type: typeQuery || undefined,
      name: nameQuery || undefined,
      nameLanguage: nameLanguageQuery || undefined,
      sort: sortQuery || undefined,
      page: pageQuery || undefined,
      limit: limitQuery || undefined,
      responseShape: hasPaginationQueryParams ? "paginated" : "array",
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pokemons", details: String(error) },
      { status: 500 }
    );
  }
}

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
    return getMutationErrorResponse(error, "Failed to create pokemon");
  }
}
