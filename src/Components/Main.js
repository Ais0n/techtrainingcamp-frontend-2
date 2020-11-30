import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGames from "./multiPlayer/RemotePlayerGames";
import Game from "./Game";


const MainStyle = {
  margin: "20px",
  
  textAlign: "-webkit-center",

  display: "grid",
  gap: "10px",
  gridTemplateColumns: "1fr 4fr",
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Main" style={MainStyle}>
        <div style={{gridColumn: "1"}}><RemotePlayerGames></RemotePlayerGames></div>
        <div style={{gridColumn: "2"}}><Game></Game></div>
      </div>
    );
  }
}

export default Main;