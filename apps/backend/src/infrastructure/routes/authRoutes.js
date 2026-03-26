const { Router } = require('express');
const { register } = require('../../interfaces/controllers/AuthController');

/**
 * Rutas de autenticacion del sistema.
 * Monta los endpoints de registro y login bajo el prefijo /auth.
 */
const router = Router();

router.post('/register', register);

module.exports = router;
