
import React from 'react';
import { FaInstagram, FaYoutube, FaSpotify, FaTwitter, FaFacebook, FaXbox, FaXRay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__redes">
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
      </div>
      <p>&copy; {new Date().getFullYear()} Juguetería Cósmica. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
