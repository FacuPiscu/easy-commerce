import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

/**
 * Componente principal de la aplicacion que gestiona el enrutamiento.
 * 
 * Implementa el enrutador de nivel superior para la navegacion entre
 * la pantalla de bienvenida y las vistas de autenticacion (Login y Registro).
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raiz que carga la pantalla de bienvenida inicial */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* Ruta para el inicio de sesion */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Ruta para el registro de nuevos usuarios */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
