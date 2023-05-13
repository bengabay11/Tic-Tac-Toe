import React, { FC } from 'react';
import './Board.css';
import Square from '../Square/Square';
import { Player, SquareOwnership, squareOwnershipToValue } from '../../game';

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
    return (
        <div>
            {board.map((squareOwnershipsRow, rowIndex) => {
                return (
                    <div className="board-row" key={rowIndex}>
                        {squareOwnershipsRow.map(
                            (squareOwnership, columnIndex) => {
                                return (
                                    <Square
                                        value={squareOwnershipToValue(
                                            firstPlayer,
                                            secondPlayer,
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
