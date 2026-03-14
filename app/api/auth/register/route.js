import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/mvc/models/user";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const safeUsername = String(username || "").trim();
    const safePassword = String(password || "");

    if (!safeUsername || !safePassword) {
      return NextResponse.json(
        { error: "username and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    let user;
    try {
      user = await User.create({ username: safeUsername, password: safePassword });
    } catch (_createError) {
      user = await new User({ username: safeUsername, password: safePassword }).save();
    }

    return NextResponse.json(
      { message: "User registered", user: { id: user._id, username: user.username } },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    if (error?.name === "ValidationError") {
      const firstMessage = Object.values(error.errors || {})[0]?.message;
      return NextResponse.json(
        { error: firstMessage || "Invalid user data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to register",
        details: error?.message || String(error),
        errorName: error?.name,
        errorCode: error?.code,
      },
      { status: 500 }
    );
  }
}
