import React from "react";
import "./Nav.css";

const Nav = (props) => (
    <nav className="navbar navbar-dark bg-dark">
        <ul>
            <li className="brand">
                <a href="/">Clicky Game</a>
            </li>
            {/* <InfoText state={props.answer} /> */}
            {
                {
                    'neutral': <li className="infoText">Click an image to begin!</li>,
                    'correct': <li className="infoText">You guessed correctly! Keep on going!</li>,
                    'incorrect': <li className="infoText">You guessed incorrectly! Gane over!</li>,
                    'winner': <li className="infoText">You guessed all 12 characters! You win!</li>
                }[props.answer]
            }
            {/* <li className="infoText">Click an image to begin!</li> */}
            <li>Score: {props.score} | Top Score: {props.topScore}</li>
        </ul>
        {/* <a className="navbar-brand" href="/">
      React Clicky Game
    </a> */}
    </nav>
);

export default Nav;
