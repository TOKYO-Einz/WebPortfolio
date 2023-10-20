import "./CreateAccount.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Swal from "sweetalert2";
import logo from "../../assets/logo_header.png";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const createAccount = () => {
	const { createUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [esMayorDe18, setEsMayorDe18] = useState();
	const [errorNombre, setErrorNombre] = useState("");
	const [errorApellido, setErrorApellido] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorRepeatedPassword, setErrorRepeatedPassword] = useState("");
	const [errorEsMayorDe18, setErrorEsMayorDe18] = useState("");
	const [onSubmitted, setOnSubmitted] = useState(false);

	const onChangeNombre = (event) => {
		setNombre(event.target.value);
	};
	const onChangeApellido = (event) => {
		setApellido(event.target.value);
	};
	const onChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const onChangePassword = (event) => {
		setPassword(event.target.value);
	};

	const onChangeRepeatedPassword = (event) => {
		setRepeatedPassword(event.target.value);
	};

	const handleCheckboxChange = (event) => {
		setEsMayorDe18(event.target.checked);
	};

	const validarNombre = (nombre) => {
		const re = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
		const nombreValido = re.test(nombre) && nombre?.length > 0;
		nombreValido ? setErrorNombre(false) : setErrorNombre(true);
	};

	const validarApellido = (apellido) => {
		const re = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
		const apellidoValido = re.test(apellido) && apellido?.length > 0;
		apellidoValido ? setErrorApellido(false) : setErrorApellido(true);
	};

	const validarEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const emailValido = re.test(email);
		emailValido ? setErrorEmail(false) : setErrorEmail(true);
	};

	const validarPassword = (password) => {
		const re = /^(?=.*[A-Z])(?=.*\w{8,}).*$/; //al menos una mayúscula y 8 caracteres
		const passwordValida = re.test(password);
		passwordValida ? setErrorPassword(false) : setErrorPassword(true);
	};

	const validarRepeatedPassword = (repeatedPassword) => {
		const repeatedPasswordValida = repeatedPassword === password;
		repeatedPasswordValida
			? setErrorRepeatedPassword(false)
			: setErrorRepeatedPassword(true);
	};

	const validarEsMayorDe18 = (esMayorDe18) => {
		const esMayorDe18Valido = esMayorDe18;
		esMayorDe18Valido ? setErrorEsMayorDe18(false) : setErrorEsMayorDe18(true);
	};

	const setValidations = () => {
		validarNombre(nombre);
		validarApellido(apellido);
		validarEmail(email);
		validarPassword(password);
		validarRepeatedPassword(repeatedPassword);
		validarEsMayorDe18(esMayorDe18);
	};

	const handleNombreBlur = () => {
		validarNombre(nombre);
	};
	const handleApellidoBlur = () => {
		validarApellido(apellido);
	};
	const handleEmailBlur = () => {
		validarEmail(email);
	};
	const handlePasswordBlur = () => {
		validarPassword(password);
	};
	const handleRepeatedPasswordBlur = () => {
		validarRepeatedPassword(repeatedPassword);
	};
	const handleEsMayorDe18Blur = () => {
		validarEsMayorDe18(esMayorDe18);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			errorNombre === false &&
			errorApellido === false &&
			errorEmail === false &&
			errorPassword === false &&
			errorRepeatedPassword === false &&
			errorEsMayorDe18 === false
		) {
			try {
				const payloadUser = {
					name: nombre,
					lastname: apellido,
					password: password,
					email: email,
					age: esMayorDe18,
				};
				const response = await createUser(payloadUser);
				if (response?.status === 201) {
					Swal.fire({
						text: "Te enviamos un correo electrónico para confirmar tu cuenta (revisa también la carpeta de spam)",
						icon: "success",
						showCloseButton: true,
						confirmButtonText: "OK",
						confirmButtonColor: "#f0572d",
						customClass: {
							confirmButton: "custom-confirm-button",
						},
					});

					navigate("/user/login");
				} else {
					throw new Error("Error al realizar el registro");
				}
			} catch (error) {
				Swal.fire({
					text: error.message,
					icon: "error",
				});
			}
		} else {
			setValidations();
		}
	};

	return (
		<div className="crear-cuenta-container">
			<Form className="form-crear-cuenta" onSubmit={handleSubmit}>
				{!(
					errorNombre &&
					errorApellido &&
					errorEmail &&
					(errorPassword || errorRepeatedPassword) &&
					errorEsMayorDe18
				) && <img src={logo} alt="Logo" className="Logo" />}
				<h3>Crear cuenta</h3>
				<Form.Group className="formgroup-create-user">
					<Form.Control
						size=""
						className={`"input-create-user" ${
							errorNombre && "error-input-create-user"
						}`}
						type="text"
						placeholder="Nombre"
						value={nombre}
						onBlur={handleNombreBlur}
						onChange={onChangeNombre}
					/>
					{errorNombre && (
						<Form.Text className="error-text-message">
							Ingresa un nombre válido
						</Form.Text>
					)}
				</Form.Group>
				<Form.Group className="formgroup-create-user">
					<Form.Control
						size=""
						className={`"input-create-user" ${
							errorApellido && "error-input-create-user"
						}`}
						type="text"
						placeholder="Apellido"
						value={apellido}
						onBlur={handleApellidoBlur}
						onChange={onChangeApellido}
					/>
					{errorApellido && (
						<Form.Text className="error-text-message">
							Ingresa un apellido válido
						</Form.Text>
					)}
				</Form.Group>
				<Form.Group className="formgroup-create-user">
					<Form.Control
						size=""
						className={`"input-create-user" ${
							errorEmail && "error-input-create-user"
						}`}
						placeholder="Email"
						value={email}
						onBlur={handleEmailBlur}
						onChange={onChangeEmail}
					/>
					{errorEmail && (
						<Form.Text className="error-text-message">
							Ingresa un email válido (ej: nombre@gmail.com)
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className="formgroup-create-user">
					<Form.Control
						size=""
						className={`"input-create-user" ${
							errorPassword && "error-input-create-user"
						}`}
						type="password"
						placeholder="Contraseña"
						value={password}
						onBlur={handlePasswordBlur}
						onChange={onChangePassword}
					/>
					<Form.Text className="text-info-password">
						Al menos una mayúscula y 8 caracteres
					</Form.Text>
					{errorPassword && (
						<Form.Text className="error-text-message">
							Ingresa una contraseña válida
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className="formgroup-create-user">
					<Form.Control
						size=""
						className={`"input-create-user" ${
							errorRepeatedPassword && "error-input-create-user"
						}`}
						type="password"
						placeholder="Repetir Contraseña"
						value={repeatedPassword}
						onBlur={handleRepeatedPasswordBlur}
						onChange={onChangeRepeatedPassword}
					/>
					{errorRepeatedPassword && (
						<Form.Text className="error-text-message">
							Las contraseñas no coinciden
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className="checkbox-create-user mb-2">
					<Form.Check
						type="checkbox"
						label="Soy mayor de 18 años"
						checked={esMayorDe18}
						onBlur={handleEsMayorDe18Blur}
						onChange={handleCheckboxChange}
					/>
					{errorEsMayorDe18 && (
						<Form.Text className="error-text-message mb-2">
							Debes ser mayor de 18 años para crear una cuenta
						</Form.Text>
					)}
				</Form.Group>

				<Button type="submit" className="button-crear-cuenta">
					Crear cuenta
				</Button>
			</Form>
		</div>
	);
};

export default createAccount;
