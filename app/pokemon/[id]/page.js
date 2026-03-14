import Pokemon from "@/components/pokemon/Pokemon";
import { getPokemonByIdViewController } from "@/mvc/controllers/pokemonController";

function normalizeBackHref(value) {
    if (typeof value !== "string") return "/";
    if (!value.startsWith("/") || value.startsWith("//")) return "/";
    return value;
}

export default async function PokemonPage({ params, searchParams }) {
    const { id } = await params
    const resolvedSearchParams = await searchParams;
    const pokemonData = await getPokemonByIdViewController(id);
    const backHref = normalizeBackHref(resolvedSearchParams?.from);

    if (!pokemonData) {
        return <p>Pokemon introuvable</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
            <div className="max-w-5xl mx-auto relative pt-16 md:pt-8">
                <Pokemon key={pokemonData.id} pokemon={pokemonData} backHref={backHref} />
            </div>
        </div>
    )
}
