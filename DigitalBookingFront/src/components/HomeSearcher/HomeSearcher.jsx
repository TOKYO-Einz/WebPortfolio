import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./HomeSearcher.css";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import { useState } from "react";

const HomeSearcher = ({
	setIsSearchByInput,
	searchedInstrument,
	setSearchedInstrument,
	setIsSearchByBrand,
}) => {
	const [isErrorOnInputSearch, setIsErrorOnInputSearch] = useState();

	const [selectedDates, setSelectedDates] = useState({
		fechaRetiro: null,
		fechaDevolucion: null,
	});
	const handleDatesSelected = (fechaRetiro, fechaDevolucion) => {
		setSelectedDates({ fechaRetiro, fechaDevolucion });
	};

	const onChangeSearchedInstrument = (event) => {
		setSearchedInstrument(event.target.value);
	};

	const validateonChangeSearchedInstrument = () => {
		if (searchedInstrument?.length > 0) {
			setIsSearchByInput(true);
			setIsSearchByBrand(false);
			setIsErrorOnInputSearch(false);
		} else {
			setIsErrorOnInputSearch(true);
		}
	};

	const onSubmitForm = (event) => {
		event.preventDefault();
		validateonChangeSearchedInstrument();
	};

	return (
		<div className="searcher">
			<Form onSubmit={onSubmitForm}>
				<div className="form">
					<Form.Group className="input-searcher">
						<Form.Control
							type="text"
							placeholder="¿Qué instrumento estás buscando?"
							onChange={onChangeSearchedInstrument}
							className={`input-search-box ${
								isErrorOnInputSearch && "error-input"
							}`}
						/>
						{isErrorOnInputSearch && (
							<Form.Text className="search-text-error">
								Por favor, ingresa algún valor
							</Form.Text>
						)}
					</Form.Group>

					<CalendarComponent
						className="input-date"
						onDatesSelected={handleDatesSelected}
						isInputCalendar={true}
						productId={""}
					/>

					<Button type="submit" className="searcher-button">
						Buscar
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default HomeSearcher;
