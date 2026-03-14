import { listPokemonsController } from "@/mvc/controllers/pokemonController";

export default async function PokemonApiPage() {
  const pokemons = await listPokemonsController();

  if (!pokemons || pokemons.length === 0) {
    return <p>Aucun Pokemon trouve</p>;
  }

  return (
    <div>
      <h1>pokemon api</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            {typeof (pokemon.name?.en || pokemon.name?.english || pokemon.name?.fr || pokemon.name) === "string"
              ? (pokemon.name?.en || pokemon.name?.english || pokemon.name?.fr || pokemon.name)
              : "Pokemon"}
          </li>
        ))}
      </ul>
    </div>
  );
}
