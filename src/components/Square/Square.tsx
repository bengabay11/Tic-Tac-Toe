import React from 'react';
import './Square.css';
import { SquareOwnership } from '../../services/game';

interface SquareProps {
    squareOwnership: SquareOwnership;
    content: string;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({
    squareOwnership,
    content,
    onClick,
}) => {
    let className = 'square';
    if (content) {
        className += ' ' + content;
    }
    if (squareOwnership == SquareOwnership.Free) {
        className += ' active';
    }
    return (
        <div className={className} onClick={onClick}>
            {content}
        </div>
    );
};

export default Square;
