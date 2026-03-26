/**
 * Middleware de logging de peticiones HTTP.
 * Registra en consola el metodo, la ruta y el tiempo de respuesta de cada request.
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = requestLogger;
