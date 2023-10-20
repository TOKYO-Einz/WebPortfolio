import "./RoleManagement.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";

const RoleManagement = ({ setGestionarRoles }) => {
	const { usersList, editUser } = useContext(AuthContext);

	const [updatedUsers, setUpdatedUsers] = useState(usersList);

	const [hoveredRow, setHoveredRow] = useState(null);

	const navigate = useNavigate();

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	const handleRowHover = (index) => {
		setHoveredRow(index);
	};

	const handleEditRole = (userId) => {
		setUpdatedUsers((prevUsers) =>
			prevUsers.map((user) => {
				if (user.id === userId) {
					return {
						...user,
						isEditing: true,
					};
				}
				return user;
			})
		);
	};

	const handleRoleChange = (userId, event) => {
		const newRole = event.target.value;
		setUpdatedUsers((prevUsers) =>
			prevUsers.map((user) => {
				if (user.id === userId) {
					return {
						...user,
						role: newRole,
					};
				}
				return user;
			})
		);
	};

	const handleSaveRole = async (userId) => {
		const updatedUser = updatedUsers.find((user) => user.id === userId);

		const updatedUsersList = await Promise.all(
			usersList.map(async (user) => {
				if (user.id === userId) {
					const payload = {
						id: user.id,
						name: user.name,
						lastname: user.lastname,
						email: user.email,
						password: user.password,
						date: null,
						role: updatedUser.role,
						location: user.location,
					};

					try {
						const response = await editUser(payload);
						if (response?.status === 200) {
							return {
								...user,
								role: updatedUser.role,
								isEditing: false,
							};
						} else {
							throw new Error("Error al editar el usuario");
						}
					} catch (error) {
						console.error(error);
					}
				}
				return user;
			})
		);

		setUpdatedUsers(updatedUsersList);
	};

	const sortedUsers = updatedUsers?.sort((a, b) => a.id - b.id);

	return (
		<div className="gestion-roles-container">
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<div className="table-container-sup">
				<h3>Gestión de roles</h3>
				<div className="table-container">
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>ID</th>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>Email</th>
								<th>Rol</th>
								<th>Editar</th>
							</tr>
						</thead>
						<tbody>
							{sortedUsers?.map((user, index) => (
								<tr
									key={user.id}
									className={index === hoveredRow ? "hovered-row" : ""}
									onMouseEnter={() => handleRowHover(index)}
									onMouseLeave={() => handleRowHover(null)}
								>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.lastname}</td>
									<td>{user.email}</td>
									<td>
										{user.isEditing ? (
											<Form.Select
												value={user.role}
												onChange={(event) => handleRoleChange(user.id, event)}
											>
												<option value="USER">USER</option>
												<option value="ADMIN">ADMIN</option>
											</Form.Select>
										) : (
											user.role
										)}
									</td>
									<td>
										{user.isEditing ? (
											<Button
												variant="secondary"
												onClick={() => handleSaveRole(user.id)}
											>
												Guardar
											</Button>
										) : (
											<Button
												variant="link"
												className="button-editar"
												onClick={() => handleEditRole(user.id)}
											>
												<FontAwesomeIcon icon={faEdit} />
											</Button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
			<div className="btn-cerrar-edit">
				<Button
					className="btn-cerrar mb-5 align-center"
					onClick={handleCerrarForm}
				>
					Cerrar
				</Button>
			</div>
		</div>
	);
};

export default RoleManagement;
