"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ClientForm from "@/components/ClientForm";
import { clientDefaultValues } from "@/utils/constants";
import { getClientById, updateClient } from "@/utils/clientiFunctions";
import Spinner from "@/components/Spinner";

const EditClientContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [client, setClient] = useState(clientDefaultValues);
  const [isLoading, setIsLoading] = useState(true);

  const getClient = async (id) => {
    const data = await getClientById(id);

    if (data) {
      setClient(data);
    }

    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    const response = await updateClient(data);

    if (response) {
      router.push("/clienti");
    } else {
      alert("Clientul nu a putut fi actualizat");
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) {
      router.push("/clienti");
    } else {
      getClient(id);
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Editează client</h1>
      <ClientForm data={client} onSubmit={onSubmit} />
    </div>
  );
};

const EditClient = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <EditClientContent />
    </Suspense>
  );
};

export default EditClient;