import "dotenv/config";
import mongoose from "mongoose";
import pokemonsData from "../data/pokemons.json" with { type: "json" };
import { connectToDatabase } from "../lib/mongodb.js";
import Pokemon from "../models/pokemon.js";

async function seedPokemons() {
  try {
    await connectToDatabase();
    console.log("Connecte a MongoDB !");

    await Pokemon.deleteMany({});
    console.log("Collection videe.");

    const insertedPokemons = await Pokemon.insertMany(pokemonsData);
    console.log(`${insertedPokemons.length} Pokemon inseres avec succes !`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Connexion fermee.");
  }
}

seedPokemons();
