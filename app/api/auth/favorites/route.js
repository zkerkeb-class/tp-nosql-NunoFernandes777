import { NextResponse } from "next/server";
import { requireAuth } from "@/mvc/middlewares/authMiddleware";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/mvc/models/user";

export const runtime = "nodejs";

export async function GET(request) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  await connectToDatabase();
  const user = await User.findById(auth.user.userId).select("favorites").lean();
  return NextResponse.json({ favorites: user?.favorites || [] }, { status: 200 });
}

export async function POST(request) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const pokemonId = Number(body?.pokemonId);
  if (!Number.isFinite(pokemonId)) {
    return NextResponse.json({ error: "pokemonId must be a number" }, { status: 400 });
  }

  await connectToDatabase();
  const updated = await User.findByIdAndUpdate(
    auth.user.userId,
    { $addToSet: { favorites: pokemonId } },
    { new: true }
  ).select("favorites").lean();

  return NextResponse.json({ favorites: updated?.favorites || [] }, { status: 200 });
}
