import "./Reservar.css";
import { useState, useEffect } from "react";
import { ProductsContext } from "../../utils/Context";
import { AuthContext } from "../../utils/AuthContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import InstrumentDetailHeader from "../../components/InstrumentDetailHeader/InstrumentDetailHeader";
import PersonalDataForm from "../../components/PersonalDataForm/PersonalDataForm";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import logo from "../../assets/logo_header.png";
import Policies from "../../components/Policies/Policies";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import Modal from "react-bootstrap/Modal";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const Reservar = () => {
	const [product, setProduct] = useState(null);
	const { products, postReservation } = useContext(ProductsContext);
	const { isPersonalDataValid } = useContext(AuthContext);
	const params = useParams();
	const idParam = parseInt(params?.id);
	const [isConfettiActive, setIsConfettiActive] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [pickUpTime, setPickUpTime] = useState("");
	const [isValidPickUpTime, setIsValidPickUpTime] = useState(undefined);
	const [isTermsChecked, setIsTermsChecked] = useState("");
	const [isValidTermsChecked, setIsValidTermsChecked] = useState(undefined);
	const [isReservationSent, setIsReservationSent] = useState(false);

	const handleModalOpen = () => {
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	const [selectedDates, setSelectedDates] = useState({
		fechaRetiro: null,
		fechaDevolucion: null,
	});

	const handleDatesSelected = (fechaRetiro, fechaDevolucion) => {
		setSelectedDates({ fechaRetiro, fechaDevolucion });
	};

	const calculateDays = () => {
		if (selectedDates.fechaRetiro && selectedDates.fechaDevolucion) {
			const [retiroDay, retiroMonth, retiroYear] =
				selectedDates.fechaRetiro.split("/");
			const [devolucionDay, devolucionMonth, devolucionYear] =
				selectedDates.fechaDevolucion.split("/");

			const retiro = new Date(retiroYear, retiroMonth - 1, retiroDay);
			const devolucion = new Date(
				devolucionYear,
				devolucionMonth - 1,
				devolucionDay
			);

			const timeDifference = Math.abs(devolucion - retiro);
			const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
			return daysDifference;
		}
		return 0;
	};

	const totalDays = calculateDays();

	const productFiltered = products?.filter((product) => product.id === idParam);
	useEffect(() => {
		if (productFiltered?.length > 0) {
			setProduct(productFiltered[0]);
		}
	}, [productFiltered]);

	const navigate = useNavigate();
	const [finishedReservation, setFinisedReservation] = useState(false);

	const onSelectPickUpTime = (event) => {
		const time = event.target.value;
		setPickUpTime(time);
	};

	const validatePickUpTime = () => {
		pickUpTime >= 11 && pickUpTime <= 19
			? setIsValidPickUpTime(true)
			: setIsValidPickUpTime(false);
	};

	const onCheckedTerms = (event) => {
		const checked = event?.target?.checked;
		checked ? setIsTermsChecked(true) : setIsTermsChecked(false);
	};

	const validateTermsChecked = () => {
		isTermsChecked
			? setIsValidTermsChecked(true)
			: setIsValidTermsChecked(false);
	};

	const nombreProducto = product?.name.split(" ")[0].toLowerCase();

	const onConfirmarReserva = async (event) => {
		event.preventDefault();

		setIsReservationSent(true);
		validatePickUpTime();
		validateTermsChecked();

		const payload = {
			id: 0,
			pickUpTime: pickUpTime,
			comments: "Confirmada",
			startDay: selectedDates.fechaRetiro,
			endDay: selectedDates.fechaDevolucion,
			product: { id: product?.id },
		};

		if (isPersonalDataValid && isValidPickUpTime && isTermsChecked) {
			try {
				const result = await Swal.fire({
					title: `¿Seguro deseas confirmar la reserva de tu ${nombreProducto}?`,
					showDenyButton: false,
					showCancelButton: true,
					cancelButtonText: "Cancelar",
					confirmButtonText: "Confirmar",
					confirmButtonColor: "#f0572d",
					customClass: {
						container: "swal-container",
					},
				});

				if (result.isConfirmed) {
					setIsLoading(true);

					setTimeout(async () => {
						setIsLoading(false);

						try {
							const response = await postReservation(payload);

							if (response?.status === 201) {
								localStorage.removeItem("fechaRetiro");
								localStorage.removeItem("fechaDevolucion");
								setIsConfettiActive(true);

								await Swal.fire({
									title: `Tu reserva ha sido confirmada con éxito`,
									text: "¡Muchas gracias por elegirnos!",
									imageUrl: logo,
									imageWidth: 200,
									imageAlt: "Logotipo",
									confirmButtonText: "OK",
									confirmButtonColor: "#f0572d",
									customClass: {
										container: "swal-container",
									},
								});

								setFinisedReservation(true);
								navigate("/home");
							}
						} catch (error) {
							Swal.fire({
								text: "Error al realizar la reserva",
								icon: "error",
							});
						}
					}, 2000);
				} else {
					throw new Error("Reserva cancelada");
				}
			} catch (error) {
				console.error("reserva no realizada");
			}
		} else {
			Swal.fire({
				text: "Por favor, verifica que todos los campos estén completos",
				confirmButtonColor: "#f0572d",
				icon: "error",
			});
		}
	};

	useEffect(() => {
		finishedReservation === true && navigate("/home");
	}, [finishedReservation]);

	const confettiConfig = {
		angle: 90,
		spread: 360,
		startVelocity: 40,
		elementCount: 70,
		dragFriction: 0.1,
		duration: 3000,
		stagger: 3,
		width: "10px",
		height: "10px",
		colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
	};

	return (
		<div className="reservar-container">
			<InstrumentDetailHeader product={product} />
			<div className="reservar-grid-container">
				<div
					className={`reservar-datos-personales reservar-grid-section ${
						isPersonalDataValid === false && "error-input"
					}`}
				>
					<h4>Completa tus datos</h4>
					<div className="personal-data-form-container">
						<PersonalDataForm
							isOnReservationSubmit={true}
							isReservationSent={isReservationSent}
						/>
					</div>
				</div>
				<div className="reservar-calendario reservar-grid-section">
					<h4>Selecciona la fecha de reserva</h4>
					<div className="calendar-component">
						<CalendarComponent
							onDatesSelected={handleDatesSelected}
							isInputCalendar={false}
							productId={product?.id}
						/>
					</div>
				</div>
				<div
					className={`reservar-horario-retiro reservar-grid-section ${
						isValidPickUpTime === false && "error-input"
					}`}
				>
					<h4>Selecciona el horario de retiro</h4>
					<span>
						{product?.category?.title === "Viento"
							? "🎷"
							: product?.category?.title === "Cuerda"
							? "🎸"
							: product?.category?.title === "Percusión"
							? "🥁"
							: product?.category?.title === "Electrónico"
							? "🎹"
							: "🎶"}{" "}
						Tu instrumento va a estar listo a partir de las 11 am
					</span>
					<Form className={`form-horario-reserva`}>
						<Form.Text>Indica tu horario estimado de retiro</Form.Text>
						<Form.Select
							className="horario-select"
							onChange={onSelectPickUpTime}
							onBlur={validatePickUpTime}
						>
							<option default>Escoge una opción</option>
							<option value="11">11:00 - 12:00 hs</option>
							<option value="12">12:00 - 13:00 hs</option>
							<option value="13">13:00 - 14:00 hs</option>
							<option value="14">14:00 - 15:00 hs</option>
							<option value="15">15:00 - 16:00 hs</option>
							<option value="16">16:00 - 17:00 hs</option>
							<option value="17">17:00 - 18:00 hs</option>
							<option value="18">18:00 - 19:00 hs</option>
							<option value="19">19:00 - 20:00 hs</option>
						</Form.Select>
						{isValidPickUpTime === false && (
							<div className="divError">
								Por favor, selecciona un horario de retiro
							</div>
						)}
					</Form>
				</div>
				<div
					className={`reservar-detalle-reserva reservar-grid-section ${
						isValidTermsChecked === false && "error-input"
					}`}
				>
					<h4>Detalles de la reserva</h4>

					<Card className="card-detalles-reserva">
						<Card.Img
							variant="top"
							src={product?.images[0]?.url}
							className="image-card-detalles-reserva"
						/>
						<Card.Body>
							<Card.Text>{product?.category.title}</Card.Text>
							<Card.Title>{product?.name}</Card.Title>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroup.Item className="reserva.direccion">
								<span className="span-bolded">Dirección: </span>
								{product?.branch?.address}
							</ListGroup.Item>
							<ListGroup.Item className="fecha-retiro">
								<span className="span-bolded">Fecha de retiro:</span>{" "}
								{selectedDates?.fechaRetiro?.toString()}
							</ListGroup.Item>
							<ListGroup.Item className="fecha-devolucion">
								<span className="span-bolded">Fecha de devolución:</span>{" "}
								{selectedDates?.fechaDevolucion?.toString()}
							</ListGroup.Item>
							<ListGroup.Item>
								<span className="span-bolded">Total: </span> {totalDays}{" "}
								{totalDays === 1 ? "día" : "días"}{" "}
							</ListGroup.Item>
						</ListGroup>
					</Card>

					<div className="terminos-y-condiciones">
						<Form.Check
							onChange={onCheckedTerms}
							onBlur={validateTermsChecked}
							label={
								<>
									Acepto{" "}
									<span className="link-terminos" onClick={handleModalOpen}>
										términos y condiciones
									</span>
								</>
							}
						/>
						{isValidTermsChecked === false && (
							<div className="divError">
								Debes aceptar términos y condiciones
							</div>
						)}

						<div className="modal">
							<Modal
								show={showModal}
								onHide={handleCloseModal}
								size="lg"
								aria-labelledby="contained-modal-title-vcenter"
								centered
							>
								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter">
										Términos y condiciones
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<h4>Normas generales</h4>
									<p>
										Todos nuestros instrumentos y accesorios se entregan en
										perfectas condiciones, y deben ser devueltos en los mismos
										términos. En caso de que el instrumento o sus accesorios
										sean devueltos en mal estado, el cliente deberá
										responsabilizarse por los costos asociados a su reparación o
										reemplazo, según corresponda. Los instrumentos pueden ser
										utilizados tanto en espacios privados como públicos, siempre
										y cuando se respeten las anteriores condiciones.
									</p>
									<h4>Precauciones y recaudos</h4>
									<p>
										Antes de retirar el instrumento, recomendamos revisarlo
										detenidamente para comprobar que el mismo se encuentra en
										las excelentes condiciones que nosotros garantizamos. Es
										imprescindible manejar el instrumento con cuidado y evitar
										situaciones de riesgo que puedan provocar daños. En caso de
										instrumentos eléctricos, se recomienda revisar el voltaje
										antes de enchufarlo. Se recomienda siempre mantener el
										instrumento en un entorno seguro cuando no esté siendo
										utilizado, así como protegerlo de condiciones climáticas
										adversas.
									</p>
									<h4>Políticas de cancelación</h4>
									<p>
										Para obtener un reembolso completo, la cancelación de la
										reserva deberá realizarse con una anticipación de al menos 5
										(cinco) días desde que dicha reserva fue confirmada en el
										sitio. En caso de preferirlo, se puede optar por una gift
										card con el saldo a favor de la cancelación, para ser
										utilizado en futuras reservas. En caso de cancelar fuera del
										periodo mencionado, se realizará un cargo por cancelación,
										equivalente al 10% del monto total de la reserva, sin
										excepción.
									</p>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleCloseModal}>
										Cerrar
									</Button>
								</Modal.Footer>
							</Modal>
						</div>

						<div>
							<Button
								className="btn-confirmar-reserva"
								onClick={onConfirmarReserva}
							>
								Confirmar Reserva
							</Button>
						</div>

						<div>{isLoading && <LoadingBar />}</div>
					</div>
					{isConfettiActive && (
						<Confetti
							className="confetti"
							active={isConfettiActive}
							config={confettiConfig}
							width={2500}
							height={2000}
						/>
					)}
				</div>
			</div>
			<Policies />
		</div>
	);
};

export default Reservar;
