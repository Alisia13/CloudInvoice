"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProduse, deleteProdus } from "@/utils/produseFunctions";
import Spinner from "@/components/Spinner";

const ProdusePage = () => {
  const [produse, setProduse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchProduse = async () => {
    const data = await getProduse();
    if (data) setProduse(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!id) return alert("ID lipsă");

    const success = await deleteProdus(id);

    if (success) {
      setProduse((prev) => prev.filter((produs) => produs._id !== id));
    } else {
      alert("Produsul nu a putut fi șters");
    }
  };

  useEffect(() => {
    fetchProduse();
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <Spinner />;

  const isAdmin = user?.rol === "admin";

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produse</h1>

        {isAdmin && (
          <Link href="/produse/create" className="bg-blue-600 text-white rounded px-4 py-2">
            Adaugă produs
          </Link>
        )}
      </div>

      <div className="grid gap-4">
        {produse.map((produs) => (
          <div key={produs._id} className="border rounded-lg p-4 shadow-sm flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">{produs.nume}</h2>
              <p>Categorie: {produs.categorie}</p>
              <p>Preț: {produs.pret} lei</p>
              <p className="text-sm text-gray-400">Creat la: {produs.dataCreare}</p>
            </div>

            {isAdmin && (
              <div className="flex gap-2">
                <Link href={`/produse/edit?id=${produs._id}`} className="bg-yellow-400 text-white rounded px-3 py-1 h-fit">
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(produs._id)}
                  className="bg-red-500 text-white rounded px-3 py-1 h-fit"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );


};

export default ProdusePage;