"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClienti, deleteClient } from "@/utils/clientiFunctions";

const ClientiPage = () => {
    const [clienti, setClienti] = useState([]);
    const [user, setUser] = useState(null);

    const fetchClienti = async () => {
        const data = await getClienti();
        if (data) setClienti(data);
    };

    const handleDelete = async (id) => {
        console.log("ID primit:", id);

        if (!id) {
            alert("ID lipsă");
            return;
        }

        const success = await deleteClient(id);

        if (success) {
            setClienti((prev) => prev.filter((client) => client._id !== id));
        } else {
            alert("Clientul nu a putut fi șters");
        }
    };

    useEffect(() => {
        fetchClienti();
        const fetchUser = async () => {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        };
        fetchUser();
    }, []);

    const isAdmin = user?.rol === "admin";

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Clienți</h1>
                {isAdmin && (
                    <Link href="/clienti/create" className="bg-blue-600 text-white rounded px-4 py-2">
                        Adaugă client
                    </Link>
                )}
            </div>

            <div className="grid gap-4">
                {clienti.map((client) => (
                    <div key={client._id} className="border rounded-lg p-4 shadow-sm flex justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">{client.nume}</h2>
                            <p>{client.email}</p>
                            <p>{client.telefon}</p>
                            <p>{client.adresa}</p>
                            <p className="text-sm text-gray-400">Creat la: {client.dataCreare}</p>
                        </div>

                        {isAdmin && (
                            <div className="flex gap-2">
                                <Link href={`/clienti/edit?id=${client._id}`} className="bg-yellow-400 text-white rounded px-3 py-1 h-fit">
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(client._id)}
                                    className="bg-red-500 text-white rounded px-3 py-1 h-fit"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientiPage;