
import React, { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';

const SearchBar = () => {
  const { busqueda, setBusqueda } = useContext(ProductosContext);

  const handleChange = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Buscar por nombre, marca, categoría..."
      value={busqueda}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
