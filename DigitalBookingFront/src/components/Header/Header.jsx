import "./Header.css";
import logo from "../../assets/logo_header.png";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import UserMenu from "../UserMenu/UserMenu";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const Header = () => {
	const { dispatch } = useContext(AuthContext);
	const login = localStorage.getItem("login");

	const onHandleCerrarSesion = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<header>
			<div className="logo">
				<Link to="/">
					<img src={logo} alt="Logo" />
					<p>Donde todo suena bien</p>
				</Link>
			</div>

			<div className="buttons">
				{!(login === "USER" || login === "ADMIN") && (
					<div>
						<Link to="/user/crear-cuenta">
							<Button className="button-crear-cuenta">Crear cuenta</Button>
						</Link>
						<Link to="/user/login">
							<Button className="button-iniciar-sesion">Iniciar sesión</Button>
						</Link>
					</div>
				)}

				{(login === "USER" || login === "ADMIN") && <UserMenu />}
			</div>
			<div className="dropdown-mobile">
				<Dropdown>
					<Dropdown.Toggle className="dropdown-mobile-button">
						<FontAwesomeIcon icon={faBars} />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{!(login === "USER" || login === "ADMIN") && (
							<div>
								<Dropdown.Item href="/user/crear-cuenta">
									Crear cuenta
								</Dropdown.Item>
								<Dropdown.Item href="/user/login">Iniciar sesión</Dropdown.Item>
							</div>
						)}

						{login === "USER" && (
							<div>
								<Dropdown.Item href="/favoritos">Favoritos</Dropdown.Item>
								<Dropdown.Item href="/perfil">Mi perfil</Dropdown.Item>
								<Dropdown.Item href="/mis-reservas">Mis reservas</Dropdown.Item>
							</div>
						)}
						{login === "ADMIN" && (
							<div>
								<Dropdown.Item href="/admin">Administrador</Dropdown.Item>
							</div>
						)}
						{(login === "USER" || login === "ADMIN") && (
							<div>
								<Dropdown.Item href="/home" onClick={onHandleCerrarSesion}>
									Cerrar sesión
								</Dropdown.Item>
							</div>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</header>
	);
};

export default Header;
