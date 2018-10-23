import React from "react";
import "./Footer.css";
import logo from './logo.svg';

const Footer = () => (
  <footer className="footer">
    <span>Made with React! <img src={logo} className="App-logo" alt="logo" /> </span>
  </footer>
);

export default Footer;
