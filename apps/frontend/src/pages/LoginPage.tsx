import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/layouts.css';

/**
 * Pagina de inicio de sesion (Auth).
 * 
 * Implementa un contenedor blanco centrado sobre el fondo de marca,
 * siguiendo los lineamientos de diseño corporativo de Easy Soft.
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await loginUser({ email, password });
      navigate('/home');
    } catch (err: any) {
      setError('Email o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forms-layout">
      <div className="auth-container">
        <img src="/images/logo.png" alt="Easy Commerce Logo" className="auth-logo" />
        
        <header className="registration-header">
          <h2>Iniciar Sesion</h2>
          <p>Ingresa tus credenciales para continuar.</p>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </header>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="email">Correo Electronico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="password">Contrasena</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button full-width" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
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
