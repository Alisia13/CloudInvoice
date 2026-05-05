"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link href="/" className="font-bold text-lg">
          CloudInvoice
        </Link>

        <Link href="/clienti">Clienți</Link>
        <Link href="/produse">Produse</Link>
        <Link href="/facturi">Facturi</Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;