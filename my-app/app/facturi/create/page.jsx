"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateFactura = () => {
  const router = useRouter();

  const [clienti, setClienti] = useState([]);
  const [produse, setProduse] = useState([]);

  const [numarFactura, setNumarFactura] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("Emisă");
  const [dataEmitere, setDataEmitere] = useState("2026-05-05");

  const [produsId, setProdusId] = useState("");
  const [cantitate, setCantitate] = useState(1);
  const [produseFactura, setProduseFactura] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientiRes = await fetch("/api/clienti");
      const produseRes = await fetch("/api/produse");

      setClienti(await clientiRes.json());
      setProduse(await produseRes.json());
    };

    fetchData();
  }, []);

  const adaugaProdus = () => {
    const produs = produse.find((p) => p._id === produsId);

    if (!produs) {
      alert("Alege un produs");
      return;
    }

    const produsFactura = {
      id: produs._id,
      nume: produs.nume,
      cantitate: Number(cantitate),
      pret: Number(produs.pret),
    };

    setProduseFactura((prev) => [...prev, produsFactura]);
    setProdusId("");
    setCantitate(1);
  };

  const stergeProdus = (index) => {
    setProduseFactura((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const client = clienti.find((c) => c._id === clientId);

    if (!client) {
      alert("Alege un client");
      return;
    }

    if (produseFactura.length === 0) {
      alert("Adaugă cel puțin un produs pe factură");
      return;
    }

    const factura = {
      numarFactura,
      client: {
        id: client._id,
        nume: client.nume,
        email: client.email,
      },
      produse: produseFactura,
      status,
      dataEmitere,
    };

    const response = await fetch("/api/facturi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(factura),
    });

    if (response.ok) {
      router.push("/facturi");
    } else {
      alert("Factura nu a putut fi creată");
    }
  };

  const totalPreview = produseFactura.reduce(
    (sum, p) => sum + p.pret * p.cantitate,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Adaugă factură</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={numarFactura}
          onChange={(e) => setNumarFactura(e.target.value)}
          placeholder="Număr factură"
          className="border rounded px-3 py-2 flex-1 bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />

        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="border rounded px-3 py-2 flex-1 bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="">Alege client</option>
          {clienti.map((client) => (
            <option key={client._id} value={client._id}>
              {client.nume}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 flex-1 bg-white text-black dark:bg-gray-800 dark:text-white"
        >
          <option value="Emisă">Emisă</option>
          <option value="Plătită">Plătită</option>
        </select>

        <input
          type="date"
          value={dataEmitere}
          onChange={(e) => setDataEmitere(e.target.value)}
          className="border rounded px-3 py-2 flex-1 bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        />

        <div className="border rounded p-4 flex flex-col gap-3">
          <h2 className="font-semibold">Produse pe factură</h2>

          <div className="flex gap-2">
            <select
              value={produsId}
              onChange={(e) => setProdusId(e.target.value)}
              className="border rounded px-3 py-2 flex-1 bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              <option value="">Alege produs</option>
              {produse.map((produs) => (
                <option key={produs._id} value={produs._id}>
                  {produs.nume} - {produs.pret} lei
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={cantitate}
              onChange={(e) => setCantitate(e.target.value)}
              className="border rounded px-3 py-2 w-24 bg-white text-black dark:bg-gray-800 dark:text-white"
            />

            <button
              type="button"
              onClick={adaugaProdus}
              className="bg-gray-700 text-white rounded px-4 py-2"
            >
              Adaugă
            </button>
          </div>

          {produseFactura.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {produseFactura.map((produs, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border rounded p-2"
                >
                  <span>
                    {produs.nume} x {produs.cantitate} ={" "}
                    {produs.pret * produs.cantitate} lei
                  </span>

                  <button
                    type="button"
                    onClick={() => stergeProdus(index)}
                    className="text-red-500"
                  >
                    Șterge
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="font-bold mt-4">Total estimat: {totalPreview} lei</p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Salvează factura
        </button>
      </form>
    </div>
  );
};

export default CreateFactura;