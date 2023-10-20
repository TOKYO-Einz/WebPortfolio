import { describe, test, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import Reservar from "../routes/Reservar/Reservar";
import { MemoryRouter } from "react-router-dom";

describe("<Reservar />", () => {
	test("se permite visualizar el campo de código postal", () => {
		const { getByLabelText } = render(
			<MemoryRouter>
				<Reservar />
			</MemoryRouter>
		);
		const pickUpTimeTitle = getByLabelText("Código Postal");
		expect(pickUpTimeTitle).to.exist;
	});

	test("se permite visualizar el campo de DNI", () => {
		const { getByLabelText } = render(
			<MemoryRouter>
				<Reservar />
			</MemoryRouter>
		);
		const pickUpTimeTitle = getByLabelText("DNI");
		expect(pickUpTimeTitle).to.exist;
	});

	test("se permite seleccionar la fecha de reserva", () => {
		const { getAllByText } = render(
			<MemoryRouter>
				<Reservar />
			</MemoryRouter>
		);
		const pickUpDate = getAllByText("Selecciona la fecha de reserva");
		expect(pickUpDate).to.exist;
	});

	test("se permite seleccionar el horario de retiro", () => {
		const { getAllByText } = render(
			<MemoryRouter>
				<Reservar />
			</MemoryRouter>
		);
		const pickUpDate = getAllByText("Selecciona el horario de retiro");
		expect(pickUpDate).to.exist;
	});

	test("se permite consultar los detalles de la reserva", () => {
		const { getAllByText } = render(
			<MemoryRouter>
				<Reservar />
			</MemoryRouter>
		);
		const pickUpDate = getAllByText("Detalles de la reserva");
		expect(pickUpDate).to.exist;
	});

	test("se permite visualizar el botón para confirmar reserva", () => {
		const { getAllByRole } = render(
			<MemoryRouter>
				<Reservar />
			</MemoryRouter>
		);
		const confirmButton = getAllByRole("button", { name: "Confirmar Reserva" });
		expect(confirmButton).to.exist;
	});
});
