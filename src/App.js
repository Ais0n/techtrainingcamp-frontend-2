import * as React from "react";
import { render } from "react-dom";
import Game from './Components/Game';

var Direction = {
  left: 0,
  up: 1,
  right: 2,
  down: 3
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9)
    };
  }

 

  render() {
    return (
      <div className="App">
        <Game></Game>
        <footer> This is the game for the bootcamp in ByteDance</footer>
      </div>
    );
  }
}

export default App;
