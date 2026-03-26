const { createApp, database } = require('./infrastructure');

const PORT = process.env.PORT || 3001;

/**
 * Punto de entrada principal de la aplicacion.
 * Verifica la conexion a la base de datos y levanta el servidor Express.
 */
const startServer = async () => {
  // Verificar conexion a la base de datos
  const isConnected = await database.testConnection();

  if (!isConnected) {
    console.warn(
      '[Servidor] No se pudo conectar a la base de datos. El servidor iniciara de todas formas.'
    );
  }

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`[Servidor] Easy Commerce Backend corriendo en http://localhost:${PORT}`);
    console.log(`[Servidor] Health check disponible en http://localhost:${PORT}/api/health`);
  });
};

startServer();
