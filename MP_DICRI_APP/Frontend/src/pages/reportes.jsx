import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getReporteExpedientes,
  getExpedientesConIndicios,
  getEstadisticasExpedientes,
} from "../api/reportes";

export default function Reportes() {
  const { token } = useAuth();

  // Filtros y estados
  const [estado, setEstado] = useState("registrado");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reporte, setReporte] = useState([]);
  const [expedientesConIndicios, setExpedientesConIndicios] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Consultar reporte por estado y fechas
  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!fechaInicio || !fechaFin) {
      alert("Debes seleccionar ambas fechas.");
      return;
    }
    setLoading(true);
    try {
      const res = await getReporteExpedientes(estado, fechaInicio, fechaFin, token);
      setReporte(res.data);
    } catch (error) {
      alert("Error al consultar el reporte.");
    }
    setLoading(false);
  };

  // Consultar expedientes con indicios
  const cargarExpedientesConIndicios = async () => {
    setLoading(true);
    try {
      const res = await getExpedientesConIndicios(token);
      setExpedientesConIndicios(res.data);
    } catch (error) {
      alert("Error al consultar expedientes con indicios.");
    }
    setLoading(false);
  };

  // Consultar estadísticas
  const cargarEstadisticas = async () => {
    setLoading(true);
    try {
      const res = await getEstadisticasExpedientes(token);
      setEstadisticas(res.data);
    } catch (error) {
      alert("Error al consultar estadísticas.");
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-main">
      <h2>Reportes de Expedientes</h2>

      {/* Filtros */}
      <form onSubmit={handleBuscar} style={{ marginBottom: "2rem" }}>
        <select value={estado} onChange={e => setEstado(e.target.value)} required>
          <option value="registrado">registrado</option>
          <option value="aprobado">aprobado</option>
          <option value="rechazado">rechazado</option>
        </select>
        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required />
        <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Buscando..." : "Buscar"}</button>
      </form>

      {/* Resultados del SP de reporte */}
      <h3>Expedientes filtrados</h3>
      <table>
        <thead>
          <tr>
            <th>No. Expediente</th>
            <th>Título</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            <th>Fecha Aprobación</th>
            <th>Fecha Rechazo</th>
            <th>Razón de Rechazo</th>
          </tr>
        </thead>
        <tbody>
          {reporte.length === 0 ? (
            <tr>
              <td colSpan={7}>No hay datos para mostrar.</td>
            </tr>
          ) : (
            reporte.map(exp => (
              <tr key={exp.id_expediente}>
                <td>{exp.no_expediente}</td>
                <td>{exp.Titulo}</td>
                <td>{exp.estado}</td>
                <td>{exp.fecha_registro?.slice(0,10)}</td>
                <td>{exp.fecha_aprobacion?.slice(0,10) || "-"}</td>
                <td>{exp.fecha_rechazo?.slice(0,10) || "-"}</td>
                <td>{exp.razon_de_rechazo || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Expedientes con indicios */}
      <h3>
        Expedientes con indicios (1 o más)
        <button style={{marginLeft: '1em'}} onClick={cargarExpedientesConIndicios} disabled={loading}>
          {loading ? "Cargando..." : "Actualizar"}
        </button>
      </h3>
      <table>
        <thead>
          <tr>
            <th>No. Expediente</th>
            <th>Título</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            <th>Total Indicios</th>
          </tr>
        </thead>
        <tbody>
          {expedientesConIndicios.length === 0 ? (
            <tr>
              <td colSpan={5}>No hay expedientes con indicios.</td>
            </tr>
          ) : (
            expedientesConIndicios.map(exp => (
              <tr key={exp.id_expediente}>
                <td>{exp.no_expediente}</td>
                <td>{exp.Titulo}</td>
                <td>{exp.estado}</td>
                <td>{exp.fecha_registro?.slice(0,10)}</td>
                <td>{exp.total_indicios}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Estadísticas */}
      <h3>
        Estadísticas mensuales
        <button style={{marginLeft: '1em'}} onClick={cargarEstadisticas} disabled={loading}>
          {loading ? "Cargando..." : "Actualizar"}
        </button>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Año</th>
            <th>Mes</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {estadisticas.length === 0 ? (
            <tr>
              <td colSpan={4}>No hay estadísticas disponibles.</td>
            </tr>
          ) : (
            estadisticas.map(est => (
              <tr key={est.estado + est.anio + est.mes}>
                <td>{est.estado}</td>
                <td>{est.anio}</td>
                <td>{est.mes}</td>
                <td>{est.total}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
