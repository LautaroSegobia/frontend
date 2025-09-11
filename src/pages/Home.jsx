
import React, { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { productosFiltrados, cargando } = useContext(ProductosContext);

  if (cargando) return <p className="home__loading">Cargando productos...</p>;

  return (
    <main className="home">
      <h1 className="home__title">Catálogo de Productos</h1>

      {productosFiltrados.length === 0 ? (
        <p className="home__no-results">No se encontraron productos</p>
      ) : (
        <section className="home__grid">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;
