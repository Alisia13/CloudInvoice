"use client";

import { useRouter } from "next/navigation";
import ProdusForm from "@/components/ProdusForm";
import { produsDefaultValues } from "@/utils/constants";
import { createProdus } from "@/utils/produseFunctions";

const CreateProdus = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await createProdus(data);

    if (response) {
      router.push("/produse");
    } else {
      alert("Produsul nu a putut fi adăugat");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Adaugă produs</h1>
      <ProdusForm data={produsDefaultValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateProdus;