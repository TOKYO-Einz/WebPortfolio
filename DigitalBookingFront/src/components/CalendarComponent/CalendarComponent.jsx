import "./CalendarComponent.css";
import "./CalendarInput.css";

import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { useEffect, useState } from "react";
import Gregorian_es_lowercase from "./Gregorian_es";
import { ProductsContext } from "../../utils/Context";
import { useContext } from "react";

const CalendarComponent = ({ onDatesSelected, isInputCalendar, productId }) => {
	const { getReservationByProduct } = useContext(ProductsContext);
	const [mensajeErrorRango, setMensajeErrorRango] = useState(false);
	const [mensajeErrorFecha, setMensajeErrorFecha] = useState(false);

	const [fechaDeRetiro, setFechaDeRetiro] = useState(
		JSON.parse(localStorage.getItem("fechaRetiro")) ||
			new DateObject().subtract(0, "days").format("DD/MM/YYYY")
	);
	const [fechaDeDevolucion, setFechaDeDevolucion] = useState(
		JSON.parse(localStorage.getItem("fechaDevolucion")) ||
			new DateObject().add(1, "days").format("DD/MM/YYYY")
	);

	const initialValue = [fechaDeRetiro, fechaDeDevolucion];

	const [values, setValues] = useState(initialValue);

	useEffect(() => {
		const storedFechaRetiro = JSON.parse(localStorage.getItem("fechaRetiro"));
		const storedFechaDevolucion = JSON.parse(
			localStorage.getItem("fechaDevolucion")
		);

		if (storedFechaRetiro && storedFechaDevolucion) {
			setFechaDeRetiro(storedFechaRetiro);
			setFechaDeDevolucion(storedFechaDevolucion);
			onDatesSelected(storedFechaRetiro, storedFechaDevolucion);
		}
	}, []);

	const handleClick = () => {
		const fechaRetiroNueva = values[0]?.toString();
		const fechaDevolucionNueva = values[1]?.toString();
		if (fechaRetiroNueva && fechaDevolucionNueva) {
			localStorage.setItem("fechaRetiro", JSON.stringify(fechaRetiroNueva));
			localStorage.setItem(
				"fechaDevolucion",
				JSON.stringify(fechaDevolucionNueva)
			);
			setFechaDeRetiro(fechaRetiroNueva);
			setFechaDeDevolucion(fechaDevolucionNueva);
			onDatesSelected(fechaRetiroNueva, fechaDevolucionNueva);
		}
	};

	useEffect(() => {
		handleClick();
	}, [values]);

	const [disabledDates, setDisabledDates] = useState([]);

	const getDisabledDates = async () => {
		if (productId) {
			try {
				const response = await getReservationByProduct(productId);
				const reservationsArray = response.data;
				const disabledDatesArray = reservationsArray.map((reservation) => {
					const startDateSplit = reservation.startDay.split("/");
					const startDateString = `${startDateSplit[2]}/${startDateSplit[1]}/${startDateSplit[0]}`;
					const startDate = new DateObject(startDateString).format();

					const endDateSplit = reservation.endDay.split("/");
					const endDateString = `${endDateSplit[2]}/${endDateSplit[1]}/${endDateSplit[0]}`;
					const endDate = new DateObject(endDateString).format();

					return [startDate, endDate];
				});

				setDisabledDates(disabledDatesArray);
			} catch (error) {
				console.error("No se encontraron reservas calendar");
			}
		}
	};

	const isReserved = (strDate) => {
		return disabledDates?.some(
			([start, end]) => strDate >= start && strDate <= end
		);
	};

	useEffect(() => {
		getDisabledDates();
	}, [productId]);

	const isBeforeToday = ({ date }) => {
		const today = new DateObject().subtract(1, "days").toDate();
		return date.toDate() <= today;
	};

	const mapDays = ({ date }) => {
		const strDate = date.format("YYYY/MM/DD");

		if (isReserved(strDate)) {
			return {
				disabled: true,
				style: { color: "#ccc", textDecoration: "line-through" },
				onClick: () => setMensajeErrorFecha(true),
			};
		}

		if (isBeforeToday({ date })) {
			return {
				disabled: true,
				style: { color: "#ccc" },
				onClick: () => setMensajeErrorFecha(true),
			};
		}
	};

	const mapDaysHome = ({ date }) => {
		const strDate = date.format("YYYY/MM/DD");

		if (isBeforeToday({ date })) {
			return {
				disabled: true,
				style: { color: "#ccc" },
			};
		}
	};

	const handleOnChange = (values) => {
		setMensajeErrorFecha(false);
		const [start, end] = values;
		const startDate = start?.format("YYYY/MM/DD");
		const endDate = end?.format("YYYY/MM/DD");

		const isRangeValid = !disabledDates.some(([reservedStart, reservedEnd]) => {
			return startDate <= reservedStart && endDate >= reservedEnd;
		});

		if (isRangeValid) {
			setValues(values);
			setMensajeErrorRango(false);
		} else {
			setMensajeErrorRango(true);
			setValues(initialValue);
		}
	};

	return (
		<div className="date-picker-div">
			<div className="calendars">
				{!isInputCalendar && (
					<div>
						<div className="calendar-2-months">
							<Calendar
								locale={Gregorian_es_lowercase}
								range
								value={values}
								onChange={handleOnChange}
								onClick={handleClick}
								format="DD/MM/YYYY"
								numberOfMonths={2}
								mapDays={mapDays}
							/>
						</div>

						<div className="calendar-1-month">
							<Calendar
								locale={Gregorian_es_lowercase}
								range
								value={values}
								onChange={handleOnChange}
								onClick={handleClick}
								format="DD/MM/YYYY"
								numberOfMonths={1}
								mapDays={mapDays}
							/>
						</div>
					</div>
				)}

				{isInputCalendar && (
					<div className="date-picker-div div-home">
						<div className="date-picker-icon-2-months">
							<DatePicker
								locale={Gregorian_es_lowercase}
								render={<Icon />}
								inputClass="date-picker-input"
								range
								dateSeparator=" al "
								value={values}
								onChange={handleOnChange}
								onClick={handleClick}
								format="DD/MM/YYYY"
								numberOfMonths={2}
								mapDays={mapDaysHome}
							/>
						</div>
						<div className="calendar-2-months">
							<DatePicker
								locale={Gregorian_es_lowercase}
								inputClass="date-picker-input"
								range
								placeHolder="Desde - Hasta"
								dateSeparator=" al "
								value={values}
								onChange={handleOnChange}
								onClick={handleClick}
								format="DD/MM/YYYY"
								numberOfMonths={2}
								mapDays={mapDaysHome}
							/>
						</div>
						<div className="date-picker-icon-1-month">
							<DatePicker
								locale={Gregorian_es_lowercase}
								render={<Icon />}
								inputClass="date-picker-input"
								range
								dateSeparator=" al "
								value={values}
								onChange={setValues}
								onClick={handleClick}
								format="DD/MM/YYYY"
								numberOfMonths={1}
								mapDays={mapDaysHome}
							/>
						</div>
						<div className="calendar-1-month">
							<DatePicker
								locale={Gregorian_es_lowercase}
								inputClass="date-picker-input"
								range
								dateSeparator=" al "
								value={values}
								onChange={setValues}
								onClick={handleClick}
								format="DD/MM/YYYY"
								numberOfMonths={1}
								mapDays={mapDaysHome}
							/>
						</div>
					</div>
				)}
			</div>
			<div className="mensajes-error">
				{mensajeErrorRango && (
					<div className="error-rango">Rango de fechas no válido</div>
				)}
				{mensajeErrorFecha && (
					<div className="error-rango">Fecha no disponible</div>
				)}
			</div>
		</div>
	);
};

export default CalendarComponent;
