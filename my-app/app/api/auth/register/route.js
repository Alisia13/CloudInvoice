import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const { nume, email, parola } = body;

  if (!nume || !email || !parola) {
    return NextResponse.json(
      { error: "Toate câmpurile sunt obligatorii" },
      { status: 400 }
    );
  }

  const users = await getCollection("users");

  const existingUser = await users.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: "Există deja un cont cu acest email" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(parola, 10);

  const user = {
    nume,
    email,
    parola: hashedPassword,
    rol: "user",
    dataCreare: new Date().toISOString().split("T")[0],
  };

  const { insertedId } = await users.insertOne(user);

  return NextResponse.json(
    {
      _id: insertedId.toString(),
      nume,
      email,
    },
    { status: 201 }
  );
}