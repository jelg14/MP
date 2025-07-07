import axios from "axios";
const API_URL = "http://localhost:3000/api"; // Cambia si tu backend está en otro puerto

export const api = axios.create({
  baseURL: API_URL,
});

// Helper para añadir el token en los headers
export function getAuthHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}
