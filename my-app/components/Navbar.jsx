import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex gap-6 items-center">
      <Link href="/" className="font-bold text-lg">
        CloudInvoice
      </Link>

      <Link href="/clienti" className="hover:text-blue-300">
        Clienți
      </Link>

      <Link href="/produse" className="hover:text-blue-300">
        Produse
      </Link>

      <Link href="/facturi" className="hover:text-blue-300">
        Facturi
      </Link>
    </nav>
  );
};

export default Navbar;