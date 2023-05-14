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

export const squareOwnershipToPlayer = (
    firstPlayer: Player,
    secondPlayer: Player,
    squareOwnership: SquareOwnership
) => {
    switch (squareOwnership) {
        case SquareOwnership.FirstPlayer: {
            return firstPlayer;
        }
        case SquareOwnership.SecondPlayer: {
            return secondPlayer;
        }
        default: {
            return null;
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

export const isDraw = (board: SquareOwnership[][]) =>
    board.every((row) =>
        row.every((squareOwnership) => squareOwnership != SquareOwnership.Free)
    );

const checkDiagonal = (
    board: SquareOwnership[][],
    lastSquareOwnership: SquareOwnership
) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] != lastSquareOwnership) {
            return false;
        }
    }
    return true;
};

const checkReverseDiagonal = (
    board: SquareOwnership[][],
    lastSquareOwnership: SquareOwnership
) => {
    let j = board.length - 1;
    for (let i = 0; i < board.length; i++, j--) {
        if (board[i][j] != lastSquareOwnership) {
            return false;
        }
    }
    return true;
};

const checkRow = (
    board: SquareOwnership[][],
    lastSquareOwnership: SquareOwnership,
    lastRow: number
) => {
    for (let i = 0; i < board.length; i++) {
        if (board[lastRow][i] != lastSquareOwnership) {
            return false;
        }
    }
    return true;
};

const checkColumn = (
    board: SquareOwnership[][],
    lastSquareOwnership: SquareOwnership,
    lastColumn: number
) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][lastColumn] != lastSquareOwnership) {
            return false;
        }
    }
    return true;
};

export const getWinner = (
    board: SquareOwnership[][],
    row: number,
    column: number
) => {
    const lastSquareOwnership = board[row][column];
    const functionsList = [
        () => checkColumn(board, lastSquareOwnership, column),
        () => checkRow(board, lastSquareOwnership, row),
        () => checkDiagonal(board, lastSquareOwnership),
        () => checkReverseDiagonal(board, lastSquareOwnership),
    ];
    return functionsList.some((func) => func()) ? lastSquareOwnership : null;
};

export const initBoard = (boardSize: number) =>
    new Array(boardSize)
        .fill(null)
        .map(() => new Array(boardSize).fill(SquareOwnership.Free));
