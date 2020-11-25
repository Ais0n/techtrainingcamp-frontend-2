import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import BoardSizeTab from "./BoardSizeTab";

const boardSizeTabGroupWarp = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",

  marginBlockEnd: "3em",
};

class BoardSizeTabGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChosenValue: 0,
      boardSizeTabs: null,
      isActivatedMap: null
    };
    this.handleClick = this.handleClick.bind(this);

    this.state.currentChosenValue = this.props.initActiveValue;

    this.state.isActivatedMap = new Map();
    this.props.options.forEach(option => {
        this.state.isActivatedMap.set(option.value, option.value === this.props.initActiveValue);
    });
  }

  handleClick(value, e) {
    this.state.isActivatedMap.set(this.state.currentChosenValue, false);
    this.state.isActivatedMap.set(value, true);
    this.state.currentChosenValue = value;
    console.log(this.state.currentChosenValue);
    console.log(this.state.isActivatedMap);
    console.log(e);
    this.forceUpdate();
    this.props.onChange(this.state.currentChosenValue);
  }

  render() {
    this.state.boardSizeTabs = this.props.options.map((option) => (
      <BoardSizeTab
        value={option.value}
        content={option.content}
        key={option.value}
        handleClick={this.handleClick}
        active={this.state.isActivatedMap.get(option.value)}
      ></BoardSizeTab>
    ));

    return <div style={boardSizeTabGroupWarp}>{this.state.boardSizeTabs}</div>;
  }
}

export default BoardSizeTabGroup;
