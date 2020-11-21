import React, { useState, useEffect } from 'react';
import cloneDeep from 'clone-deep';
import '../asset/css/dist/style.css'
import GameInfo from './GameInfo';
import GameBoard from './GameBoard';
function Game() {
  const [isNewGame, setNewGame] = useState(true);
  const [boardSize, setBoardSize] = useState(4);
  const [score, setScore] = useState(0);
  const [gridNumbers, setGridNumbers] = useState([]);
  const [isLose, setLose] = useState(false);

  const addOneNumber = (numbers) => {
    let newNumbers = cloneDeep(numbers);
    let size = newNumbers.length;
    let flag = false; //whether there is available place to add a number
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (newNumbers[i][j] === 0) flag = true;
      }
    }
    if (!flag) return newNumbers;
    while (true) {
      let row = Math.floor(Math.random() * Math.floor(size));
      let col = Math.floor(Math.random() * Math.floor(size));
      if (newNumbers[row][col] === 0) {
        // if number is 0, set it to be 2 or 4
        newNumbers[row][col] = Math.random() < 0.7 ? 2 : 4;
        break;
      }
    }
    return newNumbers;
  }

  const initialNumbers = (size, setGridNumbers) => {
    let numbers = []; // n*n array
    if (size === 3 || size === 4 || size === 5) {
      for (let i = 0; i < size; i++) {
        let row = new Array(size).fill(0);
        numbers.push(row);
      }
      // randomly set 1 number to be '2'
      numbers = addOneNumber(numbers);
      numbers = addOneNumber(numbers);
      setGridNumbers(numbers);
    }
    else {
      console.warn("size should be 3 or 4 or 5, instead of", size);
    }
    console.table(numbers);
  }

  const handleKeyUp = (e) => {
    console.log(gridNumbers);
    //if the key is not an arrow key, return
    if (e.keyCode < 37 || e.keyCode > 40) return;
    const direction = e.keyCode - 37;
    console.log(direction);
    mergeGrid(direction);
    setLose(checkLose());
  }

  const mergeGrid = (direction) => {
    var newGrid = [], addscore = 0;
    switch (direction) {
      case 0: //left
        [newGrid, addscore] = mergeRow(0); break;
      case 1: //up
        [newGrid, addscore] = mergeColumn(0); break;
      case 2: //right
        [newGrid, addscore] = mergeRow(1); break;
      case 3: //down
        [newGrid, addscore] = mergeColumn(1); break;
      default: break;
    }
    var res = (newGrid === gridNumbers);
    if (!res) newGrid = addOneNumber(newGrid);
    setScore(score + addscore);
    setGridNumbers(newGrid);
  }


  const mergeRow = (isReverse) => {
    let newGrid = cloneDeep(gridNumbers);
    let addscore = 0;
    console.log(newGrid);
    //console.table(gridNumbers);
    for (let i = 0; i < boardSize; i++) {
      //reverse the row
      if (isReverse) newGrid[i] = newGrid[i].reverse();
      //shift the row left
      newGrid[i] = newGrid[i].filter(x => x !== 0);
      for (let j = newGrid[i].length; j < boardSize; j++)newGrid[i][j] = 0;
      //merge the row
      for (let j = 0; j < boardSize - 1; j++) {
        if (newGrid[i][j] === 0) break;
        if (newGrid[i][j] === newGrid[i][j + 1]) {
          newGrid[i][j] += newGrid[i][j + 1];
          addscore += newGrid[i][j];
          for (let k = j + 1; k < boardSize - 1; k++) {
            newGrid[i][k] = newGrid[i][k + 1];
          }
          newGrid[i][boardSize - 1] = 0;
        }
      }
      //reverse the row
      if (isReverse) newGrid[i] = newGrid[i].reverse();
    }
    return [newGrid, addscore];
  }

  const mergeColumn = (isReverse) => {
    let newGrid = cloneDeep(gridNumbers);
    let addscore = 0;
    for (let i = 0; i < boardSize; i++) {
      if (isReverse) {  //Reverse the column
        for (let j = 0; j < boardSize - j - 1; j++) {
          let tmp = newGrid[j][i];
          newGrid[j][i] = newGrid[boardSize - 1 - j][i];
          newGrid[boardSize - 1 - j][i] = tmp;
        }
      }
      //Shift the column up
      for (let [j, k] = [0, 0]; j < boardSize; j++) {
        if (newGrid[j][i] !== 0) {
          newGrid[k++][i] = newGrid[j][i];
        }
        if (j == boardSize - 1) {
          for (let l = k; l < boardSize; l++)newGrid[l][i] = 0;
        }
      }
      //Merge the column
      for (let j = 0; j < boardSize - 1; j++) {
        if (newGrid[j][i] === 0) break;
        if (newGrid[j][i] === newGrid[j + 1][i]) {
          newGrid[j][i] += newGrid[j + 1][i];
          addscore += newGrid[j][i];
          for (let k = j + 1; k < boardSize - 1; k++) {
            newGrid[k][i] = newGrid[k + 1][i];
          }
          newGrid[boardSize - 1][i] = 0;
        }
      }
      if (isReverse) {  //Reverse the column
        for (let j = 0; j < boardSize - j - 1; j++) {
          let tmp = newGrid[j][i];
          newGrid[j][i] = newGrid[boardSize - 1 - j][i];
          newGrid[boardSize - 1 - j][i] = tmp;
        }
      }
    }
    return [newGrid, addscore];
  }

  const checkLose = () => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (gridNumbers[i][j] === 0) return false;
        if (j > 0 && gridNumbers[i][j] === gridNumbers[i][j - 1]) return false;
        if (i > 0 && gridNumbers[i][j] === gridNumbers[i - 1][j]) return false;
      }
    }
    return true;
  }

  useEffect(() => {
    // run only once
    if (isNewGame) {
      initialNumbers(boardSize, setGridNumbers);
      setNewGame(false);
    }
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
    // console.table(gridNumbers);
    // console.log(isNewGame);
  }, [gridNumbers]);

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
      ></GameBoard>
    </div>
  );
}

export default Game;