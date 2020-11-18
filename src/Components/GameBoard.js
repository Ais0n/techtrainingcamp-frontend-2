import React from 'react';
import cloneDeep from 'clone-deep';
import Tile from './Tile';
function GameBoard(props){

    const renderEachRow = (size, numbers)=>{
        // different css style for different size
        let copyNumbers = cloneDeep(numbers);
        if(!copyNumbers){
            copyNumbers = new Array(size).fill(0);
        }
        let cellSize = 'gridCell';
        switch (size) {
            case 3:
                cellSize += '-3X3';
                break;
            case 4:
                cellSize += '-4X4';
                break;
            case 5:
                cellSize += '-5X5';
                break;
            default:
                break;
        }
        console.log(copyNumbers);
        return copyNumbers.map((number, index)=>
            <div className={`gridCell ${cellSize}`} key={index}>{number}</div>
        )
    }

    const renderBoard = (size,gridNumbers)=>{
        const numbers = new Array(size).fill(0);
        return numbers.map((_, index)=>
            <div className='gridRow' key={index}>
                {renderEachRow(size, gridNumbers[index])}
            </div>
        )
    }
    return (
        <div id="gameBoard">
            {renderBoard(props.boardSize, props.gridNumbers)}
            <Tile></Tile>
        </div>
    )

}


export default GameBoard;