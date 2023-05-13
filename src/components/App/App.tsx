import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Board from '../Board/Board';

type Player = 'X' | 'O';
type BoardType = Player[];

const App: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
    const [player, setPlayer] = useState<Player>('X');

    const handleClick = (index: number) => {
        const boardCopy = [...board];
        if (boardCopy[index] === null) {
            boardCopy[index] = player;
            setBoard(boardCopy);
            setPlayer(player === 'X' ? 'O' : 'X');
        }
    };

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setPlayer('X');
    };

    const getWinner = (): Player | null => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const winner = getWinner();
    const status = winner ? `Winner: ${winner}` : `Next player: ${player}`;

    return (
        <div className="game">
            <div className="game-info">
                <div className="display-1">{status}</div>
                <button
                    className="btn btn-primary restart-button"
                    onClick={restartGame}
                >
                    Restart
                </button>
            </div>
            <div className="game-board">
                <Board squares={board} onClick={handleClick} />
            </div>
        </div>
    );
};

export default App;
