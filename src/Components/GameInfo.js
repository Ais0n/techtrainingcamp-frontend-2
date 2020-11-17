import React from 'react';

function GameInfo(props){
    return (
        <div id='gameInfo'>
            <div className="score"> Score: </div>
            <div className="level">Level: {props.boardSize}</div>
        </div>
    )
}

export default GameInfo;