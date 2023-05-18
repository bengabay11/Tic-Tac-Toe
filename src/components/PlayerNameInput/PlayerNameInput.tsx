import React from 'react';
import { Alert, Form, InputGroup } from 'react-bootstrap';
import config from '../../config';

interface PlayerNameInputProps {
    placeholder: string;
    showAlert: boolean;
    playerName: string;
    setPlayerName: (playerName: string) => void;
    otherPlayerName: string;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({
    placeholder,
    showAlert,
    playerName,
    setPlayerName,
    otherPlayerName,
}) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
                required
                className="input-field"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={placeholder}
                aria-describedby="basic-addon1"
            />
            {showAlert && playerName == otherPlayerName && playerName != '' && (
                <Alert variant="danger">
                    {config.labels.errors.samePlayerNames}
                </Alert>
            )}
        </InputGroup>
    );
};

export default PlayerNameInput;
