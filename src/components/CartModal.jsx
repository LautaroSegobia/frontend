
import React, { useContext, useEffect } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const CartModal = () => {
  const {
    carrito,
    mostrarModal,
    setMostrarModal,
    actualizarCantidad,
    eliminarProducto
  } = useContext(CarritoContext);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMostrarModal(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  if (!mostrarModal) return null;

  const totalFinal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={() => setMostrarModal(false)}>✖</button>
        <h2>Tu carrito</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          carrito.map(producto => (
            <div className="modal__item" key={producto.id}>
              <img src={producto.foto} alt={producto.nombre} className="modal__img" />
              <div>
                <h4>{producto.nombre}</h4>
                <p>Precio: ${producto.precio}</p>
                <div className="modal__controles">
                  <button
                    onClick={() =>
                      actualizarCantidad(producto.id, Math.max(producto.cantidad - 1, 1))
                    }
                  >-</button>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) =>
                      actualizarCantidad(producto.id, Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                  />
                  <button
                    onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                  >+</button>
                  <button onClick={() => eliminarProducto(producto.id)}>🗑️</button>
                </div>
                <p>Subtotal: ${producto.precio * producto.cantidad}</p>
              </div>
            </div>
          ))
        )}
        {carrito.length > 0 && (
  <div className="modal__total">
    <h3>Total: ${totalFinal.toFixed(2)}</h3>
    <button className="finalizar-btn" onClick={() => alert('Gracias por tu compra!')}>
      Finalizar compra
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default CartModal;
