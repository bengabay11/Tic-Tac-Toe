import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './LoginForm.css';
import config from '../../config';
import PlayerNameInput from '../PlayerNameInput/PlayerNameInput';
import BoardSizeInput from '../BoardSizeInput/BoardSizeInput';

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
    const [boardSize, setBoardSize] = useState(config.defaultBoardSize);

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
            <Container className="board-size-group-container">
                <PlayerNameInput
                    placeholder="Player1"
                    setPlayerName={setFirstPlayerName}
                    playerName={firstPlayerName}
                    otherPlayerName={secondPlayerName}
                    showAlert={false}
                ></PlayerNameInput>
            </Container>

            <Container className="board-size-group-container">
                <PlayerNameInput
                    placeholder="Player2"
                    setPlayerName={setSecondPlayerName}
                    playerName={secondPlayerName}
                    otherPlayerName={firstPlayerName}
                    showAlert={true}
                ></PlayerNameInput>
            </Container>

            <Container className="board-size-group-container">
                <BoardSizeInput
                    boardSize={boardSize}
                    setBoardSize={setBoardSize}
                />
            </Container>

            <Button
                className="start-game-button"
                variant="primary"
                type="submit"
                disabled={
                    !(
                        boardSize > 0 &&
                        firstPlayerName != secondPlayerName &&
                        firstPlayerName != '' &&
                        secondPlayerName != ''
                    )
                }
            >
                {config.buttonsContent.startGame}
            </Button>
        </Form>
    );
};

export default LoginForm;
