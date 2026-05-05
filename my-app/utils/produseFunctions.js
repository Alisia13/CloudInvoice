export const getProduse = async () => {
  const response = await fetch("/api/produse");
  if (!response.ok) return null;
  return response.json();
};

export const getProdusById = async (id) => {
  const response = await fetch(`/api/produse/${id}`);
  if (!response.ok) return null;
  return response.json();
};

export const createProdus = async (data) => {
  delete data._id;

  const response = await fetch("/api/produse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) return null;
  return response.json();
};

export const updateProdus = async (data) => {
  const { _id, ...body } = data;

  const response = await fetch(`/api/produse/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) return null;
  return response.json();
};

export const deleteProdus = async (id) => {
  const response = await fetch(`/api/produse/${id}`, {
    method: "DELETE",
  });

  return response.ok;
};