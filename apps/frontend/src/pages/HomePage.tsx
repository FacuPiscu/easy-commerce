import React from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard, { type Product } from '../components/ProductCard';
import '../styles/home.css';

// mock data - 8 productos de ejemplo
const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Auriculares Inalámbricos Pro", price: 120, imageUrl: "https://picsum.photos/seed/tech/400/300" },
  { id: 2, name: "Silla de Escritorio Ergonómica", price: 250, imageUrl: "https://picsum.photos/seed/chair/400/300" },
  { id: 3, name: "Camiseta Deportiva Clásica", price: 35, imageUrl: "https://picsum.photos/seed/shirt/400/300" },
  { id: 4, name: "Monitor UltraWide 34'", price: 499, imageUrl: "https://picsum.photos/seed/monitor/400/300" },
  { id: 5, name: "Zapatillas Running Advance", price: 110, imageUrl: "https://picsum.photos/seed/shoes/400/300" },
  { id: 6, name: "Cafetera Expresso Italiana", price: 85, imageUrl: "https://picsum.photos/seed/coffee/400/300" },
  { id: 7, name: "Teclado Mecánico RGB", price: 145, imageUrl: "https://picsum.photos/seed/keyboard/400/300" },
  { id: 8, name: "Mochila Urbana Antirrobo", price: 60, imageUrl: "https://picsum.photos/seed/backpack/400/300" },
];

const HomePage: React.FC = () => {
  return (
    <div className="home-layout">
      {/* Columna Izquierda: Panel Lateral (Inteligente) */}
      <Sidebar />

      {/* Columna Derecha: Marketplace Main Area */}
      <main className="home-main">
        <header className="marketplace-header">
          <h2>Marketplace</h2>
          
          <div className="search-bar">
            {/* simple search icon svg */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Buscar productos, marcas o categorías..." />
          </div>
        </header>

        {/* Filtros Rapidos de Categoria */}
        <div className="category-tags">
          <span className="category-tag active">Todos</span>
          <span className="category-tag">Electrónica</span>
          <span className="category-tag">Ropa</span>
          <span className="category-tag">Hogar</span>
          <span className="category-tag">Deportes</span>
          <span className="category-tag">Videojuegos</span>
        </div>

        {/* Home Product Grid */}
        <section className="product-grid">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
