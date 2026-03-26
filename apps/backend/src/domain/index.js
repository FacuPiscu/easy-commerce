/**
 * Punto de entrada de la capa de dominio.
 * Re-exporta todas las entidades, enumeraciones y excepciones del dominio.
 */
const { User, UserRole } = require('./models/User');
const { Store, SubscriptionStatus, TRIAL_DURATION_DAYS } = require('./models/Store');
const exceptions = require('./exceptions/AppError');

module.exports = {
  User,
  UserRole,
  Store,
  SubscriptionStatus,
  TRIAL_DURATION_DAYS,
  ...exceptions,
};
