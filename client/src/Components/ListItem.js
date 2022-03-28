import React from 'react';

const ListItem = ({highScore, deleteHighScore, index}) => {


    return (
        <div className='individual-player'>
            {index + 1}:  {highScore.name}&nbsp;{highScore.score}&nbsp;&nbsp;     
        </div>
    )
}
// 🗑
export default ListItem;