import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import config from '../../config';
import { Player } from '../../game';

interface GameOverModalProps {
    show: boolean;
    setShow: (newShow: boolean) => void;
    onRestart: () => void;
    winner: Player | null;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
    show,
    setShow,
    onRestart,
    winner,
}) => {
    const handleClose = useCallback(() => setShow(false), []);
    const bodyContent = winner ? `${winner.name} won the game!` : 'Draw!';

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Game Over</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyContent}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onRestart}>
                    {config.restartButtonContent}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GameOverModal;
