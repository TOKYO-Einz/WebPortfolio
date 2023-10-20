import { describe, it, test, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import InstrumentDetailCard from '../components/InstrumentDetailCard/InstrumentDetailCard';


//1. prueba de funcionamiento

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe("Product detail test", () => {
  test("should show a button with the name Reservar", () => {
      
      render(<InstrumentDetailCard/>);

      const btnText = screen.findByText("Reservar")

      expect(btnText).toBeDefined();
  })
})