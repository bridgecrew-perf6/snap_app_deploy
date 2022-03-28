import React from "react";

const Card = ({card, index}) => {


    return (
        <div>
         <img src={card.image} alt={`${card.value} OF ${card.suit}`} id="card"></img>
        </div>
    )
}

export default Card