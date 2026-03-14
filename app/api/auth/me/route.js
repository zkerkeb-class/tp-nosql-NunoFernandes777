import { NextResponse } from "next/server";
import { requireAuth } from "@/mvc/middlewares/authMiddleware";

export const runtime = "nodejs";

export async function GET(request) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    { authenticated: true, user: auth.user },
    { status: 200 }
  );
}
