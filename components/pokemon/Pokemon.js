import PokemonHeader from "@/components/pokemon/PokemonHeader";
import PokemonTypes from "@/components/pokemon/PokemonTypes";
import PokemonEvolutions from "@/components/pokemon/PokemonEvolutions";
import PokemonStats from "@/components/pokemon/PokemonStats";

export default function Pokemon({ pokemon, backHref = "/" }) {
    // Gérer les différentes structures possibles d'évolution
    const evolutions = pokemon.evolution?.next || pokemon.evolutions?.next || pokemon.evolution || pokemon.evolutions || [];
    const preEvolution = pokemon.evolution?.prev || pokemon.evolutions?.prev || null;
    
    // Normaliser les évolutions en tableau
    const evolutionsArray = Array.isArray(evolutions) ? evolutions : (evolutions ? [evolutions] : []);
    
    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400">
            <PokemonHeader pokemon={pokemon} backHref={backHref} />
            <PokemonTypes types={pokemon.types} />
            <PokemonStats base={pokemon.base} />
            <PokemonEvolutions evolutions={evolutionsArray} preEvolution={preEvolution} />
        </div>
    )
}
