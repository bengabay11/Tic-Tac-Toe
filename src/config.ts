export default {
    gameTitle: 'Tic-Tac-Toe',
    boardSize: 3,
    firstPlayer: {
        name: 'Player1',
        squareValue: 'X',
    },
    secondPlayer: {
        name: 'Player2',
        squareValue: 'O',
    },
    buttonsContent: {
        restart: 'Restart',
        BackToLogin: 'Back to login',
        startGame: 'Start game',
    },
    pageRoutes: {
        index: '/',
        game: '/game',
    },
    labels: {
        loginForm: {
            player1: 'Player1: ',
            player2: 'Player2: ',
            boardSize: 'Board Size: ',
        },
        game: {
            status: 'Next Player: ',
        },
    },
};
