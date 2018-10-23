import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <div className="card">
    <div className="img-container">
      <img 
        alt={props.name}
        src={props.image}
        // value={props.id}
        // key={props.id}
        onClick={() => props.clickCharacter(props.id)}/>
    </div>
    {/* <span onClick={() => props.removeFriend(props.id)} className="remove">
      𝘅
    </span> */}
  </div>
);

export default FriendCard;
