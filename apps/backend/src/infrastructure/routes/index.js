const { Router } = require('express');
const { healthCheck } = require('../../interfaces/controllers/healthController');
const authRoutes = require('./authRoutes');

/**
 * Definicion central de las rutas de la API.
 * Cada modulo de rutas se monta bajo su prefijo correspondiente.
 */
const router = Router();

// Ruta de verificacion de salud del servidor
router.get('/health', healthCheck);

// Rutas de autenticacion (registro, login)
router.use('/auth', authRoutes);

module.exports = router;
