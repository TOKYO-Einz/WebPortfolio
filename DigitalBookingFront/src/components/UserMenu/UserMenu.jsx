import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./UserMenu.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const UserMenu = () => {
	const { dispatch, data } = useContext(AuthContext);

	const login = localStorage.getItem("login");

	const getInitials = () => {
		const firstNameInitial = data.user.name.charAt(0).toUpperCase();
		const lastNameInitial = data.user.lastname.charAt(0).toUpperCase();
		const initials = firstNameInitial + lastNameInitial;
		return initials;
	};

	const onHandleCerrarSesion = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<div className="iniciar-sesion-container">
			<div className="iniciar-sesion-button">
				<Link to="/perfil" className="user-name-initials-link">
					<div className="user-name-initials">{getInitials()}</div>
				</Link>
				<div className="menu-nombre-select">
					<div className="user-name-complete">Hola, {data.user.name}</div>
					<DropdownButton
						className="iniciar-sesion-dropdown"
						title="Menú"
						variant="dark"
						onSelect={(eventKey) => {
							if (eventKey === "cerrar") {
								onHandleCerrarSesion();
							}
						}}
					>
						{login === "USER" && (
							<div>
								<Dropdown.Item eventKey="perfil" href="/perfil">
									Mi perfil
								</Dropdown.Item>
								<Dropdown.Item eventKey="favoritos" href="/favoritos">
									Favoritos
								</Dropdown.Item>
								<Dropdown.Item eventKey="favoritos" href="/mis-reservas">
									Mis reservas
								</Dropdown.Item>
							</div>
						)}

						{login === "ADMIN" && (
							<Dropdown.Item eventKey="manager" href="/admin">
								Panel de Admin
							</Dropdown.Item>
						)}

						<Dropdown.Item eventKey="cerrar" href="/home">
							Cerrar sesión
						</Dropdown.Item>
					</DropdownButton>
				</div>
			</div>
		</div>
	);
};

export default UserMenu;
