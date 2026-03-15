import mongoose from "mongoose";

const ALLOWED_TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

function buildStatField(label, required = false) {
  return {
    type: Number,
    ...(required ? { required: [true, `La statistique ${label} est requise.`] } : {}),
    min: [1, `La statistique ${label} doit etre comprise entre 1 et 255.`],
    max: [255, `La statistique ${label} doit etre comprise entre 1 et 255.`],
  };
}

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "L'id est requis."],
    unique: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value > 0,
      message: "L'id doit etre un entier positif.",
    },
  },
  name: {
    english: { type: String, required: [true, "Le nom anglais est requis."] },
    japanese: String,
    chinese: String,
    french: { type: String, required: [true, "Le nom francais est requis."] },
  },
  type: {
    type: [
      {
        type: String,
        enum: {
          values: ALLOWED_TYPES,
          message: "Le type '{VALUE}' n'est pas autorise.",
        },
      },
    ],
    required: [true, "Au moins un type est requis."],
    validate: {
      validator: (value) => Array.isArray(value) && value.length > 0,
      message: "Au moins un type est requis.",
    },
  },
  base: {
    HP: buildStatField("HP", true),
    Attack: buildStatField("Attack", true),
    Defense: buildStatField("Defense", true),
    SpecialAttack: buildStatField("SpecialAttack"),
    SpecialDefense: buildStatField("SpecialDefense"),
    Speed: buildStatField("Speed"),
  },
  image: String,
});

const Pokemon = mongoose.models.pokemons || mongoose.model("pokemons", pokemonSchema);

export default Pokemon;
