import "dotenv/config";
import generatePokemonsJson from "../data/generatePokemonsJson.js";
import pokemonsData from "../data/pokemons.json" with { type: "json" };
import { connectToDatabase } from "../lib/mongodb.js";
import Pokemon from "../models/Pokemon.js";

async function seedPokemons() {
  try {
    generatePokemonsJson();
    await connectToDatabase();

    await Pokemon.deleteMany({});
    await Pokemon.insertMany(pokemonsData);

    console.log(`Seed completed: ${pokemonsData.length} pokemons inserted.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seedPokemons();
