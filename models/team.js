import mongoose from "mongoose";

const TEAM_MAX_POKEMONS = 6;

const teamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'utilisateur est requis."],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Le nom de l'equipe est requis."],
      trim: true,
    },
    pokemons: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pokemons",
        },
      ],
      default: [],
      validate: {
        validator: (value) => Array.isArray(value) && value.length <= TEAM_MAX_POKEMONS,
        message: `Une equipe ne peut pas contenir plus de ${TEAM_MAX_POKEMONS} Pokemon.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema, "teams");

export { TEAM_MAX_POKEMONS };
export default Team;
