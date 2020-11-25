import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

const boardSizeTabWarp = {
  height: "4.05em",
  width: "8em",
};

const activeBoardSizeTabBackground = "#f3b27a";

class BoardSizeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isGameStarted: true, hover: false, active: false };
    this.toggleHover = this.toggleHover.bind(this);
    // this.handleClick = this.handleClick.bind(this);

    this.state.active = this.props.active;
  }

  toggleHover() {
    this.setState((prevState) => ({
      hover: !prevState.hover,
    }));
  }

//   handleClick() {
//     this.setState((prevState) => ({
//       active: !prevState.active,
//     }));
//   }

  render() {
    let boardSizeTab = {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "2.25em",
      lineHeight: "1.8em",
      display: "block",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "center",

      color: "#776E65",
      background: "#c4c4c4",
      borderRadius: "0.5em",

      mixBlendMode: "normal",
    };

    if (this.props.active) {
      boardSizeTab.background = activeBoardSizeTabBackground;
    } else if (this.state.hover) {
      boardSizeTab.background = "#b4b4b4";
    }

    return (
      <div className="BoardSizeTab" style={boardSizeTabWarp}>
        <div
          style={boardSizeTab}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          onClick={(e) => {this.props.handleClick(this.props.value, e)}}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default BoardSizeTab;
