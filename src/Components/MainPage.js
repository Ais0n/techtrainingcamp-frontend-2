import Game from './Game';
import React from "react"
import { useSpring, animated } from "react-spring";
import PropTypes from 'prop-types';
import GreetingPage from './GreetingPage/GreetingPage'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameStarted: false,
            gameBoardSize: 4,
        };
        this.onStart = this.onStart.bind(this)
        this.onChangeSize = this.onChangeSize.bind(this)
    }

    onStart() {
        this.setState((prevState) => ({
            isGameStarted: true,
        }))
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
            page = <Game boardSize={this.state.gameBoardSize}></Game>;
        } else {
            page = <GreetingPage onStart={this.onStart} onChangeSize={this.onChangeSize}></GreetingPage>;
        }

        return (
            <div className="MainPage">{page}</div>
        );
    }

}

export default MainPage;
