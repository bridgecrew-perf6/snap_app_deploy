import React, {useState, useEffect} from "react";
import HighScoreList from "../Components/Highscore";
import Player1Hand from "../Components/Player1Hand";
import Player2Hand from "../Components/Player2Hand";
import SnapPool from "../Components/SnapPool";
import { postHighScore as dbpostHighScore } from "../HighScoreService";
import NameForm1 from "../Components/NameForm";
import { getHighScores as dbGetHighScores, deleteHighScore as dbDeleteHighScore, updateHighScore } from "../HighScoreService";
import Instructions from "../Components/Instructions";
import Controls from "../Components/Controls";
import Player1Info from "../Components/Player1Info";
import Player2Info from "../Components/Player2Info";
import PlayerSelector from "../Components/PlayerSelect";
import './SnapContainer.css';
import EndGame from "../Components/EndGame";
import { GiAce } from "react-icons/gi";
import DeletePlayer from "../Components/DeletePlayer";


const SnapContainer = () => {

    const [pool, setPool] = useState([]);
    const [hand1, setHand1] = useState([]);
    const [hand2, setHand2] = useState([]);
    const [highScores, setHighScores] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [player1name, setPlayer1Name] = useState("");
    // const [player2name, setPlayer2Name] = useState("");
    const [selectedPlayer1, setSelectedPlayer1] = useState({});
    const [selectedPlayer2, setSelectedPlayer2] = useState({});
    const [turn, setTurn] = useState(1);
    const [gameEnded, setGameEnded] = useState(false)
    const [winner, setWinner] = useState({})
    const [gameState, setGameState] = useState(false)
    const [playerToDelete, setPlayerToDelete] = useState({})
    const [winningScore, setWinningScore] = useState(0)
    const [testState, setTestState] = useState("")
    const [minus, setMinus] = useState("")
    const [minus2, setMinus2] = useState("")
    const [addPoints, setAddPoints] = useState("")
    const [addPoints2, setAddPoints2] = useState("")
    const [snapper1, setSnapper1] = useState("")
    const [snapper2, setSnapper2] = useState("")

    useEffect(() => {
        getPool();
    }, [])

    useEffect(() => {
        getHighScores();
    }, [])

    useEffect(() => {
        const interval = setInterval (() => {
            gameEnd()
        }, 1000)
    })


    const getPool = function(){
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(data => setPool(data.cards))
    }

    const dealPool = function(){
        if (gameState === false){
        let newPool = []
        let newHand1 = pool.slice(0, 26)
        let newHand2 = pool.slice(26, 52)
        setPool(newPool)
        setHand1(newHand1)
        setHand2(newHand2)
        setGameState(true)
        // let audio = new Audio("https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3")
        let shuffle = new Audio("./sounds/shuffle2.mp3")
        shuffle.play()
        }
    }

    const postHighScore = newHighScore => {
        dbpostHighScore(newHighScore)
          .then(savedHighScore => setHighScores([ ...highScores, savedHighScore ]))
      };

    const getHighScores = function(){
        dbGetHighScores()
        .then((data) => {
            setHighScores(data)
        })
    }

    const deleteHighScore = (id) => {
        dbDeleteHighScore(id).then(()=>{
            let temp = highScores.map(g=>g);
            const toDel = highScores.map(g =>g._id).indexOf(id);
            temp.splice(toDel, 1);
            setHighScores(temp);
            })
        }

    const updatePlayerScore = updatedScore => {
        updateHighScore(updatedScore);
        const updatedScoreIndex = highScores.findIndex(highScore => highScore._id === updatedScore._id);
        const updatedScores = [...highScores];
        updatedScores[updatedScoreIndex] = updatedScore;
        setHighScores(updatedScores);
    
      }
    
    const displayMinusScore = () => {
        setMinus("-500 Points")
        setTimeout(function(){
            setMinus("");
       }, 1000); 

    }

    const displayMinusScore2 = () => {
        setMinus2("-500 Points")
        setTimeout(function(){
            setMinus2("");
       }, 1000); 

    }

    const displayAddPoints = () => {
        setAddPoints(`+ ${pool.length * 100} Points`)
        setTimeout(function(){
            setAddPoints("");
       }, 1000); 

    }

    const displayAddPoints2 = () => {
        setAddPoints2(`+ ${pool.length * 100} Points`)
        setTimeout(function(){
            setAddPoints2("");
       }, 1000); 

    }

    const displaySnapper1 = () => {
        setSnapper1(`${selectedPlayer1.name} Slapped That Jack!!!`)
        setTimeout(function(){
            setSnapper1("");
       }, 1000); 

    }
    
    const displaySnapper2 = () => {
        setSnapper2(`${selectedPlayer2.name} Slapped That Jack!!!`)
        setTimeout(function(){
            setSnapper2("");
       }, 1000); 
    }
    
    //   function to be added to appropriate component in order to invoke updatePlayerScore function
    const givePlayer1FinalScore = () => {
        if (score1 > selectedPlayer1.score){
            updatePlayerScore({
                _id: selectedPlayer1._id,
                name: selectedPlayer1.name,
                score: score1
        })
        }
    }

    const givePlayer2FinalScore = () => {
        if (score2 > selectedPlayer2.score){
        updatePlayerScore({
            _id: selectedPlayer2._id,
            name: selectedPlayer2.name,
            score: score2
        })
    }}




    const gameEnd = function (){
        if ((hand1.length === 52)){
            givePlayer1FinalScore()
            setScore2(0)
            givePlayer2FinalScore()
            setGameEnded(true)
            setGameState(false)
            // setHand1([])
        }
        if ((hand2.length === 52)){
            givePlayer2FinalScore()
            setScore1(0)
            givePlayer1FinalScore()
            setGameEnded(true)
            setGameState(false)
            // setHand2([])
        }
    }

    const replayGame = () => {
        setGameEnded(false)
        setScore1(0)
        setScore2(0)
        getPool()
        dealPool()
        


    }

    

    
    function handleKeyPress(e) {
        var key = e.key;
        if (gameEnded === false){
        if (key === "a") {
            if ((hand1.length > 0) && (turn === 1)){
                let card = hand1.pop()
                let newPool = [...pool, card]
                setHand1(hand1)
                setPool(newPool)
                if (hand2.length > 0){
                    setTurn(2)}
            }
        }
        if (key === "l") {
            if ((hand2.length > 0) && (turn === 2)){
                let card = hand2.pop()
                let newPool = [...pool, card]
                setHand2(hand2)
                setPool(newPool)
                if (hand1.length > 0){
                    setTurn(1)}
            }
        }
        if (key === "d") {
            if ((pool[pool.length-1].value === pool[pool.length-2].value) || (pool[pool.length-1].value === pool[pool.length-3].value)){
                let newScore1 = (score1 + (pool.length * 100))
                setScore1(newScore1)
                displayAddPoints()
                displaySnapper1()
                let newHand1 = hand1.concat(pool)
                setHand1(newHand1)
                setPool([])
                setTurn(1)
                gameEnd()
            }
            else {
                let newScore = (score1 - 500)
                displayMinusScore()
                setScore1(newScore)
                setTurn(2)
            }
        }
        if (key === "j") {
            if ((pool[pool.length-1].value === pool[pool.length-2].value) || (pool[pool.length-1].value === pool[pool.length-3].value)){
                let newScore2 = (score2 + (pool.length * 100))
                displayAddPoints2()
                displaySnapper2()
                setScore2(newScore2)
                let newHand2 = hand2.concat(pool)
                setHand2(newHand2)
                setPool([])
                setTurn(2)
                gameEnd()
            }
            else {
                let newScore2 = (score2 - 500)
                displayMinusScore2()
                setScore2(newScore2)
                setTurn(1)
            }
        }
        if (((key === "l" ) || (key === "a")) && !((pool[pool.length-1].value === pool[pool.length-2].value) || (pool[pool.length-1].value === pool[pool.length-3].value)) && (pool.length === 52)){
            dealPool()
        }
        if (key === "p"){ //player 2 cheat button to scoop up all of pool
            let newScore2 = (score2 + (pool.length * 100))
            setScore2(newScore2)
            displayAddPoints2()
            displaySnapper2()
            let newHand2 = hand2.concat(pool)
            setHand2(newHand2)
            setPool([])
        }

        if (key === "1"){ //enter admin mode - tied to start game button
            if (isAdmin === false){
                setIsAdmin(true)
            }
            else {
                setIsAdmin(false)
            }
        }
    }
    }


    return(
        <>
        <div className="container">
            <div className="playerform">
            {isAdmin && (
                <div className="admin">
                    <DeletePlayer highScores={highScores} deleteHighScore={deleteHighScore} playerToDelete={playerToDelete} setPlayerToDelete={setPlayerToDelete}/>
                </div>
                )}
                <NameForm1 postHighScore={postHighScore} setPlayer1Name={setPlayer1Name} player1name={player1name}/>
                <PlayerSelector highScores={highScores} setSelectedPlayer1={setSelectedPlayer1} setSelectedPlayer2={setSelectedPlayer2}/>
                <button type="text" onKeyPress={(e) => handleKeyPress(e)} onClick={dealPool}>Start Game <GiAce/></button>
            </div>
            <div className="title">
                <h1><u></u><div className="neon-text">SNAP
                    </div>
                    </h1>
            </div>
            <div className="instructions">
                <button onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>Instructions</button>
                <button onMouseEnter={() => setIsShown2(true)} onMouseLeave={() => setIsShown2(false)}>Controls</button>
                {isShown && (
                <div className="ipopup">
                    <Instructions/>
                </div>
                )}
                {isShown2 && (
                <div className="cpopup">
                    <Controls/>
                </div>
                )}
            </div>
            <div className="p1hand">
                <div className="handcount">
                    <Player1Hand hand1={hand1}/>
                </div>
            </div>
            <div className="snappool">
                {gameEnded ? <EndGame hand1={hand1} hand2={hand2} score1={score1} score2={score2} selectedPlayer1={selectedPlayer1} selectedPlayer2={selectedPlayer2} winner={winner} setWinner={setWinner} setGameEnded={setGameEnded} setGameState={setGameState} replayGame={replayGame} setWinningScore={setWinningScore} winningScore={winningScore}/> : <SnapPool pool={pool} gameState={gameState} snapper1={snapper1} snapper2={snapper2}/>}
            </div>
            <div className="p2hand">
                <div className="handcount">
                    <Player2Hand hand2={hand2}/>
                </div>
            </div>
            <Player1Info selectedPlayer1={selectedPlayer1} score1={score1} minus={minus} addPoints={addPoints}/>
            <>&nbsp;</>
            <Player2Info selectedPlayer2={selectedPlayer2} score2={score2} minus2={minus2} addPoints2={addPoints2}/>
        </div>
    
        <div className="footer">
        <HighScoreList highScores={highScores} deleteHighScore={deleteHighScore} />
        </div>
        </>
        )
}

export default SnapContainer;