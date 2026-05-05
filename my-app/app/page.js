"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api/auth/me");

      if (!res.ok) {
        router.push("/login");
        return;
      }

      setChecking(false);
    };

    checkLogin();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  if (checking) return null;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">CloudInvoice</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

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