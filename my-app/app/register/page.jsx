"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nume: "",
    email: "",
    parola: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Contul nu a putut fi creat");
      return;
    }

    router.push("/login");
  };

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Creează cont</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="nume"
          type="text"
          placeholder="Nume"
          value={formData.nume}
          onChange={handleChange}
          className="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />

        <input
          name="parola"
          type="password"
          placeholder="Parolă"
          value={formData.parola}
          onChange={handleChange}
          className="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
          Înregistrare
        </button>
      </form>

      <p className="mt-4 text-sm">
        Ai deja cont?{" "}
        <Link href="/login" className="text-blue-500">
          Autentifică-te
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;