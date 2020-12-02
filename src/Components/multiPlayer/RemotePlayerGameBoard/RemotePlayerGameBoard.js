import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import './dist/style.css';

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
  }

  renderEachRow(rowIndex) {
    // different css style for different size
    let numbers = new Array(this.props.boardSize).fill(0);
    numbers.forEach((number, index) => {
      numbers[index] = this.props.tiles[rowIndex][index];
    })
    // console.log(numbers);
    
    return numbers.map((number, index) =>
        <div className={`Grid-${this.props.boardSize}x${this.props.boardSize}-${number}`} key={index}>{number != 0 ? number : null}</div>
    )
  }

  renderGridRow() {
    const numbers = new Array(this.props.boardSize).fill(0);

    return numbers.map((_, index)=> 
        <div className='RemotePlayerGameBoardGridRow' key={index}>
            {index < this.props.boardSize ? this.renderEachRow(index) : null}
        </div>
    )
  }
  
  render() {

    return (
      <div className="RemotePlayerGameBoard">
        <div className="GridWarp" style={{padding: "5.5px"}}>
          {this.renderGridRow()}
        </div>
      </div>
    );
  }
}

export default RemotePlayerGameBoard;