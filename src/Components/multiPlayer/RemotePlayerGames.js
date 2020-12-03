import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGameBoard from "./RemotePlayerGameBoard/RemotePlayerGameBoard";
import RemotePlayerGameInfo from "./RemotePlayerGameInfo/RemotePlayeGameInfo";
import RemotePlayerGame from "./RemotePlayerGame/RemotePlayerGame";


const remotePlayerGamesStyle = {
  textAlign: "-webkit-center",

  display: "grid",
  gap: "10px",
}

class RemotePlayerGames extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RemotePlayerGames" style={remotePlayerGamesStyle}>
        <div style={{gridRow: "1", gridColumn: "1"}}><RemotePlayerGame boardSize={this.props.boardSize} board={this.props.board} name={this.props.name} score={this.props.score}></RemotePlayerGame></div>
        {/* <div style={{gridRow: "2", gridColumn: "1"}}><RemotePlayerGame boardSize={this.props.boardSize}></RemotePlayerGame></div>
        <div style={{gridRow: "3", gridColumn: "1"}}><RemotePlayerGame boardSize={this.props.boardSize}></RemotePlayerGame></div> */}
      </div>
    );
  }
}

export default RemotePlayerGames;