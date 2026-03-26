const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const requestLogger = require('../interfaces/middlewares/requestLogger');
const errorHandler = require('../interfaces/middlewares/errorHandler');

/**
 * Crea y configura la instancia de la aplicacion Express.
 * Separa la creacion del servidor de su inicio para facilitar testing.
 */
const createApp = () => {
  const app = express();

  // Middlewares globales
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  // Rutas de la API
  app.use('/api', routes);

  // Middleware de manejo de errores (debe ir despues de las rutas)
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
