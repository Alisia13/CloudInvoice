import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  const facturi = await getCollection("facturi");
  const all = await facturi.find({}).toArray();

  return NextResponse.json(all);
}

export async function POST(request) {
  const body = await request.json();

  // 🔥 calcul total automat
  const total = body.produse.reduce((sum, produs) => {
    return sum + produs.pret * produs.cantitate;
  }, 0);

  body.total = total;

  const facturi = await getCollection("facturi");
  const { insertedId } = await facturi.insertOne(body);

  return NextResponse.json(
    { _id: insertedId, ...body },
    { status: 201 }
  );
}