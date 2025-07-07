const { poolPromise } = require('../config/db'); // Importa la configuración de la base de datos

// Endpoint: Reporte por estado y fechas (SP)
exports.reporteExpedientes = async (req, res) => {
  try {
    const { estado, fecha_inicio, fecha_fin } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('estado', estado)
      .input('fecha_inicio', fecha_inicio)
      .input('fecha_fin', fecha_fin)
      .execute('sp_ReporteExpedientesPorEstadoYFecha');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint: Vista de expedientes con total de indicios
exports.vistaExpedientesConIndicios = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_ExpedientesConIndicios WHERE total_indicios > 0');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint: Vista de estadísticas de expedientes
exports.vistaEstadisticasExpedientes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EstadisticasExpedientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
