import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import config from '../../config';

test('renders learn react link', () => {
    render(<App />);
    const divElement = screen.getByLabelText(config.gameTitle);
    expect(divElement).toBeInTheDocument();
});
