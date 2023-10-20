import "./PersonalDataForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../utils/AuthContext";
import { useContext, useState, useEffect } from "react";

const PersonalDataForm = ({ isOnReservationSubmit, isReservationSent }) => {
	const { data, editUser, getUserById, getLocationById, validatePersonalData } =
		useContext(AuthContext);

	const id = data?.user?.id;

	const [usuario, setUsuario] = useState({});

	const [location, setLocation] = useState({});

	const getUser = async () => {
		try {
			const response = await getUserById(id);

			setUsuario(response);
		} catch (error) {
			console.error("no se pudo encontrar al usuario");
		}
	};

	const getLocation = async () => {
		if (usuario?.location?.id) {
			try {
				const response = await getLocationById(usuario?.location?.id);
				setLocation(response);
			} catch (error) {
				console.error("no se pudo encontrar al usuario");
			}
		}
	};

	const [dni, setDni] = useState("");
	const [telefono, setTelefono] = useState("");
	const [provincia, setProvincia] = useState("");
	const [localidad, setLocalidad] = useState("");
	const [direccion, setDireccion] = useState("");
	const [codigoPostal, setCodigoPostal] = useState("");

	const [esDniValido, setEsDniValido] = useState();
	const [esTelefonoValido, setEsTelefonoValido] = useState();
	const [esProvinciaValida, setEsProvinciaValida] = useState();
	const [esLocalidadValida, setEsLocalidadValida] = useState();
	const [esDireccionValida, setEsDireccionValida] = useState();
	const [esCodigoPostalValido, setEsCodigoPostalValido] = useState();

	useEffect(() => {
		getUser();
	}, [location]);

	useEffect(() => {
		getLocation();
	}, [setLocation]);

	useEffect(() => {
		if (usuario) {
			setDni(usuario.document);
			setTelefono(usuario.location?.phoneNumber);
			setProvincia(usuario.location?.province);
			setLocalidad(usuario.location?.city);
			setDireccion(usuario.location?.address);
			setCodigoPostal(usuario.location?.postalCode);
		}
	}, [usuario]);

	const onChangeDni = (event) => {
		setDni(event.target.value);
		validateDni();
	};
	const onChangeTelefono = (event) => {
		setTelefono(event.target.value);
		validateTelefono();
	};
	const onChangeProvincia = (event) => {
		setProvincia(event.target.value);
		validateProvincia();
	};
	const onChangeLocalidad = (event) => {
		setLocalidad(event.target.value);
		validateLocalidad();
	};
	const onChangeDireccion = (event) => {
		setDireccion(event.target.value);
		validateDireccion();
	};
	const onChangeCodigoPostal = (event) => {
		setCodigoPostal(event.target.value);
		validateCodigoPostal();
	};

	const validateDni = () => {
		dni.length > 0 ? setEsDniValido(true) : setEsDniValido(false);
	};

	const validateTelefono = () => {
		telefono?.length > 0
			? setEsTelefonoValido(true)
			: setEsTelefonoValido(false);
	};

	const validateProvincia = () => {
		provincia?.length > 0
			? setEsProvinciaValida(true)
			: setEsProvinciaValida(false);
	};

	const validateLocalidad = () => {
		localidad?.length > 0
			? setEsLocalidadValida(true)
			: setEsLocalidadValida(false);
	};

	const validateDireccion = () => {
		direccion?.length > 0
			? setEsDireccionValida(true)
			: setEsDireccionValida(false);
	};

	const validateCodigoPostal = () => {
		codigoPostal?.length > 0
			? setEsCodigoPostalValido(true)
			: setEsCodigoPostalValido(false);
	};

	useEffect(() => {
		validateDni();
		validateTelefono();
		validateProvincia();
		validateLocalidad();
		validateDireccion();
		validateCodigoPostal();
	}, []);

	const validation =
		dni?.length > 0 &&
		telefono?.length > 0 &&
		provincia?.length > 0 &&
		localidad?.length > 0 &&
		direccion?.length > 0 &&
		codigoPostal?.length > 0;

	const validateData = async () => {
		try {
			await validatePersonalData(validation);
		} catch {
			(error) => console.error(error);
		}
	};

	validateData();

	const onSubmitForm = async (event) => {
		event?.preventDefault();

		const payloadUserData = {
			id: usuario?.id,
			name: usuario?.name,
			lastname: usuario?.lastname,
			email: usuario?.email,
			password: usuario?.password,
			document: dni,
			role: usuario?.role,
			location: {
				id: usuario?.location?.id,
				city: localidad,
				postalCode: codigoPostal,
				phoneNumber: telefono,
				address: direccion,
				province: provincia,
			},
		};

		try {
			const response = await editUser(payloadUserData);
			if (response?.status === 200) {
				const newData = response.data;

				{
					!isReservationSent &&
						Swal.fire({
							text: "Los cambios han sido guardados",
							icon: "success",
							showCloseButton: true,
							confirmButtonText: "OK",
							confirmButtonColor: "#f0572d",
							customClass: {
								confirmButton: "custom-confirm-button",
							},
						});
				}
			} else {
				throw new Error("Error al editar los datos personales");
			}
		} catch (error) {
			Swal.fire({
				text: "Error al editar los datos personales",
				icon: "error",
			});
		}
	};

	useEffect(() => {
		if (isReservationSent) {
			onSubmitForm();
		}
	}, [isReservationSent]);

	return (
		<Form onSubmit={onSubmitForm} className={`personal-information-form `}>
			<h4 className="personal-information-title">Información personal</h4>
			<div className="form-grid">
				<Form.Group className="mb-3" controlId="nombre">
					<Form.Label>Nombre</Form.Label>
					<Form.Control
						value={usuario?.name || ""}
						disabled
						type="text"
						placeholder="Nombre"
						className="input-box"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="apellido">
					<Form.Label>Apellido</Form.Label>
					<Form.Control
						value={usuario?.lastname || ""}
						disabled
						type="text"
						placeholder="Apellido"
						className="input-box"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						value={usuario?.email || ""}
						disabled
						type="email"
						placeholder="Email"
						className="input-box"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="fecha-nacimiento">
					<Form.Label>DNI</Form.Label>
					<Form.Control
						value={dni || ""}
						type="text"
						placeholder="Ej: 30123456"
						className={`input-box ${
							isOnReservationSubmit && dni?.length <= 0 && "error-input"
						}`}
						onChange={onChangeDni}
					/>
					{isOnReservationSubmit && dni?.length <= 0 && (
						<div className="error-div">Este campo es obligatorio</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3" controlId="telefono">
					<Form.Label>Teléfono</Form.Label>
					<Form.Control
						value={telefono || ""}
						type="number"
						placeholder="Ej: 1156789012"
						className={`input-box ${
							isOnReservationSubmit && telefono?.length <= 0 && "error-input"
						}`}
						onChange={onChangeTelefono}
					/>
					{isOnReservationSubmit && telefono?.length <= 0 && (
						<div className="error-div">Este campo es obligatorio</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3" controlId="provincia">
					<Form.Label>Provincia</Form.Label>
					<Form.Control
						type="text"
						value={provincia || ""}
						placeholder="Provincia"
						className={`input-box ${
							isOnReservationSubmit && provincia?.length <= 0 && "error-input"
						}`}
						onChange={onChangeProvincia}
					/>
					{isOnReservationSubmit && provincia?.length <= 0 && (
						<div className="error-div">Este campo es obligatorio</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3" controlId="localidad">
					<Form.Label>Localidad</Form.Label>
					<Form.Control
						type="text"
						value={localidad || ""}
						placeholder="Localidad"
						className={`input-box ${
							isOnReservationSubmit && localidad?.length <= 0 && "error-input"
						}`}
						onChange={onChangeLocalidad}
					/>
					{isOnReservationSubmit && localidad?.length <= 0 && (
						<div className="error-div">Este campo es obligatorio</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3" controlId="direccion">
					<Form.Label>Dirección</Form.Label>
					<Form.Control
						type="text"
						value={direccion || ""}
						placeholder="Dirección "
						className={`input-box ${
							isOnReservationSubmit && direccion?.length <= 0 && "error-input"
						}`}
						onChange={onChangeDireccion}
					/>
					{isOnReservationSubmit && direccion?.length <= 0 && (
						<div className="error-div">Este campo es obligatorio</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3 codigo-postal-input" controlId="codigoPostal">
					<Form.Label>Código Postal</Form.Label>
					<Form.Control
						type="number"
						value={codigoPostal || ""}
						placeholder="Código Postal"
						className={`input-box ${
							isOnReservationSubmit &&
							codigoPostal?.length <= 0 &&
							"error-input"
						}`}
						onChange={onChangeCodigoPostal}
					/>
					{isOnReservationSubmit && codigoPostal?.length <= 0 && (
						<div className="error-div">Este campo es obligatorio</div>
					)}
				</Form.Group>
			</div>

			<Button type="submit" className="btn-guardar-cambios">
				Guardar cambios
			</Button>
		</Form>
	);
};

export default PersonalDataForm;
