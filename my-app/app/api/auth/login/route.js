import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongodb";
import { createToken } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const { email, parola } = body;

  if (!email || !parola) {
    return NextResponse.json(
      { error: "Emailul și parola sunt obligatorii" },
      { status: 400 }
    );
  }

  const users = await getCollection("users");
  const user = await users.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { error: "Email sau parolă incorectă" },
      { status: 401 }
    );
  }

  const validPassword = await bcrypt.compare(parola, user.parola);

  if (!validPassword) {
    return NextResponse.json(
      { error: "Email sau parolă incorectă" },
      { status: 401 }
    );
  }

  const token = createToken(user);

  const response = NextResponse.json({
    ok: true,
    user: {
      id: user._id.toString(),
      nume: user.nume,
      email: user.email,
    },
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}