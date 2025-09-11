
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alta from './pages/Alta';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import MessageToast from './components/MessageToast';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <CartModal />
      <MessageToast />
      
      <Routes>
          <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/" element={<Home />} />
        <Route path="/alta" element={<Alta />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <Footer /> {}
    </>
  );
};

export default App;
