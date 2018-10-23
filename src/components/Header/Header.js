import React from "react";
import "./Header.css";

const Header = props => (
  <div className="header text-center" style={{ backgroundImage: `url(${props.backgroundImage})`, backgroundSize: `640px 275px`, backgroundRepeat: `no-repeat` }}>
    {props.children}
  </div>
);

export default Header;
