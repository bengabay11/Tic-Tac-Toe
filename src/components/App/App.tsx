import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Board from '../Board/Board';
import config from '../../config';
import {
    Player,
    SquareOwnership,
    getWinner,
    initBoard,
    isDraw,
    squareOwnershipToPlayer,
} from '../../game';
import GameStatus from '../GameStatus/GameStatus';
import GameOverModal from '../GameOverModal/GameOverModal';
import { inject } from '@vercel/analytics';

inject();

type BoardType = SquareOwnership[][];

const App: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(initBoard(config.boardSize));
    const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [winner, setWinner] = useState<Player | null>(null);
    const firstPlayer = new Player(
        config.firstPlayer.squareValue,
        config.firstPlayer.name
    );
    const secondPlayer = new Player(
        config.secondPlayer.squareValue,
        config.secondPlayer.name
    );

    const handleClick = (row: number, column: number) => {
        const boardCopy = [...board];
        if (boardCopy[row][column] == SquareOwnership.Free) {
            boardCopy[row][column] = firstPlayerTurn
                ? SquareOwnership.FirstPlayer
                : SquareOwnership.SecondPlayer;
            setBoard(boardCopy);
            setFirstPlayerTurn(!firstPlayerTurn);
        }
        const winnerSquareOwnership = getWinner(board, row, column);
        if (winnerSquareOwnership != null) {
            const winner = squareOwnershipToPlayer(
                firstPlayer,
                secondPlayer,
                winnerSquareOwnership
            );
            setWinner(winner);
            setShowGameOverModal(true);
        } else if (isDraw(board)) {
            setShowGameOverModal(true);
        }
    };

    const restartGame = () => {
        setShowGameOverModal(false);
        setBoard(initBoard(config.boardSize));
        setFirstPlayerTurn(true);
    };

    return (
        <div className="game">
            <div className="game-info">
                <div className="display-1">{config.gameTitle}</div>
                <GameStatus
                    firstPlayer={firstPlayer}
                    secondPlayer={secondPlayer}
                    firstPlayerTurn={firstPlayerTurn}
                ></GameStatus>
            </div>
            <GameOverModal
                show={showGameOverModal}
                setShow={setShowGameOverModal}
                onRestart={restartGame}
                winner={winner}
            ></GameOverModal>
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
                {config.restartButtonContent}
            </button>
        </div>
    );
};

export default App;
