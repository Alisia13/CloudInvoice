"use client";

import { useState } from "react";

const ClientForm = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState({
    ...data,
    dataCreare: data.dataCreare || new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "tipClient" && value === "Persoană fizică") {
        updated.cui = "";
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="nume" type="text" pattern="^[A-Za-zĂÂÎȘȚăâîșț\s]+$" title="Numele trebuie să conțină doar litere" value={formData.nume} onChange={handleChange} placeholder="Nume client" className="border rounded px-3 py-2" required />

      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2" required />

      <input name="telefon" type="tel" pattern="[0-9]{10}" title="Telefonul trebuie să conțină 10 cifre" value={formData.telefon} onChange={handleChange} placeholder="Telefon" className="border rounded px-3 py-2" />

      <input name="adresa" type="text" value={formData.adresa} onChange={handleChange} placeholder="Adresă" className="border rounded px-3 py-2" />

      <input name="dataCreare" type="date" value={formData.dataCreare} onChange={handleChange} className="border rounded px-3 py-2" />

      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
        {formData._id ? "Actualizează client" : "Adaugă client"}
      </button>
    </form>
  );
};

export default ClientForm;