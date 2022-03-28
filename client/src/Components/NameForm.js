import React, {useState} from "react";
import './NameForm.css';



const NameForm1 = ({postHighScore, setPlayer1Name, player1name}) =>{
    // const [player1name, setPlayer1Name] = useState("");
    // const [player2name, setPlayer2Name] = useState("");

    const handlePlayer1NameChange = (event) => setPlayer1Name(event.target.value);

    const handleSubmit1 = (event) => {
        event.preventDefault();
        postHighScore({
            name: player1name,
            score: 0
        });
    }
    const [isAdmin, setIsAdmin] = useState(false);

    function handleKeyPress(e) {
        var key = e.key;
        if (key === "1") {
            if (isAdmin === false){
                setIsAdmin(true)
            }
            else {
                setIsAdmin(false)
            }
        }
    }

    return (
        <div className="form">
        <form className="" onSubmit={handleSubmit1} method="post" id="playerForm">
            {/* <label htmlFor="player1name">Add Player:</label> */}
            <input onChange={handlePlayer1NameChange}type="text" id="player1name" required placeholder="New Player Name"/>
            {/* <input type="submit" value="Add" id="Start"/> */}
            <button type="submit" >Add</button>
            <button type="reset" onKeyPress={(e) => handleKeyPress(e)}>Reset</button>
        </form>
        </div>


    )
}
export default NameForm1;