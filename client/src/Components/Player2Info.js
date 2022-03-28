import './PlayerInfo.css';

const Player2Info = ({selectedPlayer2, score2, minus2, addPoints2}) =>{
    return (
        <div className="playerInfo">
            <h2>{selectedPlayer2.name}</h2>
            <h2>Score: {score2}&nbsp;<span className="minus">{minus2}</span><span className="add">{addPoints2}</span></h2>
            <h2>&nbsp;</h2>
            <h2>&nbsp;</h2>
        </div>
    )
}

export default Player2Info;