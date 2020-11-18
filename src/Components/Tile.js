import React from 'react';
import { useSpring, animated } from "react-spring";

function Tile(props){
    // prpos: size:Number position:[0,0]
    const pixleOfSize = new Map();
    pixleOfSize.set(3, 133);
    pixleOfSize.set(4, 100);
    pixleOfSize.set(5, 80);

    // set css accoring to the size
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

    // set position based on props
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
          top: `${props.position[1] * pixleOfSize.get(props.size)}px`
        },
        config: {
          duration: 300
        }
      });
    

    return (
      <animated.div
        style={translate}
        className={`tile ${setSizeClass(props.size)}`}
      ></animated.div>
    );
}

export default Tile;