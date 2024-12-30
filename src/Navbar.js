import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <nav >
      <a href='/'>
        <img src="/src/assets/tsa-logo.png" alt="Logo" />
      </a>
      <span className="menu-toggle" onClick={toggleMenu}>
        ☰
      </span>
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li><a href="/about-us">About</a></li>
        <li><a href="/registration">Registration</a></li>
        <li>
          <a href="#">Get Involved</a>
          <ul className="dropdn">
            <li><a href="Conferences">Conferences</a></li>
          </ul>
        </li>
        <li><a href="/calendar">Calendar</a></li>
      </ul>
      <button className="contact"><a href="/contact-us">Contact Us</a></button>
    </nav>
  );
};

export default Navbar;

