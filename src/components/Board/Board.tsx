import React, { FC, useCallback } from 'react';
import './Board.css';
import Square from '../Square/Square';
import {
    Player,
    SquareOwnership,
    squareOwnershipToPlayer,
} from '../../services/game';

interface Props {
    board: SquareOwnership[][];
    onSquareClick: (boardRow: number, boardColumn: number) => void;
    firstPlayer: Player;
    secondPlayer: Player;
}

const Board: FC<Props> = ({
    board,
    onSquareClick,
    firstPlayer,
    secondPlayer,
}) => {
    const squareOwnershipToSquareValue = useCallback(
        (squareOwnership: SquareOwnership) => {
            const player = squareOwnershipToPlayer(
                firstPlayer,
                secondPlayer,
                squareOwnership
            );
            return player ? player.squareValue : '';
        },
        []
    );
    return (
        <div className="game-board">
            {board.map((squareOwnershipsRow, rowIndex) => {
                return (
                    <div className="board-row" key={rowIndex}>
                        {squareOwnershipsRow.map(
                            (squareOwnership, columnIndex) => {
                                return (
                                    <Square
                                        content={squareOwnershipToSquareValue(
                                            squareOwnership
                                        )}
                                        onClick={() =>
                                            onSquareClick(rowIndex, columnIndex)
                                        }
                                        key={columnIndex}
                                        squareOwnership={squareOwnership}
                                    />
                                );
                            }
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
