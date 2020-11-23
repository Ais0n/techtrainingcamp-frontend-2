import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'clone-deep';
import '../asset/css/dist/style.css'
import GameInfo from './GameInfo';
import GameBoard from './GameBoard';
function Game() {
  const [isNewGame, setNewGame] = useState(true);
  const [boardSize, setBoardSize] = useState(4);
  const [score, setScore] = useState(0);
  const [gridNumbers, setGridNumbers] = useState([]);
  const [tiles, setTiles] = useState([]); // serve as a array to store info of all the tiles

  //const [position, setPosition] = useState([0, 0]); // just for test
  //const [value, setvalue] = useState(2);; // just for test
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
      let newTiles=[];
      for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
          if(numbers[i][j]!==0){
            const newTile = {
              key: uuidv4(),
              value: numbers[i][j],
              position: [j, i],
              visible: true
            }
            newTiles.push(newTile);
          }
        }
      }
      setTiles(newTiles);
      console.log(newTiles);
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
    let newTiles=[];
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        if(newGrid[i][j]!==0){
          const newTile = {
            key: uuidv4(),
            value: newGrid[i][j],
            position: [j, i],
            visible: true
          }
          newTiles.push(newTile);
        }
      }
    }
    setTiles(newTiles);
    console.log(newTiles);
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
        if (j === boardSize - 1) {
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


  const addTile = (position, value) => {
    // add a tile object
    // key:uuid
    // value:number
    // position:array [0,0]
    // visible: boolean
    const curTiles = cloneDeep(tiles);
    const newTile = {
      key: uuidv4(),
      value: value,
      position: position,
      visible: true,
      new: true
    }
    curTiles.push(newTile)
    setTiles(curTiles);
    console.log(curTiles);
  }
  
  /**
   * 模拟算法返回的数据
   */
  // 初始化旧的Tiles
  const createTiles = ()=>{
    const tiles = [];
    // 假设现在是回合1，玩家操作后，tiles的情况如下
    // 包含3中不同类型的tile
    // 1. 新增加的tile 既有每回合固定新增的一个tile，也包含合并后初始化的一个tile
    // 2. 移动后并没有合并的tile
    // 3. 合并后消失的tile
    //  4 0 0 0
    //  0 0 0 0
    //  0 0 2 0
    //  0 0 2 0
    // 新增加的tile
    tiles.push({
      key : uuidv4(),
      value: 4,
      position: [0,0],
      visible: true,
      isNew:  true
    });
    // 未合并的tile
    tiles.push({
      key : uuidv4(),
      value: 2,
      position: [2,2],
      visible: true,
      isNew:  false
    });
    tiles.push({
      key : uuidv4(),
      value: 2,
      position: [2,3],
      visible: true,
      isNew:  false
    });
    // 合并后消失的tile
    tiles.push({
      key : uuidv4(),
      value: 8,
      position: [1,1],
      visible: false,
      isNew:  false
    });
    setTiles(tiles);
  }
  // 回合2 玩家按下方向键下， 则棋盘数据如下
  // 0 0 0 0
  // 0 0 2 0    // 这一行的2是新增的
  // 0 0 0 0
  // 4 0 4 0
  /**
   *  模拟算法的返回值
   */
  const tilesMovement = new Map();  
  tilesMovement.set("0,0", {newPos: [0,3], visible:true, isNew: false});
  tilesMovement.set("2,2", {newPos: [2,3], visible:false, isNew: false}); 
  tilesMovement.set("2,3", {newPos: [2,3], visible:false, isNew: false});
  const testNewTiles = [{position:[2,3], value:4}, {position:[2,1], value:2}];
  /**
   * 根据算法返回的结果对tiles进行更新
   * {tilesMovement}：Map 棋盘上所有可见tile的新位置
   * {testNewTiles}: array 棋盘上新增的tile
   */
  const updateTiles = (tilesMovement,testNewTiles)=>{
    // 首先删除visible===false的tile
    // 一定要先删除不可见的tile，再更新剩下的tiles
    const allVisibleTiles = tiles.filter(tile=>tile.visible===true);
    // 其次更新tiles的位置，并将isNew设置为false
    console.log("allVisibleTiles",allVisibleTiles);
    const tilesNewPos = allVisibleTiles.map(tile=>{
      let tileMove = tilesMovement.get(tile.position.toString());
      tile.position=tileMove.newPos;
      tile.visible=tileMove.visible;
      tile.isNew = false;
      return tile;
    });
    console.log("tilesNewPos",tilesNewPos);
    // 添加所有新tiles
    for(let i=0;i<testNewTiles.length;i++){
      tilesNewPos.push({
        key : uuidv4(),
        value: testNewTiles[i].value,
        position: testNewTiles[i].position,
        visible: true,
        isNew:  true
      })
    }
    // 更新之后一共会用5个tile，其中3个可以在棋盘上见到，剩下的2个会在下一次更新时删掉
    setTiles(tilesNewPos);
  }

  const testState = ()=>{
    const newTiles = tiles.map((tile)=>{
      return {
        key: tile.key,
        value: tile.value,
        position: [tile.position[0],boardSize-1],
        visible: false
      }
    }) 
    setTiles(newTiles);
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
  }, [gridNumbers, tiles]);

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
        //position={position}
        tiles={tiles}
        //tileValue={value} // TileValue for test
      ></GameBoard>
      {/* <button onClick={(e) => testState()}>Logic test</button> */}
      {/* <button onClick={(e)=> addTile([0,0],256)}>NewTile!</button> */}
      <button onClick={(e)=> createTiles()}>Create some tiles</button>
      <button onClick={(e)=>updateTiles(tilesMovement,testNewTiles)}>Move Down</button>
    </div>
  );
}

export default Game;