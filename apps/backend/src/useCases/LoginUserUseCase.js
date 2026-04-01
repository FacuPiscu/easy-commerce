const jwt = require('jsonwebtoken');
const { AppError } = require('../domain/exceptions/AppError');

/**
 * Caso de uso para la autenticacion de usuarios.
 * 
 * Implementa la logica de negocio para login:
 * 1. Verifica si el usuario existe.
 * 2. Verifica si la contrasena es correcta.
 * 3. Si todo es exitoso, genera un token JWT.
 */
class LoginUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('Email y contraseña son requeridos', 400);
    }

    // 1. Buscar usuario
    const user = await this.userRepository.findByEmail(email);

    // 2. Verificar existencia y contrasena (texto plano por ahora)
    if (!user || user.password !== password) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // 3. Generar token JWT
    const secret = process.env.JWT_SECRET || 'easycommerce-secret-key-2026';
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      secret,
      { expiresIn: '24h' }
    );

    // Excluir la contrasena del usuario que se retorna
    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword
    };
  }
}

module.exports = LoginUserUseCase;
