import React from 'react';
import './EndGame.css';
import CountUp from 'react-countup';



const EndGame = ({score1, score2, selectedPlayer1, selectedPlayer2, winner, setWinner, setGameEnded, setGameState, replayGame, winningScore, setWinningScore, hand1, hand2}) => {

        
        let winner1 = selectedPlayer1
        let winner2 = selectedPlayer2
        if (hand1.length === 52) {
        setWinner(winner1)
        setWinningScore(score1)
        }else{
            setWinner(winner2)
            setWinningScore(score2)
        }

        const handleClick2 = () =>{
            replayGame()
        }


        const handleClick = ()=>{
            window.location.reload();
         }

         


    return (
        <div className="gameover-screen">
        <h2>Game Over</h2>
        <h3>{winner.name} wins!!!</h3>
        {/* <p>{selectedPlayer1.name}: <CountUp start={0} end={score1} duration={2.5} delay={0.5} /></p> */}
        <p>Score: <CountUp start={0} end={winningScore} duration={2.5} delay={0.5} /></p>
        {/* <h3>{winner.name} wins!!!</h3> */}
        <button onClick={handleClick}>New Game</button>
        {/* <button onClick={handleClick2}>Play Again</button> */}
        </div>
    )
}


export default EndGame;