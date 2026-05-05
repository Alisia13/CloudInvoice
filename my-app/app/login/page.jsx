"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
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

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Autentificare eșuată");
      return;
    }

    router.push("/");
  };

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Autentificare</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        Nu ai cont?{" "}
        <Link href="/register" className="text-blue-500">
          Creează cont
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;