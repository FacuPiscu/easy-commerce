import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import '../styles/RegistrationForm.css';

/**
 * Definicion de roles para evitar el uso de 'enum' (no compatible con erasableSyntaxOnly).
 */
const UserRole = {
  BUYER: 'BUYER',
  SELLER: 'SELLER'
} as const;

type UserRoleType = typeof UserRole[keyof typeof UserRole];

/**
 * Contrato para los datos del formulario de registro.
 * 
 * Define la estructura necesaria para capturar la informacion de un nuevo usuario,
 * incluyendo campos opcionales que dependen de la seleccion del rol.
 */
interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleType;
  storeName?: string;
}

/**
 * Componente funcional que gestiona el registro de nuevos usuarios.
 * 
 * Este componente permite capturar los datos basicos de un usuario y,
 * en caso de seleccionar el rol de vendedor (SELLER), habilita dinamicamente
 * campos adicionales requeridos para la creacion de su futura tienda.
 */
const RegistrationForm: React.FC = () => {
  // Estado local para la opcion visual seleccionada (mapeo de UI a roles internos)
  const [visualRole, setVisualRole] = useState<'BUYER' | 'SELLER_ONLY' | 'BOTH'>('BUYER');

  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: UserRole.BUYER,
    storeName: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Actualiza el estado del formulario cuando se modifica un campo de entrada.
   * Procesa de forma generica los cambios basados en el atributo 'name' de los inputs.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Cambia el rol del usuario en el formulario basandose en la opcion visual seleccionada.
   * 
   * Esta funcion mapea tres opciones de la interfaz a los dos roles internos del sistema:
   * - 'BUYER' (Solo quiero comprar) -> Mapea a BUYER.
   * - 'SELLER_ONLY' (Solo quiero vender) -> Mapea a SELLER.
   * - 'BOTH' (Quiero comprar y vender) -> Mapea a SELLER.
   */
  const handleVisualRoleChange = (option: 'BUYER' | 'SELLER_ONLY' | 'BOTH') => {
    setVisualRole(option);
    
    // Mapeo logico: Solo BUYER mantiene el rol de comprador, los demas son vendedores.
    const internalRole = option === 'BUYER' ? UserRole.BUYER : UserRole.SELLER;
    
    setFormData(prev => ({
      ...prev,
      role: internalRole,
      // Limpiar storeName si no es vendedor
      storeName: internalRole === UserRole.BUYER ? '' : prev.storeName
    }));
  };

  /**
   * Procesa la accion de envio del formulario de registro.
   * 
   * Realiza una validacion preliminar (ademas de las validaciones HTML5),
   * activa el estado de carga y prepara los datos para la comunicacion con el backend.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Logica de registro a ser implementada e integrada con el servicio de backend
    console.log('Informacion de registro enviada:', formData);
    
    // Simulacion de proceso asincrono para demostrar estados visuales
    setTimeout(() => {
      setIsLoading(false);
      alert(`${formData.firstName}, tu registro como ${formData.role === UserRole.BUYER ? 'Comprador' : 'Vendedor'} se ha iniciado.`);
    }, 1500);
  };

  return (
    <div className="registration-content">
      <header className="registration-header">
        <h2>Crear Cuenta</h2>
        <p>Unete a Easy Commerce y comienza tu camino hoy.</p>
      </header>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ej: Juan"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Ej: Perez"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="email">Correo Electronico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="juan.perez@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="password">Contrasena</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Minimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div className="form-group full-width">
          <label>Cual es tu objetivo?</label>
          <div className="role-selector vertical">
            <button 
              type="button"
              className={`role-option ${visualRole === 'BUYER' ? 'active' : ''}`}
              onClick={() => handleVisualRoleChange('BUYER')}
            >
              Solo quiero comprar
            </button>
            <button 
              type="button"
              className={`role-option ${visualRole === 'SELLER_ONLY' ? 'active' : ''}`}
              onClick={() => handleVisualRoleChange('SELLER_ONLY')}
            >
              Solo quiero vender
            </button>
            <button 
              type="button"
              className={`role-option ${visualRole === 'BOTH' ? 'active' : ''}`}
              onClick={() => handleVisualRoleChange('BOTH')}
            >
              Quiero comprar y vender
            </button>
          </div>
        </div>

        {formData.role === UserRole.SELLER && (
          <div className="form-group full-width seller-field">
            <label htmlFor="storeName">Nombre de tu Tienda</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              placeholder="Ej: Mi Bazar Online"
              value={formData.storeName}
              onChange={handleChange}
              required={formData.role === UserRole.SELLER}
            />
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button full-width" 
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
