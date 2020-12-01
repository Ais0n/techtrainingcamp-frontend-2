import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGameBoard from "../RemotePlayerGameBoard/RemotePlayerGameBoard";
import RemotePlayerGameInfo from "../RemotePlayerGameInfo/RemotePlayeGameInfo";

import "./dist/style.css"

class RemotePlayerGame extends React.Component {
  constructor(props) {
    super(props);
    // this.props.gameBoardSize = 4;
    // this.props.currentGameBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    // this.props.score = 0;

    // this.props.active = false;
    // this.props.nickname = "remote player";

    this.getTiles = this.getTiles.bind(this);

    this.state = {
      tiles: [[0, 2, 4, 8, 0], [16, 32, 64, 128, 0], [256, 512, 1024, 2048, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    }

    this.getTiles();
  }

  getTiles() {
    this.setState({
      tiles: new Array(this.props.boardSize).fill(new Array(this.props.boardSize).fill(0))
    })
  }

  render() {
    return (
      <div className="RemotePlayerGame">
        <RemotePlayerGameInfo nickname="player" score="123123"></RemotePlayerGameInfo>
        <RemotePlayerGameBoard boardSize={this.props.boardSize} tiles={this.state.tiles}></RemotePlayerGameBoard>
      </div>
    );
  }
}

export default RemotePlayerGame;