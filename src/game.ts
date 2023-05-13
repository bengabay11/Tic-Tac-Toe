export class Player {
    squareValue: string;
    name: string;

    constructor(squareValue: string, name: string) {
        this.squareValue = squareValue;
        this.name = name;
    }
}

export enum SquareOwnership {
    FirstPlayer,
    SecondPlayer,
    Free,
}

export const squareOwnershipToValue = (
    firstPlayer: Player,
    secondPlayer: Player,
    squareOwnership: SquareOwnership
) => {
    switch (squareOwnership) {
        case SquareOwnership.FirstPlayer: {
            return firstPlayer.squareValue;
        }
        case SquareOwnership.SecondPlayer: {
            return secondPlayer.squareValue;
        }
        default: {
            return '';
        }
    }
};

export const nextPlayerTurnName = (
    firstPlayer: Player,
    secondPlayer: Player,
    firstPlayerTurn: boolean
) => {
    return firstPlayerTurn ? firstPlayer.name : secondPlayer.name;
};

const getWinner = (
    board: SquareOwnership[][],
    rowIndex: number,
    columnIndex: number
): Player | null => {
    const cellOwnership = board[rowIndex][columnIndex];

    return null;
};

export const initBoard = (boardSize: number) =>
    new Array(boardSize)
        .fill(null)
        .map(() => new Array(boardSize).fill(SquareOwnership.Free));
