const { User, UserRole } = require('../domain/models/User');
const { Store, SubscriptionStatus } = require('../domain/models/Store');
const { ValidationError } = require('../domain/exceptions/AppError');

/**
 * Caso de uso encargado de orquestar el registro de un nuevo usuario en el sistema.
 *
 * Recibe los repositorios de usuario y tienda mediante inyeccion de dependencias
 * en el constructor, manteniendo la capa de casos de uso desacoplada de la infraestructura.
 *
 * Flujo principal:
 *   1. Valida que el email no este registrado previamente.
 *   2. Crea la entidad de usuario con los datos proporcionados.
 *   3. Persiste el usuario a traves del repositorio inyectado.
 *   4. Si el rol es SELLER, genera automaticamente una tienda en estado de prueba.
 *
 * Regla de negocio del periodo de prueba:
 *   Cuando un vendedor se registra, se le crea una tienda con estado TRIAL.
 *   La tienda permanece invisible al publico (isVisible = false) durante los 20 dias
 *   de prueba gratuita. Este periodo permite al vendedor construir y configurar su tienda,
 *   pero bloquea la visibilidad publica y las ventas hasta que active una suscripcion paga.
 *   La fecha de finalizacion del trial se calcula sumando exactamente 20 dias a la fecha
 *   de creacion del usuario.
 */
class RegisterUserUseCase {
  /**
   * @param {Object} dependencies - Repositorios inyectados.
   * @param {Object} dependencies.userRepository - Contrato: findByEmail(email), create(userData).
   * @param {Object} dependencies.storeRepository - Contrato: create(storeData).
   */
  constructor({ userRepository, storeRepository }) {
    this.userRepository = userRepository;
    this.storeRepository = storeRepository;
  }

  /**
   * Ejecuta el flujo completo de registro de un nuevo usuario.
   *
   * @param {Object} input - Datos del formulario de registro.
   * @param {string} input.firstName - Nombre del usuario.
   * @param {string} input.lastName - Apellido del usuario.
   * @param {string} input.email - Correo electronico.
   * @param {string} input.password - Contrasena en texto plano (el repositorio se encarga del hash).
   * @param {string} input.role - Rol solicitado (BUYER, SELLER, ADMIN).
   * @param {string} [input.storeName] - Nombre de la tienda (obligatorio si el rol es SELLER).
   * @returns {Object} Resultado con el usuario creado y, opcionalmente, la tienda.
   */
  async execute({ firstName, lastName, email, password, role, storeName }) {
    // Verificar que el email no este previamente registrado
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('El email ya se encuentra registrado.');
    }

    // Construir la entidad de dominio (las validaciones internas se ejecutan en el constructor)
    const user = new User({ firstName, lastName, email, role });

    // Persistir el usuario a traves del repositorio
    const createdUser = await this.userRepository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password,
    });

    let createdStore = null;

    /**
     * Si el usuario solicita rol SELLER, se genera automaticamente una tienda en estado de prueba.
     * La tienda se crea con subscriptionStatus = TRIAL, isVisible = false, y una fecha de fin
     * de trial calculada sumando 20 dias a la fecha actual. Durante este periodo el vendedor
     * puede construir su tienda, pero esta no sera visible al publico ni habilitara ventas.
     */
    if (createdUser.role === UserRole.SELLER) {
      if (!storeName || typeof storeName !== 'string' || storeName.trim().length === 0) {
        throw new ValidationError('El nombre de la tienda es obligatorio para vendedores.');
      }

      const slug = this._generateSlug(storeName);
      const trialEndDate = Store.calculateTrialEndDate(createdUser.createdAt);

      const store = new Store({
        userId: createdUser.id,
        name: storeName.trim(),
        slug,
        subscriptionStatus: SubscriptionStatus.TRIAL,
        trialEndDate,
        isVisible: false,
      });

      createdStore = await this.storeRepository.create({
        userId: store.userId,
        name: store.name,
        slug: store.slug,
        subscriptionStatus: store.subscriptionStatus,
        trialEndDate: store.trialEndDate,
        isVisible: store.isVisible,
      });
    }

    return {
      user: createdUser,
      store: createdStore,
    };
  }

  /**
   * Genera un slug URL-friendly a partir del nombre de la tienda.
   * Convierte a minusculas, reemplaza espacios y caracteres especiales por guiones,
   * y elimina guiones duplicados o al final de la cadena.
   */
  _generateSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

module.exports = RegisterUserUseCase;
