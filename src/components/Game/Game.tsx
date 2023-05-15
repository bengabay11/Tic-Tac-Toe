import React, { useCallback, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

type BoardType = SquareOwnership[][];

interface GameProps {
    boardSize: number;
    firstPlayer: Player;
    secondPlayer: Player;
}

const Game: React.FC<GameProps> = ({
    boardSize,
    firstPlayer,
    secondPlayer,
}) => {
    const [board, setBoard] = useState<BoardType>(initBoard(boardSize));
    const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [winner, setWinner] = useState<Player | null>(null);
    const navigate = useNavigate();

    const handleClick = useCallback(
        (row: number, column: number) => {
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
        },
        [firstPlayerTurn]
    );

    const restartGame = useCallback(() => {
        setShowGameOverModal(false);
        setBoard(initBoard(boardSize));
        setFirstPlayerTurn(true);
    }, []);

    const backToLogin = useCallback(() => {
        restartGame();
        navigate('/');
    }, []);

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
                onBackToLogin={backToLogin}
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
            <div className="game-buttons">
                <button
                    className="btn btn-primary restart-button"
                    onClick={restartGame}
                >
                    {config.restartButtonContent}
                </button>
                <button
                    className="btn btn-primary restart-button"
                    onClick={backToLogin}
                >
                    {config.backToLoginButtonContent}
                </button>
            </div>
        </div>
    );
};

export default Game;
