import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

/**
 * Panel lateral inteligente que adapta sus opciones
 * basado en el rol del usuario autenticado (BUYER o SELLER).
 */
const Sidebar: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Leer datos del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parseando el usuario desde localStorage', e);
      }
    }
  }, []);

  const role = user?.role || 'BUYER'; // Fallback a BUYER
  const isSeller = role === 'SELLER';
  const isBuyer = role === 'BUYER';

  return (
    <aside className="home-sidebar">
      <div className="sidebar-profile">
        <div className="avatar-placeholder">
          {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
        </div>
        <h4>{user?.firstName ? `${user.firstName} ${user.lastName}` : 'Usuario Invitado'}</h4>
        <span>{isSeller ? 'Vendedor' : 'Comprador'}</span>
      </div>

      {isBuyer && (
        <div className="sidebar-section">
          <h3>Mis Compras</h3>
          <ul className="sidebar-nav">
            <li><Link to="/home">Dashboard</Link></li>
            <li><Link to="/orders">Pedidos</Link></li>
            <li><Link to="/favorites">Favoritos</Link></li>
          </ul>
        </div>
      )}

      {isSeller && (
        <div className="sidebar-section">
          <h3>Panel de Mi Tienda</h3>
          <ul className="sidebar-nav">
            <li><Link to="/home">Dashboard</Link></li>
            <li><Link to="/products">Mis Productos</Link></li>
            <li><Link to="/sales">Ventas</Link></li>
          </ul>
        </div>
      )}

      <div className="sidebar-section" style={{ marginTop: 'auto' }}>
        <ul className="sidebar-nav">
          <li><Link to="/settings">Configuración</Link></li>
          <li>
            <Link 
              to="/login"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }}
              style={{ color: 'var(--error)' }}
            >
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
