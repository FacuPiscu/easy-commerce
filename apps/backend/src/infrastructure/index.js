/**
 * Punto de entrada de la capa de infraestructura.
 * Re-exporta la configuracion del servidor y la conexion a base de datos.
 */
const createApp = require('./server');
const database = require('./database/db');

module.exports = {
  createApp,
  database,
};
