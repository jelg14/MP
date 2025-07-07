const { poolPromise } = require('../config/db');

// Crear expediente
exports.crearExpediente = async (req, res) => {
  try {
    const { no_expediente, Titulo, descripcion, id_tecnico } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('no_expediente', no_expediente)
      .input('Titulo', Titulo)
      .input('descripcion', descripcion)
      .input('id_tecnico', id_tecnico)
      .execute('sp_InsertarExpediente');
    res.status(201).json({ message: 'Expediente creado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar expedientes activos
exports.listarExpedientes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('sp_ConsultarExpedientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar expediente por ID
exports.buscarExpedientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_expediente', id)
      .execute('sp_BuscarExpedientePorId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Expediente no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar expediente
exports.actualizarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { no_expediente, Titulo, descripcion } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id_expediente', id)
      .input('no_expediente', no_expediente)
      .input('Titulo', Titulo)
      .input('descripcion', descripcion)
      .execute('sp_ActualizarExpediente');
    res.json({ message: 'Expediente actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aprobar expediente
exports.aprobarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_coordinador } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id_expediente', id)
      .input('id_coordinador', id_coordinador)
      .execute('sp_AprobarExpediente');
    res.json({ message: 'Expediente aprobado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rechazar expediente
exports.rechazarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_coordinador, razon } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id_expediente', id)
      .input('id_coordinador', id_coordinador)
      .input('razon', razon)
      .execute('sp_RechazarExpediente');
    res.json({ message: 'Expediente rechazado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar (desactivar) expediente
exports.desactivarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id_expediente', id)
      .execute('sp_DesactivarExpediente');
    res.json({ message: 'Expediente desactivado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reporte de expedientes por estado y fechas
exports.reporteExpedientesPorEstadoYFecha = async (req, res) => {
  try {
    const { estado, fecha_inicio, fecha_fin } = req.query;
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
