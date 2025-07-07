import { api } from "./api";

// Listar expedientes
export const getExpedientes = (token) =>
  api.get("/expedientes", { headers: { Authorization: `Bearer ${token}` } });

// Crear expediente (solo técnicos)
export const createExpediente = (data, token) =>
  api.post("/expedientes", data, { headers: { Authorization: `Bearer ${token}` } });

// Actualizar expediente (solo técnicos)
export const updateExpediente = (id, data, token) =>
  api.put(`/expedientes/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Eliminar (desactivar) expediente (solo técnicos)
export const deleteExpediente = (id, token) =>
  api.delete(`/expedientes/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Aprobar expediente (solo coordinadores)
export const aprobarExpediente = (id, id_coordinador, token) =>
  api.put(`/expedientes/${id}/aprobar`, { id_coordinador }, { headers: { Authorization: `Bearer ${token}` } });

// Rechazar expediente (solo coordinadores)
export const rechazarExpediente = (id, id_coordinador, razon, token) =>
  api.put(`/expedientes/${id}/rechazar`, { id_coordinador, razon }, { headers: { Authorization: `Bearer ${token}` } });

// Buscar expediente por ID
export const getExpedienteById = (id, token) =>
  api.get(`/expedientes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
