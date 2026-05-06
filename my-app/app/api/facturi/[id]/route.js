import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

function toObjectId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

async function resolveId(params) {
    const { id } = await params;
    const _id = toObjectId(id);

    if(!_id) {
        return { _id: null, error: NextResponse.json({error: 'Invalid ID'}, { status: 400 })};
    }

    return { _id, error: null};
}

export async function GET(request, { params }) {
  const {_id, error} = await resolveStaticStageData(params);
  if(error) {
    return error;
  }

  const facturi = await getCollection("facturi");
  const factura = await facturi.findOne({ _id });

  if (!factura) {
    return NextResponse.json(
      { error: "Factura not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(doc);
}