import Pokemon from "@/components/pokemon/Pokemon";
import { getPokemonByIdViewController } from "@/mvc/controllers/pokemonController";
import { getKantoEvolutionFamilyIds } from "@/lib/kantoEvolutionFamilies";
import { getAllPokemons } from "@/services/pokemonServices";

function normalizeBackHref(value) {
    if (typeof value !== "string") return "/";
    if (!value.startsWith("/") || value.startsWith("//")) return "/";
    return value;
}

export default async function PokemonPage({ params, searchParams }) {
    const { id } = await params
    const resolvedSearchParams = await searchParams;
    const numericId = Number(id);
    const [pokemonData, allPokemons] = await Promise.all([
        getPokemonByIdViewController(id),
        getAllPokemons(),
    ]);
    const backHref = normalizeBackHref(resolvedSearchParams?.from);

    if (!pokemonData) {
        return (
            <div className="min-h-screen bg-black px-4 py-20 text-white">
                <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/12 bg-[#09111d] p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Pokemon Detail</div>
                    <h1 className="mt-4 text-3xl font-black uppercase tracking-tight">Pokemon not found</h1>
                    <p className="mt-3 text-white/70">This entry is not available in the current Pokedex data.</p>
                </div>
            </div>
        );
    }

    const familyIds = getKantoEvolutionFamilyIds(numericId);
    const pokemonById = new Map(
        allPokemons.map((entry) => {
            const entryId = Number(entry?.id ?? entry?.id_pokedex ?? entry?.pokedex_id);
            return [entryId, entry];
        })
    );
    const currentPokemonId = Number(
        pokemonData?.id ?? pokemonData?.id_pokedex ?? pokemonData?.pokedex_id
    );

    if (Number.isFinite(currentPokemonId)) {
        pokemonById.set(currentPokemonId, pokemonData);
    }

    const evolutionFamily = familyIds
        .map((familyId) => pokemonById.get(Number(familyId)))
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#16243f_0%,#060912_38%,#020202_100%)] px-4 py-8">
            <div className="mx-auto max-w-[92rem] md:px-6 xl:px-0">
                <Pokemon
                    key={pokemonData.id}
                    pokemon={pokemonData}
                    backHref={backHref}
                    evolutionFamily={evolutionFamily}
                />
            </div>
        </div>
    )
}
