import { api } from "./api";

// Consultar indicios por expediente
export const getIndiciosPorExpediente = (id_expediente, token) =>
  api.get(`/indicios/expediente/${id_expediente}`, { headers: { Authorization: `Bearer ${token}` } });

// Insertar indicio
export const createIndicio = (data, token) =>
  api.post("/indicios", data, { headers: { Authorization: `Bearer ${token}` } });

// Actualizar indicio
export const updateIndicio = (id, data, token) =>
  api.put(`/indicios/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Eliminar indicio
export const deleteIndicio = (id, token) =>
  api.delete(`/indicios/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Buscar indicio por ID
export const getIndicioById = (id, token) =>
  api.get(`/indicios/${id}`, { headers: { Authorization: `Bearer ${token}` } });
