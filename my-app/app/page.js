import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">CloudInvoice</h1>
      <p className="text-gray-600 mb-6">
        Aplicație pentru gestionarea clienților, produselor și facturilor.
      </p>

      <div className="flex gap-4">
        <Link href="/clienti" className="bg-blue-600 text-white px-4 py-2 rounded">
          Clienți
        </Link>

        <Link href="/produse" className="bg-gray-700 text-white px-4 py-2 rounded">
          Produse
        </Link>

        <Link href="/facturi" className="bg-green-600 text-white px-4 py-2 rounded">
          Facturi
        </Link>
      </div>
    </main>
  );
}