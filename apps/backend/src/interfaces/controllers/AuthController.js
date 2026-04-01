const RegisterUserUseCase = require('../../useCases/RegisterUserUseCase');
const LoginUserUseCase = require('../../useCases/LoginUserUseCase');
const { PostgresUserRepository, PostgresStoreRepository } = require('../../infrastructure/database/PostgresUserRepository');
const { AppError } = require('../../domain/exceptions/AppError');

/**
 * Controlador de autenticacion y registro de usuarios.
 *
 * Actua como punto de entrada HTTP para las operaciones de autenticacion.
 * Instancia los repositorios concretos de PostgreSQL y los inyecta en el caso de uso,
 * manteniendo el principio de inversion de dependencias de Clean Architecture:
 * el controlador conoce la infraestructura, pero el caso de uso no.
 */
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, storeName } = req.body;

    /**
     * Se instancian los repositorios concretos de PostgreSQL y se inyectan
     * en el caso de uso. Esta es la unica capa que conoce la implementacion
     * concreta de la persistencia; el caso de uso trabaja contra una interfaz implicita.
     */
    const userRepository = new PostgresUserRepository();
    const storeRepository = new PostgresStoreRepository();

    const registerUser = new RegisterUserUseCase({
      userRepository,
      storeRepository,
    });

    const result = await registerUser.execute({
      firstName,
      lastName,
      email,
      password,
      role,
      storeName,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente.',
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    next(error);
  }
};

/**
 * Endpoint para autenticar (login) de usuarios.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userRepository = new PostgresUserRepository();
    
    const loginUser = new LoginUserUseCase({
      userRepository,
    });

    const result = await loginUser.execute({ email, password });

    return res.status(200).json({
      status: 'success',
      message: 'Login exitoso.',
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    next(error);
  }
};

module.exports = { register, login };
