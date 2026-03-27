import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layouts.css';

/**
 * Pagina de inicio de sesion (Auth).
 * 
 * Implementa un contenedor blanco centrado sobre el fondo de marca,
 * siguiendo los lineamientos de diseño corporativo de Easy Soft.
 */
const LoginPage: React.FC = () => {
  return (
    <div className="forms-layout">
      <div className="auth-container">
        <img src="/images/logo.png" alt="Easy Commerce Logo" className="auth-logo" />
        
        <header className="registration-header">
          <h2>Iniciar Sesion</h2>
          <p>Ingresa tus credenciales para continuar.</p>
        </header>

        <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group full-width">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" id="email" placeholder="tu@email.com" />
          </div>

          <div className="form-group full-width">
            <label htmlFor="password">Contrasena</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="submit-button full-width">
            Ingresar
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          No tienes cuenta? <Link to="/register" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>Registrate aqui</Link>
        </p>
      </div>

      <footer className="shared-footer">
        <span>Desarrollado por EasySoft, 2026</span>
      </footer>
    </div>
  );
};

export default LoginPage;
