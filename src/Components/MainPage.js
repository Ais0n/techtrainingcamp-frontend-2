import GameWithRemote from './GameWithRemote';
import React from "react"
import {Spring} from 'react-spring/renderprops'
import PropTypes from 'prop-types';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import GreetingPage from './GreetingPage/GreetingPage'



class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameStarted: false,
      gameBoardSize: 4,
      opponentBoard: new Array(5).fill([0,0,0,0,0])
    };
    this.onStart = this.onStart.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
  }

  client = new W3CWebSocket("ws://127.0.0.1:8000");
  /**
   *
   * @param {string} nickname
   * 点击开始游戏后，建立链接，发送玩家信息
   */
  onStart(nickname) {
    const userData = {
      type: 'initGame',
      name: nickname,
    };
    this.client.send(JSON.stringify(userData));
    console.log("send nickname ", nickname);
    this.client.onmessage = (evt) => {
      // listen to data sent from the websocket server
      // type:initGame / gaming
      const message = JSON.parse(evt.data);
      if (message.type === "initGame") {
        console.log("opponent name: ", message.name);
        this.setState((prevState) => ({
            isGameStarted: true,
          }));
      } else if (message.type === "gaming") {
        console.log("BoardNumber", message.board);
        this.setState((prevState) => ({
            opponentBoard: message.board,
          }));
      } else {
        console.warn("unknown message: ", message);
      }
      console.log(message);
    };


  }

  onChangeSize(newSize) {
    this.setState((prevState) => ({
      gameBoardSize: newSize,
    }));
    console.log(this.state.gameBoardSize);
  }

  render() {
    const isGameStarted = this.state.isGameStarted;
    let page;
    if (isGameStarted) {
      page = (
        <GameWithRemote
          boardSize={this.state.gameBoardSize}
          client={this.client}
          board={this.state.opponentBoard}
        ></GameWithRemote>
      );
    } else {
      page = (
        <GreetingPage
          onStart={this.onStart}
          onChangeSize={this.onChangeSize}
        ></GreetingPage>
      );
    }

    return (
      <div className="MainPage">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ duration: 800 }}
        >
          {(props) => <div style={props}>{page}</div>}
        </Spring>
      </div>
    );
  }
}

export default MainPage;
