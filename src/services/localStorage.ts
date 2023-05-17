// useEffect(() => {
//     // Retrieve the stored count value from local storage
//     const rawFirstPlayer = localStorage.getItem('firstPlayer');
//     const rawSecondPlayer = localStorage.getItem('secondPlayer');
//     const rawBoardSize = localStorage.getItem('boardSize');
//     if (rawFirstPlayer != null) {
//         setFirstPlayer(JSON.parse(rawFirstPlayer));
//     }
//     if (rawSecondPlayer != null) {
//         setSecondPlayer(JSON.parse(rawSecondPlayer));
//     }
//     if (rawBoardSize != null) {
//         setBoardSize(JSON.parse(rawBoardSize));
//     }
// }, []);

// useEffect(() => {
//     if (boardSize) {
//         localStorage.setItem('firstPlayer', JSON.stringify(firstPlayer));
//         localStorage.setItem('secondPlayer', JSON.stringify(secondPlayer));
//         localStorage.setItem('boardSize', boardSize.toString());
//     }
//     // Store the count value in local storage whenever it changes
// }, [firstPlayer, secondPlayer, boardSize]);
