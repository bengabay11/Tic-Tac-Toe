import React from 'react';
import './GameStatus.css';
import { Player } from '../../game';

interface GameStatusProps {
    firstPlayer: Player;
    secondPlayer: Player;
    firstPlayerTurn: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({
    firstPlayer,
    secondPlayer,
    firstPlayerTurn,
}) => {
    const statusMessage = `Next player: ${
        firstPlayerTurn ? firstPlayer.name : secondPlayer.name
    }`;
    return <div className="display-6 game-status">{statusMessage}</div>;
};

export default GameStatus;
