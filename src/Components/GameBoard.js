import React from 'react';

function GameBoard(props){
    const renderEachRow = (size)=>{
        const numbers = new Array(size).fill(0);
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
        return numbers.map((number, index)=>
            <div className={`gridCell ${cellSize}`} key={index}>{number}</div>
        )
    }

    const renderBoard = (size)=>{
        const numbers = new Array(size).fill(0);
        return numbers.map((_, index)=>
            <div className='gridRow' key={index}>
                {renderEachRow(size)}
            </div>
        )
    }
    return (
        <div id="gameBoard">
            {renderBoard(props.boardSize)}
        </div>
    )

}


export default GameBoard;