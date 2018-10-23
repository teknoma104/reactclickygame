import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <div className="card">
    <div className="img-container">
      <img 
        alt={props.name}
        title={props.name}
        src={props.image}
        onClick={() => props.clickCharacter(props.id)}/>
    </div>
  </div>
);

export default FriendCard;
