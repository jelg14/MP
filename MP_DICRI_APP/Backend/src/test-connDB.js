require('dotenv').config(); // Si usas variables de entorno
const { poolPromise } = require('./config/db'); // Ajusta la ruta si es necesario

async function testConnection() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT GETDATE() AS fecha_actual');
    console.log('Conexión exitosa. Fecha/hora del servidor SQL:', result.recordset[0].fecha_actual);
    process.exit(0);
  } catch (err) {
    console.error('Error de conexión:', err);
    process.exit(1);
  }
}

testConnection();
