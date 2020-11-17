import React, {useState} from 'react';
import '../asset/css/dist/style.css'
import GameInfo from './GameInfo';
import GameBoard from './GameBoard';
function Game(){
    const [isNewGame, setNewGame] = useState(true);
    const [boardSize, setBoardSize] = useState(3);
    return (
      <div id="myGame">
        <div id="gameTitle">2048 Online Game</div>
        <GameInfo
          boardSize={boardSize}
          setNewGame={setNewGame}
          setBoardSize={setBoardSize}
        ></GameInfo>
        <GameBoard isNewGame={isNewGame} boardSize={boardSize}></GameBoard>
      </div>
    );
}

export default Game;