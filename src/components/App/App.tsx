import React, { useCallback, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { inject } from '@vercel/analytics';
import { Route, Routes } from 'react-router-dom';
import Game from '../Game/Game';
import LoginForm, { LoginFormData } from '../LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { Player } from '../../services/game';

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
        navigate(config.pageRoutes.game);
    }, []);

    const routes = [
        <Route
            key={config.pageRoutes.index}
            path={config.pageRoutes.index}
            element={<LoginForm onLogin={onLogin} />}
        />,
    ];

    if (boardSize != null && firstPlayer != null && secondPlayer != null) {
        routes.push(
            <Route
                path="/game"
                element={
                    <Game
                        boardSize={boardSize}
                        firstPlayer={firstPlayer}
                        secondPlayer={secondPlayer}
                    />
                }
            />
        );
    }

    return <Routes>{routes}</Routes>;
};

export default App;
