import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import {
  deleteTeamByIdController,
  getTeamByIdController,
  updateTeamByIdController,
} from "@/mvc/controllers/teamController";

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

export async function GET(request, { params }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const team = await getTeamByIdController(auth.user.userId, id);
    if (!team) {
      return NextResponse.json({ error: "Equipe introuvable." }, { status: 404 });
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    return getTeamErrorResponse(error, "Impossible de recuperer l'equipe.");
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const payload = await request.json();
    const updated = await updateTeamByIdController(auth.user.userId, id, payload);
    if (!updated) {
      return NextResponse.json({ error: "Equipe introuvable." }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return getTeamErrorResponse(error, "Impossible de modifier l'equipe.");
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = requireAuth(request);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const deleted = await deleteTeamByIdController(auth.user.userId, id);
    if (!deleted) {
      return NextResponse.json({ error: "Equipe introuvable." }, { status: 404 });
    }

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return getTeamErrorResponse(error, "Impossible de supprimer l'equipe.");
  }
}
