import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Pokemon from "@/mvc/models/Pokemon";
import { toRawPokemonShape } from "@/mvc/controllers/pokemonMapper";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();

    const [typeStats, topAttack, topHp] = await Promise.all([
      Pokemon.aggregate([
        { $unwind: "$type" },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
            averageHp: { $avg: "$base.HP" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Pokemon.aggregate([{ $sort: { "base.Attack": -1, id: 1 } }, { $limit: 1 }]),
      Pokemon.aggregate([{ $sort: { "base.HP": -1, id: 1 } }, { $limit: 1 }]),
    ]);

    return NextResponse.json(
      {
        countByType: typeStats.map((entry) => ({
          type: entry._id,
          count: entry.count,
        })),
        averageHpByType: typeStats.map((entry) => ({
          type: entry._id,
          averageHp: Number(Number(entry.averageHp || 0).toFixed(2)),
        })),
        topAttackPokemon: topAttack[0] ? toRawPokemonShape(topAttack[0]) : null,
        topHpPokemon: topHp[0] ? toRawPokemonShape(topHp[0]) : null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de calculer les statistiques.", details: String(error) },
      { status: 500 }
    );
  }
}
