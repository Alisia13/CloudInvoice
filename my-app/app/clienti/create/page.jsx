"use client";

import { useRouter } from "next/navigation";
import ClientForm from "@/components/ClientForm";
import { clientDefaultValues } from "@/utils/constants";
import { createClient } from "@/utils/clientiFunctions";

const CreateClient = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await createClient(data);

    if (response) {
      router.push("/clienti");
    } else {
      alert("Clientul nu a putut fi adăugat");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Adaugă client</h1>
      <ClientForm data={clientDefaultValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateClient;