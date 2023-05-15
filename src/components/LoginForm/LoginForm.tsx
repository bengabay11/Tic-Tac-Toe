import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './LoginForm.css';
import GameTitle from '../GameTitle/GameTitle';

export class LoginFormData {
    boardSize: number;
    firstPlayerName: string;
    secondPlayerName: string;

    constructor(
        boardSize: number,
        firstPlayerName: string,
        secondPlayerName: string
    ) {
        this.boardSize = boardSize;
        this.firstPlayerName = firstPlayerName;
        this.secondPlayerName = secondPlayerName;
    }
}

interface LoginFormProps {
    onLogin: (loginFormData: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('');
    const [boardSize, setBoardSize] = useState(0);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const loginFormData = new LoginFormData(
            boardSize,
            firstPlayerName,
            secondPlayerName
        );
        onLogin(loginFormData);
    };

    return (
        <Form onSubmit={onSubmit} className="login-form vertical-center">
            <GameTitle />
            <Form.Group controlId="player1">
                <Form.Label className="player1-label">Player 1:</Form.Label>
                <Form.Control
                    required
                    className="input-field"
                    type="text"
                    value={firstPlayerName}
                    onChange={(e) => setFirstPlayerName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="player2">
                <Form.Label>Player 2:</Form.Label>

                <Form.Control
                    required
                    className="input-field"
                    type="text"
                    value={secondPlayerName}
                    onChange={(e) => setSecondPlayerName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="boardSize">
                <Form.Label>Board Size:</Form.Label>
                <Form.Control
                    required
                    className="input-field"
                    type="number"
                    value={boardSize}
                    onChange={(e) => setBoardSize(parseInt(e.target.value, 10))}
                />
            </Form.Group>

            <Button
                className="start-game-button"
                variant="primary"
                type="submit"
            >
                Start Game
            </Button>
        </Form>
    );
};

export default LoginForm;
