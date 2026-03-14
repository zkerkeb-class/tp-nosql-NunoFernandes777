import { NextResponse } from "next/server";
import { requireAuth } from "@/mvc/middlewares/authMiddleware";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/mvc/models/user";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const pokemonId = Number(id);
  if (!Number.isFinite(pokemonId)) {
    return NextResponse.json({ error: "Invalid pokemon id" }, { status: 400 });
  }

  await connectToDatabase();
  const updated = await User.findByIdAndUpdate(
    auth.user.userId,
    { $pull: { favorites: pokemonId } },
    { new: true }
  ).select("favorites").lean();

  return NextResponse.json({ favorites: updated?.favorites || [] }, { status: 200 });
}
