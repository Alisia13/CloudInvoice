import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

function toObjectId(id) {
  if (!id || !ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

export async function GET(request, { params }) {
  const _id = toObjectId(params.id);

  if (!_id) {
    return NextResponse.json(
      { error: "Invalid id" },
      { status: 400 }
    );
  }

  const facturi = await getCollection("facturi");
  const doc = await facturi.findOne({ _id });

  if (!doc) {
    return NextResponse.json(
      { error: "Factura not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(doc);
}