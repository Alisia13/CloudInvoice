"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProdusForm from "@/components/ProdusForm";
import Spinner from "@/components/Spinner";
import { produsDefaultValues } from "@/utils/constants";
import { getProdusById, updateProdus } from "@/utils/produseFunctions";

const EditProdusContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [produs, setProdus] = useState(produsDefaultValues);
  const [isLoading, setIsLoading] = useState(true);

  const getProdus = async (id) => {
    const data = await getProdusById(id);
    if (data) { 
      setProdus(data); 
    }

    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    const response = await updateProdus(data);

    if (response) {
      router.push("/produse");
    } else {
      alert("Produsul nu a putut fi actualizat");
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) {
      router.push("/produse");
    }
    else {
      getProdus(id);
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Editează produs</h1>
      <ProdusForm data={produs} onSubmit={onSubmit} />
    </div>
  );
};

const EditProdus = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <EditProdusContent />
    </Suspense>
  );
};

export default EditProdus;