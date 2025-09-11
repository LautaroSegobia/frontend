
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { carrito, setMostrarModal } = useContext(CarritoContext);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="/logo.png" alt="Juguetería cósmica" className="navbar__logo-img" />
        </Link>
      </div>

      <SearchBar />

      <button className="navbar__toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar__links ${menuAbierto ? 'show' : ''}`}>
        <Link to="/" onClick={() => setMenuAbierto(false)}>Home</Link>
        <Link to="/nosotros" onClick={() => setMenuAbierto(false)}>Nosotros</Link>
        
        <Link to="/alta" onClick={() => setMenuAbierto(false)}>Alta</Link>
        <Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>
        <button className="navbar__carrito" onClick={() => setMostrarModal(true)}>
          🛒 <span className="navbar__contador">{cantidadTotal}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
