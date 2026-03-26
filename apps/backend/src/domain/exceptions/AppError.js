/**
 * Clase base para errores personalizados de la aplicacion.
 * Permite un manejo centralizado de errores con codigo de estado HTTP y mensaje descriptivo.
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error para recursos no encontrados (HTTP 404).
 */
class NotFoundError extends AppError {
  constructor(resource = 'Recurso') {
    super(`${resource} no encontrado.`, 404);
  }
}

/**
 * Error para solicitudes no autorizadas (HTTP 401).
 */
class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado.') {
    super(message, 401);
  }
}

/**
 * Error para solicitudes con datos invalidos (HTTP 400).
 */
class ValidationError extends AppError {
  constructor(message = 'Datos de entrada invalidos.') {
    super(message, 400);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
};
