-- ============================================================
-- Easy Commerce - Script de inicializacion de base de datos
-- Plataforma SaaS multi-tenant para gestion de tiendas online
-- ============================================================

-- Habilita la extension pgcrypto para la generacion de UUIDs.
-- Supabase la incluye por defecto, pero se asegura su existencia.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- Tabla: users
-- Almacena los datos de todos los usuarios registrados en la plataforma.
-- Un usuario puede tener uno de tres roles:
--   BUYER  : comprador que navega y realiza compras.
--   SELLER : vendedor que administra su propia tienda.
--   ADMIN  : administrador con acceso total al sistema.
-- ============================================================
CREATE TABLE users (
    -- Identificador unico del usuario, generado automaticamente como UUID v4.
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Nombre del usuario.
    first_name VARCHAR(100) NOT NULL,

    -- Apellido del usuario.
    last_name VARCHAR(100) NOT NULL,

    -- Correo electronico. Se utiliza como identificador de login y debe ser unico en toda la plataforma.
    email VARCHAR(255) NOT NULL UNIQUE,

    -- Contrasena del usuario almacenada con hash.
    password VARCHAR(255) NOT NULL,

    -- Rol del usuario dentro de la plataforma. Restringe los valores permitidos mediante CHECK.
    role VARCHAR(10) NOT NULL CHECK (role IN ('BUYER', 'SELLER', 'ADMIN')),

    -- Fecha y hora de creacion del registro, asignada automaticamente por PostgreSQL.
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indice sobre el campo email para acelerar las busquedas durante el login y la validacion de duplicados.
CREATE INDEX idx_users_email ON users (email);

-- ============================================================
-- Tabla: stores
-- Representa una tienda dentro de la plataforma.
-- Cada tienda pertenece a un unico usuario con rol SELLER.
-- Cuando un vendedor se registra, se le crea automaticamente una tienda
-- en estado TRIAL con 20 dias de prueba gratuita.
-- Durante el periodo de prueba la tienda permanece invisible al publico
-- (is_visible = false), permitiendo al vendedor configurarla sin que
-- los compradores puedan verla ni realizar compras.
-- ============================================================
CREATE TABLE stores (
    -- Identificador unico de la tienda, generado automaticamente como UUID v4.
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Referencia al usuario propietario de la tienda.
    -- ON DELETE CASCADE elimina la tienda si el usuario es eliminado, manteniendo integridad referencial.
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Nombre comercial de la tienda, visible en la interfaz publica.
    name VARCHAR(150) NOT NULL,

    -- Slug URL-friendly que identifica la tienda en la URL publica (ej: /tienda/mi-tienda-online).
    -- Debe ser unico para evitar colisiones de rutas entre tiendas.
    slug VARCHAR(200) NOT NULL UNIQUE,

    -- Estado de la suscripcion de la tienda. Controla el acceso a funcionalidades:
    --   TRIAL    : periodo de prueba de 20 dias. Permite construir la tienda pero bloquea visibilidad y ventas.
    --   ACTIVE   : suscripcion paga activa. Habilita visibilidad publica y checkout.
    --   INACTIVE : suscripcion vencida o cancelada. Bloquea visibilidad y ventas.
    subscription_status VARCHAR(10) NOT NULL DEFAULT 'TRIAL'
        CHECK (subscription_status IN ('TRIAL', 'ACTIVE', 'INACTIVE')),

    -- Fecha y hora en que finaliza el periodo de prueba gratuito.
    -- Se calcula sumando exactamente 20 dias a la fecha de registro del vendedor.
    trial_end_date TIMESTAMP WITH TIME ZONE,

    -- Indica si la tienda es visible para los compradores en la plataforma publica.
    -- Se establece en false durante el periodo de prueba y se activa al contratar una suscripcion.
    is_visible BOOLEAN NOT NULL DEFAULT FALSE,

    -- Fecha y hora de creacion del registro de la tienda.
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indice sobre user_id para acelerar las consultas de tiendas por propietario.
CREATE INDEX idx_stores_user_id ON stores (user_id);

-- Indice sobre slug para acelerar la resolucion de URLs publicas de tiendas.
CREATE INDEX idx_stores_slug ON stores (slug);
