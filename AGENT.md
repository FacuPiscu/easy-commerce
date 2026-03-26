# Contexto Global: Proyecto "Easy Commerce"

## 1. Identidad del Proyecto
- **Nombre:** Easy Commerce.
- **Ecosistema:** Plataforma desarrollada por EasySoft.
- **Descripción:** Plataforma SaaS multi-tenant (multi-inquilino) para la creación y gestión autónoma de tiendas online.

## 2. Arquitectura y Estructura
- **Patrón Base:** Clean Architecture (Domain, Use Cases, Interfaces/Adapters, Infrastructure).
- **Estructura de Directorios:** Monorepo utilizando NPM Workspaces.
- **Directorio Raíz:** Contiene el `package.json` principal y la carpeta `/apps`.
- **Backend:** Ubicado en `/apps/backend`.
- **Frontend:** Ubicado en `/apps/frontend`.

## 3. Stack Tecnológico Estricto
### Backend
- **Entorno:** Node.js.
- **Framework:** Express.
- **Base de Datos:** PostgreSQL (alojada en Supabase).
- **Conexión DB:** Utilizar estrictamente el paquete nativo `pg`. Toda comunicación entre el frontend y la base de datos DEBE pasar por este backend de Express.

### Frontend
- **Librería Core:** React.
- **Bundler:** Vite.
- **Lenguaje:** TypeScript estricto (`.ts` para lógica, `.tsx` para componentes).
- **Estilos:** CSS Puro (`.css`).
- **REGLA ESTRICTA DE UI:** ESTÁ TOTALMENTE PROHIBIDO instalar o utilizar frameworks de CSS (Tailwind, Bootstrap, Material UI, etc.). Todo el diseño se maneja con hojas de estilo nativas y variables CSS dinámicas.

## 4. Reglas Estrictas de Código (CRÍTICO)
- **PROHIBIDO EL USO DE EMOJIS:** Cero emojis en el código, en los commits, en los console.log y en la interfaz de usuario.
- **Idioma del Código (Inglés):** Todos los nombres de archivos, carpetas, funciones, clases, objetos, interfaces y variables DEBEN estar en inglés (estándar de la industria).
- **Idioma de la Interfaz (Español):** Todo texto visible para el usuario final (UI, alertas, correos) DEBE estar en español.
- **Reglas de Comentarios:**
  - Deben escribirse en español.
  - Deben redactarse en tercera persona (ej: "Esta función calcula...", no "Aquí calculo...").
  - SOLO deben usarse para describir funciones complejas o lógica de negocio que no sea evidente. No comentar lo obvio.
- **Nomenclatura:** Usar `camelCase` para variables/funciones, `PascalCase` para componentes/clases/interfaces, y `snake_case` para tablas/columnas en PostgreSQL.
- **Seguridad:** Sanitizar siempre los inputs. Usar consultas parametrizadas (`$1, $2`) con `pg` en PostgreSQL para evitar inyección SQL. Prohibido concatenar strings en consultas SQL.

## 5. Lógica de Negocio Clave
- **Roles:** Administradores de tienda (vendedores) y Compradores. Se gestiona en una única tabla de usuarios con control de rol.
- **Modelo Freemium:** Prueba de 20 días (permite construcción de tienda, pero bloquea visibilidad pública y ventas) vs. Suscripción Activa (habilita visibilidad y checkout).
- **Theming:** Las tiendas usan componentes pre-armados en React. La personalización (colores, fuentes) se inyecta dinámicamente leyendo un JSON de PostgreSQL a través de variables CSS puras.