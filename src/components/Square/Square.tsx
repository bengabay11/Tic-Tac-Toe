import React, { useState } from 'react';
import './Square.css';

interface SquareProps {
    value: string;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    const [active, setActive] = useState(true);
    let className = 'square';
    if (value) {
        className += ' ' + value;
    }
    if (active) {
        className += ' active';
    }
    return (
        <button
            className={className}
            onClick={() => {
                setActive(false);
                onClick();
            }}
        >
            {value}
        </button>
    );
};

export default Square;
