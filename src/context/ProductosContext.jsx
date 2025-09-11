
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const API_URL = 'https://686ffc61465674424801243c.mockapi.io/productos';

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setCargando(false);
    }
  };

  const crearProducto = async (nuevoProducto) => {
    try {
      await axios.post(API_URL, nuevoProducto);
      await obtenerProductos();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  
  const productosFiltrados = productos.filter(p => {
    const q = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(q) ||
      p.descripcionCorta?.toLowerCase().includes(q) ||
      p.descripcionLarga?.toLowerCase().includes(q) ||
      p.marca?.toLowerCase().includes(q) ||
      p.categoria?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
  const cargar = async () => {
    try {
      const productos = await apiFetch("/api/products");
      setProductos(productos);
    } catch (err) {
      console.error("No se pudieron cargar productos:", err);
    }
  };
  cargar();
  }, []);

  return (
    <ProductosContext.Provider value={{
      productos,
      productosFiltrados,
      cargando,
      crearProducto,
      busqueda,
      setBusqueda
    }}>
      {children}
    </ProductosContext.Provider>
  );
};
