import React from 'react';
import { useSpring, animated } from "react-spring";
import PropTypes from 'prop-types';

/**
 * Tile组件：用于实现2048游戏主体的动画部分
 * 
 */
function Tile(props){

    /** Map 用于存放不同大小的Tile具有的像素尺寸
     * key为尺寸
     * value为Tile的像素大小 */ 
    const pixleOfSize = new Map();
    pixleOfSize.set(3, 133);
    pixleOfSize.set(4, 100);
    pixleOfSize.set(5, 80);

    /**
     * 根据size添加对应的css class
     * @param {emu} size 
     */
    const setSizeClass = (size)=>{
        let tileSize = 'tile';
        switch (size) {
            case 3:
                tileSize += '-3X3';
                break;
            case 4:
                tileSize += '-4X4';
                break;
            case 5:
                tileSize += '-5X5';
                break;
            default:
                break;
        }
        return tileSize;
    }

    /**
     * Map 用于存放不同值的Tile得颜色
     */
    const colorOfValue = new Map();
    colorOfValue.set(2,"#eee4da");
    colorOfValue.set(4,"#ede1c9");
    colorOfValue.set(8,"#f3b27a");
    colorOfValue.set(16,"#f69664");

    /**
     * 根据Tile得值返回对应颜色
     * @param {number} value 
     */
    const setColor = (value)=>{
      let color = colorOfValue.get(value)
      console.log(color);
      if(color===undefined)
        color = "red";     // waiting for change
      return color;
    }

    /**
     *  设置动画参数
     */
    const translate = useSpring({
        from: {
          //transform: "translateX(0px)",
          // position: "absolute",
           //left: "0px",
           //top: "0px"
        },
        to: {
          //transform: "translateX(-100px)",
          position: "absolute",
          left: `${props.position[0] * pixleOfSize.get(props.size)}px`,
          top: `${props.position[1] * pixleOfSize.get(props.size)}px`,
          backgroundColor: setColor(props.value)
        },
        config: {
          duration: 300
        }
      });
    

    return (
      <animated.div
        style={translate}
        className={`tile ${setSizeClass(props.size)}`}
    >{props.value}</animated.div>
    );
}

Tile.propTypes = {
  /** Tile的大小 */
  size: PropTypes.oneOf([3,4,5]),
  /** Tile在棋盘上坐标 e.g [0,0], [2,3] */
  position: PropTypes.array,
  /** Tile上显示的值 e.g 2,4,8,16 etc. */
  value: PropTypes.number,
  /** Tile是否可见 */
  visible: PropTypes.bool
}

export default Tile;