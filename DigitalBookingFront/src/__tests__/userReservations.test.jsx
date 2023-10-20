import { describe, test, expect} from 'vitest';
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { render } from "@testing-library/react";
import UserReservations from '../components/UserReservations/UserReservations';


describe("<UserReservations />", () => {
  test("Se visualiza el título Mis reservas", () => {
    const { getByText } = render(<MemoryRouter><UserReservations /></MemoryRouter>);
    setTimeout(() => {
      expect(getByText("Mis Reservas")).to.exist;
      done(); 
    }, 2000);
  });
  
  
});

