import React from 'react';
import './Square.css';

interface SquareProps {
    value: string;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    let className = 'square';
    if (value) {
        className += ' ' + value;
    }
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;
