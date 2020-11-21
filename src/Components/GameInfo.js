import React from 'react';
import PropTypes from 'prop-types';

/**
 * GameInfo组件：用于显示游戏的相关信息
 * 
 */
function GameInfo(props){
    return (
        <div id='gameInfo'>
            <div className="score"> Score:{props.score}</div>
            <div className="level">Level: {props.boardSize-2}</div>
        </div>
    )
}

GameInfo.propTypes = {
    /** 游戏得分 */
    score: PropTypes.number,
    /** 游戏难度等级 */
    level: PropTypes.number
}

export default GameInfo;