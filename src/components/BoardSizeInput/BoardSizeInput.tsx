import React from 'react';
import { Alert, Form, InputGroup } from 'react-bootstrap';
import config from '../../config';

interface PlayerNameInputProps {
    boardSize: number;
    setBoardSize: (boardSize: number) => void;
}

const BoardSizeInput: React.FC<PlayerNameInputProps> = ({
    boardSize,
    setBoardSize,
}) => {
    return (
        <InputGroup className="mb-3">
            <Form.Label>{config.labels.loginForm.boardSize}</Form.Label>
            <Form.Control
                style={{ marginLeft: '10%' }}
                required
                className="input-field"
                type="number"
                value={boardSize}
                onChange={(e) => setBoardSize(parseInt(e.target.value, 10))}
                placeholder="Board Size"
            />
            {boardSize <= 0 && (
                <Alert variant="danger">
                    {config.labels.errors.invalidBoardSize}
                </Alert>
            )}
        </InputGroup>
    );
};

export default BoardSizeInput;
