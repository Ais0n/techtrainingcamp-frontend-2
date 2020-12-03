import React, { Component } from "react";
import formateTime from "./formateTime";

/*
startWith: number // 开始计时的时间 以毫秒记
on: boolean // 是否开始. 初始为 false, 从 true 置为 false 时会将时间重新设置到 startWith; 从 false 置为 true 时会开始倒计时
reset: number // 当 reset 的值发生变化时会重置计时器的状态
*/
class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.startWith,
      finished: false,
    };

    this.timer = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.on === false && this.props.on === true) {
      // 开始计时
      this.startTimer();
    } else if (prevProps.on === true && this.props.on === false) {
      // 重置计时器
      this.clearTimer();
      this.setState({ time: this.props.startWith });
    }

    if (this.state.time === 0 && this.state.finished === false) {
      // 结束计时
      this.clearTimer();
      this.setState({finished: true});
      this.props.onFinish();
    }
    
    if (prevProps.startWith !== this.props.startWith) {
      if (this.state.finished === true) {
        this.setState({finished: false});
      }

      this.setState({ time: this.props.startWith });

      if (this.timer === null) {
        this.startTimer();
      }
    }
  }

  componentDidMount() {
    if (this.props.startWhileMounted) {
      this.startTimer();
    }
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      if (this.state.time > 0) {
        this.setState({ time: --this.state.time })
      };
    }, 10);
  }

  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let time = formateTime(this.state.time);
    // /*这里需要把当前组件的对象传递进去*/
    return (
      <div>
        <h1 className="TimeDisplayer">{time}</h1>
      </div>
    );
  }
}

//导出，在文件外面使用这个类
export default Timer;
