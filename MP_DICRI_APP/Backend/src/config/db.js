require('dotenv').config();
const sql = require('mssql');
console.log('user:', process.env.DB_USER);
console.log('server:', process.env.DB_SERVER);
console.log('port:', process.env.DB_PORT);    
// console.log('password:', process.env.DB_PASSWORD); // No imprimir la contraseña por seguridad
console.log('database:', process.env.DB_DATABASE);

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // 127.0.0.1
    port: parseInt(process.env.DB_PORT, 10), // 1433
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => console.log('Error de conexión a la base de datos:', err));

module.exports = { sql, poolPromise };
