import React from 'react';
import '../styles/home.css';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

/**
 * Componente modular para mostrar un producto en la grilla del Marketplace.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={product.imageUrl} 
        alt={`Imagen de ${product.name}`} 
        className="product-image" 
        loading="lazy" 
      />
      <div className="product-info">
        <h4 className="product-title">{product.name}</h4>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <button className="buy-button">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
