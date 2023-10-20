import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./UserLogin.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_header.png";
import { Link } from "react-router-dom";

const UserLogin = () => {
	const { dispatch, logInUser, loginError } = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailValidation, setEmailValidation] = useState("");
	const [passwordValidation, setPasswordValidation] = useState("");

	const onChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const onChangePassword = (event) => {
		setPassword(event.target.value);
	};

	const validateEmail = () => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const validated = re.test(email);
		validated ? setEmailValidation(true) : setEmailValidation(false);
	};

	const validatePassword = () => {
		const re = /^(?=.*[A-Z])(?=.*\w{8,}).*$/;
		const validated = re.test(password);
		validated || password === "admin"
			? setPasswordValidation(true)
			: setPasswordValidation(false);
	};

	const handleEmailBlur = () => {
		validateEmail();
	};

	const handlePasswordBlur = () => {
		validatePassword();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (emailValidation && passwordValidation) {
			try {
				const payloadUser = {
					email: email,
					password: password,
				};
				const response = await logInUser(payloadUser);
				if (response?.status === 200) {
					const token = response.data.jwt;

					dispatch({
						type: "LOGIN",
						payload: {
							user: {
								id: response.data.id,
								name: response.data.name,
								lastname: response.data.lastName,
								email: response.data.email,
								role: response.data.role,
							},
							accessToken: token,
						},
					});
					// }

					navigate("/home");
				} else {
					throw new Error("Error al realizar el login");
				}
			} catch (error) {
				Swal.fire({
					text: "Verificar los datos ingresados",
					icon: "error",
				});
			}
		} else {
			validateEmail();
			validatePassword();
		}
	};

	return (
		<div className="iniciar-sesion-container">
			<Form className="form-iniciar-sesion">
				{loginError && (
					<div className="login-error">
						Para reservar un instrumento, debes iniciar sesión
					</div>
				)}
				<img src={logo} alt="Logo" className="Logo" />
				<h3>Iniciar Sesión</h3>
				<Form.Group className="mb-3">
					<Form.Control
						size="lg"
						type="text"
						placeholder="Email"
						onBlur={handleEmailBlur}
						onChange={onChangeEmail}
						className={emailValidation === false && "error-input-login"}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						size="lg"
						type="password"
						placeholder="Contraseña"
						onBlur={handlePasswordBlur}
						onChange={onChangePassword}
						className={
							emailValidation === true &&
							passwordValidation === false &&
							"error-input-login"
						}
					/>
				</Form.Group>
				{emailValidation === false && (
					<div className="error-div">El email ingresado no es válido</div>
				)}
				{emailValidation === true && passwordValidation === false && (
					<div className="error-div">
						La contraseña ingresada no es correcta
					</div>
				)}
				<Button className="btn-ingresar" type="submit" onClick={handleSubmit}>
					Ingresar
				</Button>
				<div className="div-registrate">
					Si aún no tienes una cuenta, {""}
					<Link to="/user/crear-cuenta">
						<span className="span-registrate-url">regístrate aquí</span>
					</Link>
				</div>
			</Form>
		</div>
	);
};

export default UserLogin;
