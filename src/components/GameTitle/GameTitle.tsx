import React from 'react';
import './GameTitle.css';
import config from '../../config';

const GameTitle: React.FC = () => {
    return <div className="game-title display-1">{config.gameTitle}</div>;
};

export default GameTitle;
