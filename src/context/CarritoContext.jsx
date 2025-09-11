
import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      const actualizado = carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    mostrarMensaje(`"${producto.nombre}" agregado al carrito`);
  };

  const actualizarCantidad = (id, cantidad) => {
    const actualizado = carrito.map(item =>
      item.id === id ? { ...item, cantidad } : item
    );
    setCarrito(actualizado);
  };

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const mostrarMensaje = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      setCarrito,
      agregarAlCarrito,
      actualizarCantidad,
      eliminarProducto,
      mostrarModal,
      setMostrarModal,
      toast
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

async function enviarPedido(items, total, customer = {}) {
  const payload = { items, total, customer };
  const res = await apiFetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res;
}

const confirmarCompra = async () => {
  try {
    setLoading(true);
    const items = carrito.map(item => ({ productId: item.id, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad, subtotal: item.cantidad * item.precio }));
    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    await enviarPedido(items, total, clienteInfo);
    
    localStorage.removeItem("carrito");
    setCarrito([]);
    setMostrarModal(false);
    setToast("Pedido enviado correctamente");
  } catch (err) {
    setToast("Error al enviar pedido, intentá nuevamente");
  } finally {
    setLoading(false);
  }
};
