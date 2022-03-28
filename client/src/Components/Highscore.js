import React from 'react';
import ListItem from './ListItem';
import './scoreBoard.css'

const HighScoreList = ({highScores, deleteHighScore, descendingHighScores, getDescendingHighScores}) => {

    

    let desHighScores = highScores.sort((a, b) => b.score - a.score);
    let topTenScores = desHighScores.slice(0, 10);
    let highScoreListItem = topTenScores.map((highScore, index) => { 
        return <ListItem highScore={highScore} key={highScore._id} deleteHighScore={deleteHighScore} index={index}/>
    })

    return (
        <div className='highScoreBoard'>
            <marquee scrolldelay="60" hspace="0" scrollamount="8"><h3>High Scores - {highScoreListItem}</h3></marquee>
    
        </div>
    )
}

// GET ALL from DB of winners 

// array of players[name, score]

// arranged in order of score


export default HighScoreList;