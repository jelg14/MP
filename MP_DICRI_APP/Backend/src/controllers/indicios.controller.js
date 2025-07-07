const { poolPromise } = require('../config/db');

// Crear indicio
exports.crearIndicio = async (req, res) => {
  try {
    const {
      id_expediente, no_indicio, nombre, descripcion, color,
      tamaño, peso, unidad_peso, ubicacion, observaciones, id_tecnico
    } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id_expediente', id_expediente)
      .input('no_indicio', no_indicio)
      .input('nombre', nombre)
      .input('descripcion', descripcion)
      .input('color', color)
      .input('tamaño', tamaño)
      .input('peso', peso)
      .input('unidad_peso', unidad_peso)
      .input('ubicacion', ubicacion)
      .input('observaciones', observaciones)
      .input('id_tecnico', id_tecnico)
      .execute('sp_InsertarIndicio');
    res.status(201).json({ message: 'Indicio creado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar indicios por expediente
exports.listarIndiciosPorExpediente = async (req, res) => {
  try {
    const { id_expediente } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_expediente', id_expediente)
      .execute('sp_ConsultarIndiciosPorExpediente');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar indicio por ID
exports.buscarIndicioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_indicio', id)
      .execute('sp_BuscarIndicioPorId');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Indicio no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar indicio
exports.actualizarIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre, descripcion, color, tamaño, peso,
      unidad_peso, ubicacion, observaciones
    } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id_indicio', id)
      .input('nombre', nombre)
      .input('descripcion', descripcion)
      .input('color', color)
      .input('tamaño', tamaño)
      .input('peso', peso)
      .input('unidad_peso', unidad_peso)
      .input('ubicacion', ubicacion)
      .input('observaciones', observaciones)
      .execute('sp_ActualizarIndicio');
    res.json({ message: 'Indicio actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar indicio
exports.eliminarIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id_indicio', id)
      .execute('sp_EliminarIndicio');
    res.json({ message: 'Indicio eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
