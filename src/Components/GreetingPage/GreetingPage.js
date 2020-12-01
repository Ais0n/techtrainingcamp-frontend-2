import React from "react";
import BoardSizeTabGroup from "./BoardSizeTabGroup";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const warp = {
  display: "block",

  // gridTemplateColumns: "repeat(1, 1fr)",
  // gap: "0px",
  // gridAutoRows: "minmax(100px, auto)"

  justifyContent: "center",
  alignItems: "center",

  textAlign: "center",
};

const title = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18em",
  lineHeight: "1.17em",
  display: "block",
  alignItems: "center",
  textAlign: "center",

  marginBlockStart: "0.2em",
  marginBlockEnd: "0.253em",

  color: "#776E64",
};

const nicknameInput = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "2em",
  lineHeight: "1.5em",
  // display: "block",
  // alignItems: "center",
  textAlign: "center",

  width: "15em",

  background: "#C4C4C4",
  borderRadius: "20px",

  marginBlockStart: "0.2em",
  marginBlockEnd: "0.253em",

  borderWidth: "0em",

  color: "#776E64",
};

const startButton = {
  background: "#C4C4C4",
  borderRadius: "20px",

  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "3em",
  lineHeight: "1.5em",
  textAlign: "center",

  height: "2em",
  width: "10em",

  borderWidth: "0em",

  color: "#776E65",

  marginBlockStart: "1em",
};

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: true,
      nickname: "nickname"
    };
  }

  onChange = (value) => {
    console.log(value);
    this.props.onChangeSize(value);
  };

  updateNickname(evt) {
    this.setState({
      nickname: evt.target.value
    });
  }

  render() {
    const { value1, value2, value3, value4 } = this.state;
    const contents = ["3 x 3", "4 x 4", "5 x 5"];
    const options = [
      { value: 3, content: "3 x 3" },
      { value: 4, content: "4 x 4" },
      { value: 5, content: "5 x 5" },
    ];
    return (
      <div className="StartPage" style={warp}>
        <div style={title}>2048</div>
        <BoardSizeTabGroup
          options={options}
          initActiveValue={4}
          onChange={this.onChange}
        ></BoardSizeTabGroup>
        <div>
          <input style={nicknameInput} value={this.state.nickname} onChange={evt => this.updateNickname(evt)} align="center"></input>
        </div>
        <div>
          <button style={startButton} onClick={(e)=>this.props.onStart(this.state.nickname)}>start</button>
        </div>
      </div>
    );
  }
}

export default StartPage;
