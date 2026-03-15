import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { createTeamController, listTeamsController } from "@/mvc/controllers/teamController";

export const runtime = "nodejs";

function getTeamErrorResponse(error, fallbackMessage) {
  if (error?.status) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { error: fallbackMessage, details: String(error) },
    { status: 500 }
  );
}

export async function GET(request) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const teams = await listTeamsController(auth.user.userId);
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    return getTeamErrorResponse(error, "Impossible de recuperer les equipes.");
  }
}

export async function POST(request) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const payload = await request.json();
    const created = await createTeamController(auth.user.userId, payload);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return getTeamErrorResponse(error, "Impossible de creer l'equipe.");
  }
}
