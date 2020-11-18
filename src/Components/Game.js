import React, {useState, useEffect} from 'react';
import cloneDeep from 'clone-deep';
import '../asset/css/dist/style.css'
import GameInfo from './GameInfo';
import GameBoard from './GameBoard';
function Game(){
    const [isNewGame, setNewGame] = useState(true);
    const [boardSize, setBoardSize] = useState(4);
    const [score, setScore] = useState(0);
    const [gridNumbers, setGridNumbers] = useState([]);
    const [position, setPosition] = useState([0, 0]); // used to test the animation, could be deleted
    
    
    const addOneNumber = (numbers)=>{
        let newNumbers = cloneDeep(numbers);
        let size = newNumbers.length;
        while(true){
            let row =  Math.floor(Math.random() * Math.floor(size));
            let col =  Math.floor(Math.random() * Math.floor(size));
            if(newNumbers[row][col]===0){
                // if number is 0, set it to be 2 or 4
                newNumbers[row][col] = Math.random()<0.7 ? 2 : 4;
                break;
            }
        }
        return newNumbers;
    }
    
    const initialNumbers = (size, setGridNumbers)=>{
        let numbers = []; // n*n array
        if(size === 3 || size=== 4 || size === 5){
            for(let i=0;i<size;i++){
                let row = new Array(size).fill(0);
                numbers.push(row);
            }
            // randomly set 1 number to be '2'
            numbers = addOneNumber(numbers);
            numbers = addOneNumber(numbers);
            setGridNumbers(numbers);
        }
        else{
            console.warn("size should be 3 or 4 or 5, instead of", size);
        }
        console.table(numbers);
    }


    const randomPos = () => {
      let row = Math.floor(Math.random() * boardSize);
      let col = Math.floor(Math.random() * boardSize);
      console.log([row, col]);
      setPosition([row, col]);
    };

    useEffect(() => {
        // run only once
        if(isNewGame){
            initialNumbers(boardSize,setGridNumbers);
            setNewGame(false);
        }
        // console.table(gridNumbers);
        // console.log(isNewGame);
      },[]);

    return (
      <div id="myGame">
        <div id="gameTitle">2048 Online Game</div>
        <GameInfo
          score={score}
          boardSize={boardSize}
          setNewGame={setNewGame}
          setBoardSize={setBoardSize}
        ></GameInfo>
        <GameBoard
          isNewGame={isNewGame}
          boardSize={boardSize}
          gridNumbers={gridNumbers}
          setScore={setScore}
          position={position}
        ></GameBoard>
        <button onClick={randomPos}>Move Randomly</button>
      </div>
    );
}

export default Game;