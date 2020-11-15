import React from 'react';
import '../asset/css/dist/style.css'
import GameInfo from './GameInfo';
import GameBoard from './GameBoard';
function Game(){
    return(
        <div id='myGame'>
            <div id='gameTitle'>2048 Online Game</div>
            <GameInfo></GameInfo>
            <GameBoard></GameBoard>
        </div>
    )
}

export default Game;