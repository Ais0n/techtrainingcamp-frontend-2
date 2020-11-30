import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import RemotePlayerGameBoard from "./RemotePlayerGameBoard";


const colorOfValue = new Map();
colorOfValue.set(2,"#eee4da");
colorOfValue.set(4,"#ede1c9");
colorOfValue.set(8,"#f3b27a");
colorOfValue.set(16,"#f69664");
colorOfValue.set(32,"#f77b5f");
colorOfValue.set(64,"#f75f3a");
colorOfValue.set(128,"#edd074");
colorOfValue.set(256,"#ff4e00");


/*
props: {
  value: int,
  height: number,
  width: number,
}
*/
class RemotePlayerTile extends React.Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
  }

  getStyle() {
    let style = {
      height: this.props.number + "px",
      width: this.props.number + "px",
      style: colorOfValue.get(this.props.value),
    }

    return style;
  }

  render() {
    return (
      <div className="RemotePlayerTile" style={this.getStyle()}>
      </div>
    );
  }
}

export default RemotePlayerTile;