import React from 'react';

function GameInfo(props){
    return (
        <div id='gameInfo'>
            <div className="score"> Score:{props.score}</div>
            <div className="level">Level: {props.boardSize-2}</div>
        </div>
    )
}

export default GameInfo;