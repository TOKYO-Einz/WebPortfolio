import { describe, test, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ShareButton from '../components/ShareButton/ShareButton';

describe('<ShareButton />', () => {
  test('Renderiza correctamente el botón de compartir', () => {
    render(<ShareButton url="https://digitalbooking.com" defaultMessage="¡Comparte DigitalBooking con tus amigos!" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeTruthy();
  });
});