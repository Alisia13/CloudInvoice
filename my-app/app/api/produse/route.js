import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  const produse = await getCollection("produse");
  const all = await produse.find({}).toArray();

  return NextResponse.json(all);
}

export async function POST(request) {
  const body = await request.json();

  const produse = await getCollection("produse");
  const { insertedId } = await produse.insertOne(body);

  return NextResponse.json(
    { _id: insertedId, ...body },
    { status: 201 }
  );
}