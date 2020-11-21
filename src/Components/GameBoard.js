import React from 'react';

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

function getInitGrid(size) {
    var x1 = randomNum(0, size - 1);
    var y1 = randomNum(0, size - 1);
    while (1) {
        var x2 = randomNum(0, size - 1);
        var y2 = randomNum(0, size - 1);
        if (x2 !== x1 || y2 !== y1) break;
    }
    return [x1, y1, x2, y2];
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        var Position = getInitGrid(this.props.boardSize);
        var x1 = Position[0], y1 = Position[1], x2 = Position[2], y2 = Position[3];
        var initGrid = []
        for (let i = 0; i < this.props.boardSize; i++) {
            initGrid[i] = new Array(this.props.boardSize);
            for (let j = 0; j < this.props.boardSize; j++) {
                if ((i == x1 && j == y1) || (i == x2 && j == y2)) initGrid[i][j] = 2;
                else initGrid[i][j] = 0;
            }
        }
        this.state = {
            boardSize: this.props.boardSize,
            board: initGrid
        };
        console.log(this.state.board);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyUp);
    }

    handleKeyUp = (e) => {
        //if the key is not an arrow key, return
        if (e.keyCode < 37 || e.keyCode > 40) return;
        const direction = e.keyCode - 37;
        console.log(direction);
    }

    renderEachRow = (item, size) => {
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
        return item.map((items, column_index) =>
            <div className={`gridCell ${cellSize}`} key={column_index}>{items}</div>
        )
    }

    renderBoard = (size) => {
        return this.state.board.map((item, row_index) =>
            <div className='gridRow' key={row_index}>
                {this.renderEachRow(item, size)}
            </div>
        )
    }

    render() {
        return (
            <div id="gameBoard">
                {this.renderBoard(this.state.boardSize)}
            </div>
        )
    }

}


export default GameBoard;