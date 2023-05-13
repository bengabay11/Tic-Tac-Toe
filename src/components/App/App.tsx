import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Board from '../Board/Board';
import config from '../../config';
import {
    Player,
    SquareOwnership,
    initBoard,
    nextPlayerTurnName,
} from '../../game';

type BoardType = SquareOwnership[][];

const App: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(initBoard(config.boardSize));
    const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
    const firstPlayer = new Player('X', 'Ben');
    const secondPlayer = new Player('O', 'Gabay');

    const handleClick = (boardRow: number, boardColumn: number) => {
        const boardCopy = [...board];
        if (boardCopy[boardRow][boardColumn] == SquareOwnership.Free) {
            boardCopy[boardRow][boardColumn] = firstPlayerTurn
                ? SquareOwnership.FirstPlayer
                : SquareOwnership.SecondPlayer;
            setBoard(boardCopy);
            setFirstPlayerTurn(!firstPlayerTurn);
        }
    };

    const restartGame = () => {
        setBoard(initBoard(config.boardSize));
        setFirstPlayerTurn(true);
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
                if (a == SquareOwnership.FirstPlayer) {
                    return firstPlayer;
                } else if (a == SquareOwnership.SecondPlayer) {
                    return secondPlayer;
                }
            }
        }
        return null;
    };

    const winner = getWinner();
    const status = winner
        ? `Winner: ${winner.name}`
        : `Next player: ${nextPlayerTurnName(
              firstPlayer,
              secondPlayer,
              firstPlayerTurn
          )}`;

    return (
        <div className="game">
            <div className="game-info">
                <div className="display-1">{config.gameTitle}</div>
                <div className="display-6 game-status">{status}</div>
            </div>
            <div className="game-board">
                <Board
                    board={board}
                    onSquareClick={handleClick}
                    firstPlayer={firstPlayer}
                    secondPlayer={secondPlayer}
                />
            </div>
            <button
                className="btn btn-primary restart-button"
                onClick={restartGame}
            >
                Restart
            </button>
        </div>
    );
};

export default App;
