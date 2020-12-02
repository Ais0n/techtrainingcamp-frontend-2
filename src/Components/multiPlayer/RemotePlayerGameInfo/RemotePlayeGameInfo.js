import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGameBoard from "../RemotePlayerGameBoard/RemotePlayerGameBoard";

import "./dist/style.css"

/*
props: {
  score: number,
  nickname: string
}

*/
class RemotePlayerGameInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RemotePlayerGameInfo">
        <div className="Nickname">{this.props.nickname}</div>
        <div className="ScoreWrap">
          <div className="ScoreTip">SCORE</div>
          <div className="ScoreValue">{this.props.score}</div>
        </div>
      </div>
    );
  }
}

export default RemotePlayerGameInfo;