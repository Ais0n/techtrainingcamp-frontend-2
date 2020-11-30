import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";


const styles = {
  boardSizeInPx: 220,
  gridWarpPaddingInPx: 5.5,
  gridMarginInPx: 3.5,
  borderRadiusInPx: 5,


  remotePlayerGameBoardStyle: {
    background: "#BBADA0",
    borderRadius: "5px",

    width: "220px",
    height: "220px",

    textAlign: "center",

    margin: "10px",
  },
  remotePlayerGameBoardGridRowStyle: {
    display: "flex",
  },
  remotePlayerGameBoardGridStyle: {
    margin: "3.5px",

    background: "rgba(255, 255, 255, 0.4)",
    borderRadius: "5px",
  }
}

const colorOfValue = new Map();
colorOfValue.set(2,"#eee4da");
colorOfValue.set(4,"#ede1c9");
colorOfValue.set(8,"#f3b27a");
colorOfValue.set(16,"#f69664");
colorOfValue.set(32,"#f77b5f");
colorOfValue.set(64,"#f75f3a");
colorOfValue.set(128,"#edd074");
colorOfValue.set(256,"#ff4e00");
colorOfValue.set(512,"#ff0000");
colorOfValue.set(1024,"#ff0000");
colorOfValue.set(2048,"#ff0000");

const fontSizeOfValue = new Map();
fontSizeOfValue.set(2,"30px");
fontSizeOfValue.set(4,"30px");
fontSizeOfValue.set(8,"30px");
fontSizeOfValue.set(16,"25px");
fontSizeOfValue.set(32,"25px");
fontSizeOfValue.set(64,"25px");
fontSizeOfValue.set(128,"20px");
fontSizeOfValue.set(256,"20px");
fontSizeOfValue.set(512,"20px");
fontSizeOfValue.set(1024,"15px");
fontSizeOfValue.set(2048,"15px");

/*

props: {
    boardSize: int,
    tiles,
}

*/
class RemotePlayerGameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.renderGridRow = this.renderGridRow.bind(this);
    this.renderEachRow = this.renderEachRow.bind(this);
    this.getGridStyle = this.getGridStyle.bind(this);
  }

  getGridStyle(value) {
    let style = {
      margin: "3.5px",

      width: "51px",
      height: "51px",
  
      background: "rgba(255, 255, 255, 0.4)",
      borderRadius: "5px",

      fontWeight: "bold",

      textAlign: "center",
    }
    
    let boardSize = this.props.boardSize;
    style.width = ((styles.boardSizeInPx - 2 * styles.gridWarpPaddingInPx) / boardSize - styles.gridMarginInPx * 2) + "px";
    // console.log("styles.boardSizeInPx = " + styles.boardSizeInPx);
    // console.log("styles.gridWarpPaddingInPx = " + styles.gridWarpPaddingInPx);
    // console.log("boardSize = " + boardSize);
    // console.log("styles.gridMarginInPx = " + styles.gridWarpPaddigridMarginInPxngInPx);
    // console.log((styles.boardSizeInPx - 2 * styles.gridWarpPaddingInPx) / boardSize);
    // console.log(style.gridMarginInPx * 2);
    // console.log(style.width)

    style.height = style.width;
    style.lineHeight = style.width;

    if (value != 0) {
      style.background = colorOfValue.get(value);
      style.fontSize = fontSizeOfValue.get(value);
    }

    if (value <= 8) {
      style.color = "#776E65";
    } else {
      style.color = "white";
    }

    return style;
  }

  renderEachRow(rowIndex) {
    // different css style for different size
    let numbers = new Array(this.props.boardSize).fill(0);
    numbers.forEach((number, index) => {
      numbers[index] = this.props.tiles[rowIndex][index];
    })
    console.log(numbers);

    let cellSize = 'gridCell';
    switch (this.props.boardSize) {
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
    
    return numbers.map((number, index) =>
        <div className={`gridCell ${cellSize}`} key={index} style={this.getGridStyle(number)}>{number != 0 ? number : null}</div>
    )
  }

  renderGridRow() {
    const numbers = new Array(this.props.boardSize).fill(0);

    return numbers.map((_, index)=> 
        <div className='RemotePlayerGameBoardGridRow' key={index} style={styles.remotePlayerGameBoardGridRowStyle}>
            {index < this.props.boardSize ? this.renderEachRow(index) : null}
        </div>
    )
  }
  
  render() {

    return (
      <div className="RemotePlayerGameBoard" style={styles.remotePlayerGameBoardStyle}>
        <div className="GridWarp" style={{padding: "5.5px"}}>
          {this.renderGridRow()}
        </div>
      </div>
    );
  }
}

export default RemotePlayerGameBoard;