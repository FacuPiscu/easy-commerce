require('dotenv').config({ override: true });
const { Pool } = require('pg');

/**
 * Pool de conexiones a PostgreSQL alojado en Supabase.
 * Se utiliza la cadena de conexion cargada desde el archivo .env.
 * El parametro override: true asegura que las variables locales prevalezcan.
 */
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Ejecuta una consulta SQL parametrizada mediante el pool de conexiones.
 * El uso del pool permite gestionar el ciclo de vida de las conexiones de forma eficiente.
 */
const query = (text, params) => pool.query(text, params);

/**
 * Verifica la comunicacion con el servidor de base de datos.
 * Realiza una consulta simple de prueba para confirmar el estado de la conexion
 * y reportar el exito o el error detallado en la consola.
 */
const testConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('[Base de Datos] Conexión exitosa');
    return true;
  } catch (error) {
    console.error('[Base de Datos] Error de conexion detallado:', error);
    return false;
  }
};

module.exports = {
  pool,
  query,
  testConnection,
};
