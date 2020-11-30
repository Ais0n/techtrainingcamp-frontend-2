import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGameBoard from "./RemotePlayerGameBoard";

const styles = {
  remotePlayerGameInfoStyle: {
    display: "grid",
    width: "220px",
    height: "28px",
    paddingTop: "16px",
    // paddingBottom: "16px",
    textAlign: "center",
    verticalAlign: "center",
    alignItems: 'center',

    
  },

  nicknameStyle: {
    color: "#776E65",
    fontSize: "26px",
    lineHeight: "28px",

    paddingLeft: "10px",
    paddingRight: "10px",

    gridColumn: "1",
    textAlign: "left",
    justifySelf: "left",
  },

  scoreWrapStyle: {
    width: "112px",
    height: "20px",

    background: "#BBADA0",
    borderRadius: "3px",

    display: "flex",
    
    gridColumn: "2",
    textAlign: "right",
    justifySelf: "right",

    display: "grid",
  },

  scoreTipStyle: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",

    color: "#FFFFFF",

    paddingLeft: "2px",
    

    gridColumn: "1",
    justifySelf: "left"
  },

  scoreValueStyle: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",

    color: "#FFFFFF",

    paddingRight: "2px",

    gridColumn: "2",
    justifySelf: "right",
  },

  scoreStyle: {

  },
}

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
      <div className="RemotePlayerGameInfo" style={styles.remotePlayerGameInfoStyle}>
        <div className="nickname" style={styles.nicknameStyle}>{this.props.nickname}</div>
        <div className="score" style={styles.scoreWrapStyle}>
          <div className="scoreTip" style={styles.scoreTipStyle}>SCORE</div>
          <div className="scoreValue" style={styles.scoreValueStyle}>{this.props.score}</div>
        </div>
      </div>
    );
  }
}

export default RemotePlayerGameInfo;