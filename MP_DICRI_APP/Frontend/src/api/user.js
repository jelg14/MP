
import { api } from "./api";

// Obtener todos los usuarios
export const getUsers = (token) =>
  api.get("/usuarios", { headers: { Authorization: `Bearer ${token}` } });

// Crear usuario
export const createUser = (data, token) =>
  api.post("/usuarios/register", data, { headers: { Authorization: `Bearer ${token}` } });

// Actualizar usuario
export const updateUser = (id, data, token) =>
  api.put(`/usuarios/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Eliminar usuario
export const deleteUser = (id, token) =>
  api.delete(`/usuarios/${id}`, { headers: { Authorization: `Bearer ${token}` } });
