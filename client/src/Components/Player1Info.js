// import './PlayerInfo.css';

const Player1Info = ({selectedPlayer1, score1, minus, addPoints}) =>{

    

    


    return (
        <div className="playerInfo">
            <h2>{selectedPlayer1.name}</h2>
            <h2>Score: {score1}&nbsp;<span className="minus">{minus}</span><span className="add">{addPoints}</span></h2>
            <h2>&nbsp;</h2>
            <h2>&nbsp;</h2>
            

        </div>
    )
}

export default Player1Info;