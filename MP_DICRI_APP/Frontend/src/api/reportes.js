import { api } from "./api";

// Reporte por estado y rango de fechas
export const getReporteExpedientes = (estado, fecha_inicio, fecha_fin, token) =>
  api.post(
    "/reportes/expedientes",
    { estado, fecha_inicio, fecha_fin },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// Vista: Expedientes con total de indicios (solo >= 1)
export const getExpedientesConIndicios = (token) =>
  api.get(`/reportes/expedientes-con-indicios`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Vista: Estadísticas por estado y mes
export const getEstadisticasExpedientes = (token) =>
  api.get("/reportes/estadisticas-expedientes", {
    headers: { Authorization: `Bearer ${token}` }
  });
