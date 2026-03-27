import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css';
import '../styles/layouts.css';
import '../styles/welcome.css';

/**
 * Pantalla de bienvenida inicial del sistema Easy Commerce.
 * 
 * Este componente actua como la puerta de entrada inicial, aplicando
 * el diseño compartido con fondo de marca e integrando el logo corporativo
 * dentro de un contenedor semi-transparente para una legibilidad premium.
 */
const WelcomePage: React.FC = () => {
  return (
    <div className="forms-layout">
      <main className="welcome-container">
        {/* Referencia directa a la carpeta public/images/logo.png */}
        <img src="/images/logo.png" alt="Easy Commerce Logo" className="auth-logo" />
        
        <section className="welcome-content">
          <h1>Bienvenido a EasyCommerce</h1>
          <p>Tu plataforma integral para el comercio inteligente.</p>
          
          <div className="welcome-actions">
            <Link to="/login" className="btn btn-primary">Entrar</Link>
            <Link to="/register" className="btn btn-outline">Registrarse</Link>
          </div>
        </section>
      </main>

      <footer className="shared-footer">
        <span>Desarrollado por EasySoft, 2026</span>
      </footer>
    </div>
  );
};

export default WelcomePage;
