export const getClienti = async () => {
  const response = await fetch("/api/clienti");
  if (!response.ok) return null;
  return response.json();
};

export const getClientById = async (id) => {
  const response = await fetch(`/api/clienti/${id}`);
  if (!response.ok) return null;
  return response.json();
};

export const createClient = async (data) => {
  const response = await fetch("/api/clienti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) return null;
  return response.json();
};

export const updateClient = async (data) => {
  const { _id, ...body } = data;

  const response = await fetch(`/api/clienti/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) return null;
  return response.json();
};

export const deleteClient = async (id) => {
  console.log("DELETE ID:", id);

  const response = await fetch(`/api/clienti/${id}`, {
    method: "DELETE",
  });

  return response.ok;
};