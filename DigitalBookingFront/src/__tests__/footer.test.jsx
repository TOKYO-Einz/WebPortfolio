import { describe, test, expect} from 'vitest';
import React from "react";
import { render } from "@testing-library/react";
import Footer from "../components/Footer/Footer";

describe("<Footer />", () => {
    test("contenido renderizado", () => {
      const { getByText } = render(<Footer />);
      expect(getByText("©2023 - Todos los derechos reservados")).to.exist; 
    });
});