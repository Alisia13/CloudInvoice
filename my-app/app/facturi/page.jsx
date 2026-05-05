"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const FacturiPage = () => {
  const [facturi, setFacturi] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacturi = async () => {
    const res = await fetch("/api/facturi");
    const data = await res.json();

    setFacturi(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFacturi();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Facturi</h1>

        <Link href="/facturi/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          Creează factură
        </Link>
      </div>

      <div className="grid gap-4">
        {facturi.map((f) => (
          <div key={f._id} className="border rounded p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{f.numarFactura}</h2>

            <p>Client: {f.client.nume}</p>
            <p>Total: {f.total} lei</p>
            <p>Status: {f.status}</p>
            <p>Data: {f.dataEmitere}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacturiPage;