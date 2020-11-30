import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGameBoard from "./RemotePlayerGameBoard";
import RemotePlayerGameInfo from "./RemotePlayeGameInfo";


const remotePlayerGameStyle = {
  width: "260px",
  height: "280px",

  background: "rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",

  textAlign: "-webkit-center",
}

class RemotePlayerGame extends React.Component {
  constructor(props) {
    super(props);
    // this.props.gameBoardSize = 4;
    // this.props.currentGameBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    // this.props.score = 0;

    // this.props.active = false;
    // this.props.nickname = "remote player";
  }

  render() {
    return (
      <div className="RemotePlayerGame" style={remotePlayerGameStyle}>
        <RemotePlayerGameInfo nickname="player" score="123123"></RemotePlayerGameInfo>
        <RemotePlayerGameBoard boardSize={4} tiles={[[0, 2, 4, 8], [16, 32, 64, 128], [256, 512, 1024, 2048], [0, 0, 0, 0]]}></RemotePlayerGameBoard>
      </div>
    );
  }
}

export default RemotePlayerGame;