import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyPassword } from "@/mvc/auth/password";
import User from "@/mvc/models/user";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "username and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "JWT_SECRET is missing" }, { status: 500 });
    }

    const token = jwt.sign(
      { userId: String(user._id), username: user.username },
      secret,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { message: "Connected", user: { id: user._id, username: user.username } },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
