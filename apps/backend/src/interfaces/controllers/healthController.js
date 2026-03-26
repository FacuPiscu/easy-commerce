/**
 * Controlador de salud del servidor.
 * Provee un endpoint basico para verificar que la API esta operativa.
 */
const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor operativo.',
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  healthCheck,
};
