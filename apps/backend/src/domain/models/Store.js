/**
 * Enumeracion de los estados de suscripcion validos para una tienda.
 */
const SubscriptionStatus = Object.freeze({
  TRIAL: 'TRIAL',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

/** Cantidad de dias que dura el periodo de prueba gratuito. */
const TRIAL_DURATION_DAYS = 20;

/**
 * Entidad de dominio que representa una tienda dentro de la plataforma.
 * Cada tienda pertenece a un usuario con rol SELLER y posee su propio ciclo de vida de suscripcion.
 */
class Store {
  constructor({
    id = null,
    userId,
    name,
    slug,
    subscriptionStatus = SubscriptionStatus.TRIAL,
    trialEndDate = null,
    isVisible = false,
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.slug = slug;
    this.subscriptionStatus = subscriptionStatus;
    this.trialEndDate = trialEndDate;
    this.isVisible = isVisible;

    this._validate();
  }

  /**
   * Ejecuta las validaciones de integridad sobre los campos obligatorios de la tienda.
   */
  _validate() {
    if (!this.userId) {
      throw new Error('El ID del usuario propietario es obligatorio.');
    }

    if (!this.name || typeof this.name !== 'string') {
      throw new Error('El nombre de la tienda es obligatorio.');
    }

    if (!this.slug || typeof this.slug !== 'string') {
      throw new Error('El slug de la tienda es obligatorio.');
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(this.slug)) {
      throw new Error('El slug solo puede contener letras minusculas, numeros y guiones.');
    }

    if (!Object.values(SubscriptionStatus).includes(this.subscriptionStatus)) {
      throw new Error(
        `El estado de suscripcion "${this.subscriptionStatus}" no es valido. Estados permitidos: ${Object.values(SubscriptionStatus).join(', ')}.`
      );
    }
  }

  /**
   * Determina si la tienda se encuentra dentro de su periodo de prueba gratuito.
   * Compara la fecha actual contra la fecha de fin de trial almacenada.
   */
  isTrialActive() {
    if (this.subscriptionStatus !== SubscriptionStatus.TRIAL || !this.trialEndDate) {
      return false;
    }
    return new Date() <= new Date(this.trialEndDate);
  }

  /**
   * Determina si la tienda tiene una suscripcion activa que habilita visibilidad publica y ventas.
   */
  hasActiveSubscription() {
    return this.subscriptionStatus === SubscriptionStatus.ACTIVE;
  }

  /**
   * Calcula la fecha de finalizacion del periodo de prueba sumando la cantidad
   * de dias definida en TRIAL_DURATION_DAYS a la fecha proporcionada.
   */
  static calculateTrialEndDate(startDate = new Date()) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + TRIAL_DURATION_DAYS);
    return endDate;
  }
}

module.exports = { Store, SubscriptionStatus, TRIAL_DURATION_DAYS };
