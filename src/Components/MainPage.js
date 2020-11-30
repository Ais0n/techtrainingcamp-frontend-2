import GameWithRemote from './GameWithRemote';
import React from "react"
import {Spring} from 'react-spring/renderprops'
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
            page = <GameWithRemote boardSize={this.state.gameBoardSize}></GameWithRemote>;
        } else {
            page = <GreetingPage onStart={this.onStart} onChangeSize={this.onChangeSize}></GreetingPage>;
        }

        // return (
        //   <Spring   from={{ opacity: 0 }}
        //   to={{ opacity: 1 }} config={{duration:1000}}>
        //     {(props) => (
        //       <div className="MainPage" style={props}>
        //         {page}
        //       </div>
        //     )}
        //   </Spring>
        // );
        return (
          <div className="MainPage">
            <Spring
              from={{ opacity:0}}
              to={{ opacity: 1}}
              config={{ duration: 800 }}
            >
              {(props) => <div style={props}>{page}</div>}
            </Spring>
          </div>
        );
    }

}

export default MainPage;
