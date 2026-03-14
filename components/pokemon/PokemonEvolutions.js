import PokemonEvolution from "./PokemonEvolution";

export default function PokemonEvolutions({ evolutions, preEvolution }) {
    // Filtrer les évolutions valides
    const validEvolutions = evolutions?.filter(evo => evo && (evo.name || evo.name?.fr) && evo.pokedex_id) || [];
    
    // Si pas d'évolutions et pas de pré-évolution, ne rien afficher
    if (validEvolutions.length === 0 && !preEvolution) {
        return null;
    }

    return (
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-6">Évolutions</h3>
            
            <div className="flex flex-col md:flex-row items-start justify-start gap-6 flex-wrap">
                {/* Pré-évolution */}
                {preEvolution && (
                    <>
                        <PokemonEvolution evolution={preEvolution} />
                        <div className="flex items-center gap-2 text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span className="text-sm font-medium hidden md:block">Évolue en</span>
                        </div>
                    </>
                )}
                
                {/* Évolutions */}
                {validEvolutions.length > 0 && validEvolutions.map((evolution, index) => (
                    <div key={evolution.pokedex_id || index} className="flex items-center gap-6">
                        {index > 0 && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        )}
                        <PokemonEvolution evolution={evolution} />
                    </div>
                ))}
            </div>
        </div>
    );
}

