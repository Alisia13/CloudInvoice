"use client";

import { useState } from "react";

const ProdusForm = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState({
    ...data,
    dataCreare: data.dataCreare || new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "pret" || name === "stoc" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="nume"
        type="text"
        value={formData.nume}
        onChange={handleChange}
        placeholder="Nume produs"
        className="border rounded px-3 py-2"
        required
      />

      <input
        name="categorie"
        type="text"
        value={formData.categorie}
        onChange={handleChange}
        placeholder="Categorie"
        className="border rounded px-3 py-2"
        required
      />

      <input
        name="pret"
        type="number"
        min="1"
        value={formData.pret}
        onChange={handleChange}
        placeholder="Preț"
        className="border rounded px-3 py-2"
        required
      />

      <input
        name="stoc"
        type="number"
        min="0"
        value={formData.stoc}
        onChange={handleChange}
        placeholder="Stoc"
        className="border rounded px-3 py-2"
        required
      />

      <input
        name="dataCreare"
        type="date"
        value={formData.dataCreare}
        onChange={handleChange}
        className="border rounded px-3 py-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        {formData._id ? "Actualizează produs" : "Adaugă produs"}
      </button>
    </form>
  );
};

export default ProdusForm;