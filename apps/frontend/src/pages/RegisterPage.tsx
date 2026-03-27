import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import '../styles/layouts.css';

/**
 * Pagina de registro de nuevos usuarios.
 * 
 * Centraliza el formulario de registro avanzado dentro del diseño compartido de
 * autenticacion, integrando el logo corporativo y el fondo de marca.
 */
const RegisterPage: React.FC = () => {
  return (
    <div className="forms-layout">
      {/* 
        El componente RegistrationForm ya tiene su propio estilo de contenedor blanco,
        pero aqui lo integramos con el logo y el layout general.
      */}
      <div className="auth-container">
        <img src="/images/logo.png" alt="Easy Commerce Logo" className="auth-logo" />
        
        <RegistrationForm />

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          Ya tienes una cuenta? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>Inicia sesion</Link>
        </p>
      </div>

      <footer className="shared-footer">
        <span>Desarrollado por EasySoft, 2026</span>
      </footer>
    </div>
  );
};

export default RegisterPage;
