const { query } = require('./db');

/**
 * Repositorio de PostgreSQL que implementa la persistencia de usuarios y tiendas.
 *
 * Esta clase actua como adaptador entre la capa de casos de uso y la base de datos.
 * La inyeccion de dependencias en RegisterUserUseCase espera un objeto con los metodos
 * findByEmail() y create() para el repositorio de usuarios, y create() para el de tiendas.
 *
 * Esta clase encapsula ambos contratos y expone metodos separados para cada entidad.
 * Todas las consultas utilizan exclusivamente parametros posicionales ($1, $2, ...)
 * para prevenir inyeccion SQL, conforme a las reglas de seguridad del proyecto.
 */
class PostgresUserRepository {
  /**
   * Busca un usuario por su email en la tabla usuarios.
   * Retorna el usuario mapeado a formato camelCase si existe, o null si no se encuentra.
   */
  async findByEmail(email) {
    const result = await query(
      'SELECT id, first_name, last_name, email, role, password, created_at FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this._mapUserRow(result.rows[0]);
  }

  /**
   * Inserta un nuevo usuario en la tabla usuarios.
   * Recibe los datos ya validados por la entidad de dominio y retorna el registro creado
   * con su id y created_at generados por PostgreSQL.
   */
  async create({ firstName, lastName, email, role, password }) {
    const result = await query(
      `INSERT INTO users (first_name, last_name, email, role, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, role, created_at`,
      [firstName, lastName, email, role, password]
    );

    return this._mapUserRow(result.rows[0]);
  }

  /**
   * Transforma una fila de la tabla usuarios (snake_case) al formato camelCase
   * que utilizan las entidades de dominio en la aplicacion.
   */
  _mapUserRow(row) {
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      role: row.role,
      password: row.password,
      createdAt: row.created_at,
    };
  }
}

/**
 * Repositorio de PostgreSQL para la persistencia de tiendas.
 * Implementa el contrato create() esperado por RegisterUserUseCase a traves
 * de la inyeccion de dependencias como storeRepository.
 */
class PostgresStoreRepository {
  /**
   * Inserta una nueva tienda en la tabla tiendas.
   * Recibe los datos ya validados por la entidad Store y retorna el registro creado
   * con su id generado por PostgreSQL.
   */
  async create({ userId, name, slug, subscriptionStatus, trialEndDate, isVisible }) {
    const result = await query(
      `INSERT INTO stores (user_id, name, slug, subscription_status, trial_end_date, is_visible)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, name, slug, subscription_status, trial_end_date, is_visible`,
      [userId, name, slug, subscriptionStatus, trialEndDate, isVisible]
    );

    return this._mapStoreRow(result.rows[0]);
  }

  /**
   * Transforma una fila de la tabla tiendas (snake_case) al formato camelCase
   * que utilizan las entidades de dominio en la aplicacion.
   */
  _mapStoreRow(row) {
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      slug: row.slug,
      subscriptionStatus: row.subscription_status,
      trialEndDate: row.trial_end_date,
      isVisible: row.is_visible,
    };
  }
}

module.exports = { PostgresUserRepository, PostgresStoreRepository };
