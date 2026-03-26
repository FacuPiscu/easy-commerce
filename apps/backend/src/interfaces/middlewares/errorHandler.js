const { AppError } = require('../../domain');

/**
 * Middleware global de manejo de errores.
 * Intercepta todos los errores lanzados en la aplicacion y devuelve una respuesta JSON estructurada.
 * Distingue entre errores operacionales (esperados) y errores inesperados del sistema.
 */
const errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Error inesperado del sistema
  console.error('[Error inesperado]', err);
  return res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor.',
  });
};

module.exports = errorHandler;
