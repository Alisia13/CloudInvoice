import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

function toObjectId(id) {
  if (!id || !ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

async function resolveId(params) {
  const { id } = await params;
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

export async function GET(request, { params }) {
  const { _id, error } = await resolveId(params);

  if (error) return error;

  const clienti = await getCollection("clienti");
  const client = await clienti.findOne({ _id });

  if (!client) {
    return NextResponse.json(
      { error: "Client not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ...client,
    _id: client._id.toString(),
  });
}

export async function PUT(request, { params }) {
  const { _id, error } = await resolveId(params);

  if (error) return error;

  const body = await request.json();
  delete body._id;

  const clienti = await getCollection("clienti");

  const updatedClient = await clienti.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnDocument: "after" }
  );

  if (!updatedClient) {
    return NextResponse.json(
      { error: "Client not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ...updatedClient,
    _id: updatedClient._id.toString(),
  });
}

export async function DELETE(request, { params }) {
  const { _id, error } = await resolveId(params);

  if (error) return error;

  const clienti = await getCollection("clienti");

  const { deletedCount } = await clienti.deleteOne({ _id });

  if (deletedCount === 0) {
    return NextResponse.json(
      { error: "Client not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    deleted: _id.toString(),
  });
}