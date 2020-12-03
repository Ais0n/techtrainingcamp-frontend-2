import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGames from "./multiPlayer/RemotePlayerGames";
import Game from "./Game";
import Timer from "./Timer/Timer"

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.getMainStyle = this.getMainStyle.bind(this);
  }

  getMainStyle() {
    let style = {
      margin: "20px",
  
      textAlign: "-webkit-center",
    
      display: "grid",
      // gap: "10px",
      gridTemplateRows: "1fr 6fr",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
    }

    style.height = document.body.clientHeight;
    // style.width = window.innerWidth;

    return style;
  }

  render() {
    return (
      <div className="Main" style={this.getMainStyle()}>
        <div style={{gridRow: "1", gridColumn: "1 / 3", color: "#776E65"}}><Timer startWith={60 * 1000} on={false} onFinish={() => console.log("finish timer")}></Timer></div>
        <div style={{gridColumn: "1"}}><RemotePlayerGames boardSize={this.props.boardSize} board={this.props.board} name={this.props.name} score={this.props.score}></RemotePlayerGames></div>
        <div style={{gridColumn: "2"}}><Game boardSize={this.props.boardSize} client={this.props.client}></Game></div>
      </div>
    );
  }
}

export default Main;