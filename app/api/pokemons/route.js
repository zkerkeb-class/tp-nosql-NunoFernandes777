import { NextResponse } from "next/server";
import { queryPokemonsController } from "@/mvc/controllers/pokemonController";

export async function GET(request) {
  try {
    const typeQuery = request.nextUrl.searchParams.get("type");
    const nameQuery = request.nextUrl.searchParams.get("name");
    const nameLanguageQuery = request.nextUrl.searchParams.get("nameLanguage");
    const sortQuery = request.nextUrl.searchParams.get("sort");
    const pageQuery = request.nextUrl.searchParams.get("page");
    const limitQuery = request.nextUrl.searchParams.get("limit");

    const result = await queryPokemonsController({
      type: typeQuery || undefined,
      name: nameQuery || undefined,
      nameLanguage: nameLanguageQuery || undefined,
      sort: sortQuery || undefined,
      page: pageQuery || undefined,
      limit: limitQuery || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pokemons", details: String(error) },
      { status: 500 }
    );
  }
}
