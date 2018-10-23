import React from "react";
import "./Nav.css";

const Nav = (props) => (
    <nav className="navbar navbar-dark bg-dark">
        <ul>
            <li class="brand">
                <a href="/">Clicky Game</a>
            </li>
            <li class="">Click an image to begin!</li>
            <li>Score: {props.score} | Top Score: {props.topScore}</li>
        </ul>
        {/* <a className="navbar-brand" href="/">
      React Clicky Game
    </a> */}
    </nav>
);

export default Nav;
