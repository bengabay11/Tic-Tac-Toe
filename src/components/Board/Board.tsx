import React, { FC } from 'react';
import './Board.css';
import Square from '../Square/Square';
import { Player, SquareOwnership, squareOwnershipToPlayer } from '../../game';

interface Props {
    board: SquareOwnership[][];
    onSquareClick: (boardRow: number, boardColumn: number) => void;
    firstPlayer: Player;
    secondPlayer: Player;
}

const Board: FC<Props> = ({
    board,
    onSquareClick: onClick,
    firstPlayer,
    secondPlayer,
}) => {
    const squareOwnershipToSquareValue = (squareOwnership: SquareOwnership) => {
        const player = squareOwnershipToPlayer(
            firstPlayer,
            secondPlayer,
            squareOwnership
        );
        return player ? player.squareValue : '';
    };
    return (
        <div>
            {board.map((squareOwnershipsRow, rowIndex) => {
                return (
                    <div className="board-row" key={rowIndex}>
                        {squareOwnershipsRow.map(
                            (squareOwnership, columnIndex) => {
                                return (
                                    <Square
                                        value={squareOwnershipToSquareValue(
                                            squareOwnership
                                        )}
                                        onClick={() =>
                                            onClick(rowIndex, columnIndex)
                                        }
                                        key={columnIndex}
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
