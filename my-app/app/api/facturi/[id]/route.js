import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

function toObjectId(id) {
  if (!id || !ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

async function resolveId(context) {
  const params = await context.params;
  const id = params.id;

  const _id = toObjectId(id);

  if (!_id) {
    return {
      _id: null,
      error: NextResponse.json(
        { error: "Invalid id" },
        { status: 400 }
      ),
    };
  }

  return { _id, error: null };
}

// 🔹 GET factura după ID
export async function GET(request, context) {
  const { _id, error } = await resolveId(context);
  if (error) return error;

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

// 🔹 UPDATE factură
export async function PUT(request, context) {
  const { _id, error } = await resolveId(context);
  if (error) return error;

  const body = await request.json();
  delete body._id;

  // recalcul total dacă se modifică produse
  if (body.produse) {
    const total = body.produse.reduce((sum, p) => {
      return sum + p.pret * p.cantitate;
    }, 0);

    body.total = total;
  }

  const facturi = await getCollection("facturi");

  const updated = await facturi.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnDocument: "after" }
  );

  if (!updated) {
    return NextResponse.json(
      { error: "Factura not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

// 🔹 DELETE factură
export async function DELETE(request, context) {
  const { _id, error } = await resolveId(context);
  if (error) return error;

  const facturi = await getCollection("facturi");

  const result = await facturi.deleteOne({ _id });

  if (result.deletedCount === 0) {
    return NextResponse.json(
      { error: "Factura not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    deleted: _id.toString(),
  });
}