import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { inject } from '@vercel/analytics';
import { Route, Routes } from 'react-router-dom';
import Game from '../Game/Game';
import LoginForm, { LoginFormData } from '../LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { Player } from '../../game';

inject();

const App: React.FC = () => {
    const [firstPlayer, setFirstPlayer] = useState<Player | null>();
    const [secondPlayer, setSecondPlayer] = useState<Player | null>();
    const [boardSize, setBoardSize] = useState<number | null>();
    const navigate = useNavigate();
    const onLogin = useCallback((loginFormData: LoginFormData) => {
        setFirstPlayer(
            new Player(
                loginFormData.firstPlayerName,
                config.firstPlayer.squareValue
            )
        );
        setSecondPlayer(
            new Player(
                loginFormData.secondPlayerName,
                config.secondPlayer.squareValue
            )
        );
        setBoardSize(loginFormData.boardSize);
        navigate('/game');
    }, []);

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

    return (
        <Routes>
            <Route path="/" element={<LoginForm onLogin={onLogin} />} />
            <Route
                path="/game"
                element={
                    <Game
                        boardSize={boardSize!}
                        firstPlayer={firstPlayer!}
                        secondPlayer={secondPlayer!}
                    />
                }
            />
        </Routes>
    );
};

export default App;
