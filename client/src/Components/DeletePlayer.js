import React from "react";

const DeletePlayer = ({highScores, deleteHighScore, playerToDelete, setPlayerToDelete}) => {


    const handleChange1 = function(event){
        const chosenPlayer = highScores[event.target.value]
        console.log(event.target.value)
        setPlayerToDelete(chosenPlayer)
        console.log("player to delete", playerToDelete)
    }

    const handleClick = () => {
        deleteHighScore(playerToDelete._id)
        setPlayerToDelete({})
    }

    const playerOptions = highScores.map((highscore, index) => {
        return <option value={index} key={index}>{highscore.name}</option>

    })



    return (
        <div>
        <select defaultValue="" onChange={handleChange1}>
            <option disabled value="">Delete Player (admin only)</option>
            {playerOptions} 
        </select>
        <button onClick={handleClick}>Delete Player</button>
        </div>
    )
}

export default DeletePlayer;