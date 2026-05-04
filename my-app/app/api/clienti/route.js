import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  const clienti = await getCollection("clienti");
  const all = await clienti.find({}).toArray();

  return NextResponse.json(all);
}

export async function POST(request) {
  const body = await request.json();

  const clienti = await getCollection("clienti");
  const { insertedId } = await clienti.insertOne(body);

  return NextResponse.json(
    { _id: insertedId, ...body },
    { status: 201 }
  );
}