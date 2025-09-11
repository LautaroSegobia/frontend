
import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="card">
      <div className="card__img-container">
        <img src={producto.foto} alt={producto.nombre} className="card__img" />
      </div>
      <div className="card__body">
        <h3 className="card__title">{producto.nombre}</h3>
        <p className="card__price">${producto.precio}</p>
        <button className="card__btn" onClick={() => agregarAlCarrito(producto)}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
