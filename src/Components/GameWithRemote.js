import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGames from "./multiPlayer/RemotePlayerGames";
import Game from "./Game";

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
        <div style={{gridColumn: "1"}}><RemotePlayerGames boardSize={this.props.boardSize}></RemotePlayerGames></div>
        <div style={{gridColumn: "2", borderLeft:"solid"}}><Game boardSize={this.props.boardSize}></Game></div>
      </div>
    );
  }
}

export default Main;