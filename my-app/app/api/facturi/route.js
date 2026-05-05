import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import sgMail from "@sendgrid/mail";

export async function GET() {
  const facturi = await getCollection("facturi");
  const all = await facturi.find({}).toArray();

  return NextResponse.json(all);
}

export async function POST(request) {
  const body = await request.json();

  const total = body.produse.reduce((sum, produs) => {
    return sum + produs.pret * produs.cantitate;
  }, 0);

  body.total = total;

  const facturi = await getCollection("facturi");
  const { insertedId } = await facturi.insertOne(body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  await sgMail.send({
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Factură nouă creată - ${body.numarFactura}`,
    text: `
A fost creată o factură nouă.

Număr factură: ${body.numarFactura}
Client: ${body.client.nume}
Email client: ${body.client.email}
Total: ${body.total} lei
Status: ${body.status}
Data emiterii: ${body.dataEmitere}
    `,
  });

  return NextResponse.json(
    { _id: insertedId, ...body },
    { status: 201 }
  );
}