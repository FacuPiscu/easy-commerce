/**
 * Enumeracion de los roles validos del sistema.
 * Se utiliza como fuente de verdad para validar el rol asignado a cada usuario.
 */
const UserRole = Object.freeze({
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
});

/**
 * Entidad de dominio que representa a un usuario del sistema.
 * Contiene las reglas de validacion propias de la entidad, independientes de cualquier framework.
 */
class User {
  constructor({ id = null, firstName, lastName, email, role, createdAt = new Date() }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;

    this._validate();
  }

  /**
   * Ejecuta las validaciones de integridad sobre los campos obligatorios de la entidad.
   * Lanza un error si algun campo requerido esta ausente o si el rol no es valido.
   */
  _validate() {
    if (!this.firstName || typeof this.firstName !== 'string') {
      throw new Error('El nombre es obligatorio.');
    }

    if (!this.lastName || typeof this.lastName !== 'string') {
      throw new Error('El apellido es obligatorio.');
    }

    if (!this.email || typeof this.email !== 'string') {
      throw new Error('El email es obligatorio.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('El formato del email no es valido.');
    }

    if (!Object.values(UserRole).includes(this.role)) {
      throw new Error(`El rol "${this.role}" no es valido. Roles permitidos: ${Object.values(UserRole).join(', ')}.`);
    }
  }

  isSeller() {
    return this.role === UserRole.SELLER;
  }

  isBuyer() {
    return this.role === UserRole.BUYER;
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Retorna el nombre completo del usuario concatenando nombre y apellido.
   */
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = { User, UserRole };
