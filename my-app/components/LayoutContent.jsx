"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const LayoutContent = ({ children }) => {
  const pathname = usePathname();

  const showNavbar =
    pathname.startsWith("/clienti") ||
    pathname.startsWith("/produse") ||
    pathname.startsWith("/facturi");

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default LayoutContent;