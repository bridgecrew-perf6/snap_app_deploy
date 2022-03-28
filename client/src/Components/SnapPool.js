import React from "react";
import Card from "./Card";
import './SnapPool.css';

const SnapPool =({pool, gameState, snapper1, snapper2}) =>{

    const snapPool = pool.map((card, index) => { 
            return <Card 
            card={card} 
            key={index} 
            index={index}/>
        });

        return(
        <div className="snappool">
            {gameState ? 
            <>
                <div className="card1">{snapPool[snapPool.length-1]}<h1>{snapper1}{snapper2}</h1> </div>
                <div className="card2">{snapPool[snapPool.length-2]}</div>
                <div className="card3">{snapPool[snapPool.length-3]}</div>
                <div className="card4">{snapPool[snapPool.length-4]}</div>
                <div className="card5">{snapPool[snapPool.length-5]}</div>
                <div className="card6">{snapPool[snapPool.length-6]}</div>
            </> : <div></div>}
            
        </div>
    )
    };
export default SnapPool;




