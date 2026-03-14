import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    english: { type: String, required: true },
    japanese: String,
    chinese: String,
    french: String,
  },
  type: [String],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    SpecialAttack: Number,
    SpecialDefense: Number,
    Speed: Number,
  },
  image: String,
});

const Pokemon = mongoose.models.pokemons || mongoose.model("pokemons", pokemonSchema);

export default Pokemon;
