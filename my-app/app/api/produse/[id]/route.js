import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

function toObjectId(id) {
  if (!id || !ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

async function resolveId(context) {
  const params = await context.params;
  const id = params.id;

  const _id = toObjectId(id);

  if (!_id) {
    return {
      _id: null,
      error: NextResponse.json({ error: "Invalid id" }, { status: 400 }),
    };
  }

  return { _id, error: null };
}

export async function GET(request, context) {
  const { _id, error } = await resolveId(context);
  if (error) return error;

  const produse = await getCollection("produse");
  const doc = await produse.findOne({ _id });

  if (!doc) {
    return NextResponse.json({ error: "Produs not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...doc,
    _id: doc._id.toString(),
  });
}

export async function PUT(request, context) {
  const { _id, error } = await resolveId(context);
  if (error) return error;

  const body = await request.json();
  delete body._id;

  const produse = await getCollection("produse");

  const updated = await produse.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnDocument: "after" }
  );

  if (!updated) {
    return NextResponse.json({ error: "Produs not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...updated,
    _id: updated._id.toString(),
  });
}

export async function DELETE(request, context) {
  const { _id, error } = await resolveId(context);
  if (error) return error;

  const produse = await getCollection("produse");
  const result = await produse.deleteOne({ _id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Produs not found" }, { status: 404 });
  }

  return NextResponse.json({ deleted: _id.toString() });
}