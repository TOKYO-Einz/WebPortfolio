import "./BranchManagement.css";
import { useContext, useState } from "react";
import { ProductsContext } from "../../utils/Context";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const BranchManagement = () => {
	const { branches, deleteBranch, setBranches } = useContext(ProductsContext);

	const [hoveredRow, setHoveredRow] = useState(null);

	const navigate = useNavigate();

	const handleRowHover = (index) => {
		setHoveredRow(index);
	};

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	const handleEdit = (id) => {
		navigate(`/admin/editar-sucursal/${id}`);
	};

	const handleRemove = async (branchId) => {
		try {
			Swal.fire({
				title: "¿Seguro deseas eliminar la sucursal?",
				showDenyButton: false,
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Eliminar",
				confirmButtonColor: "#f0572d",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const response = await deleteBranch(branchId);
					if (response?.status === 204) {
						const updatedBranches = branches.filter(
							(branch) => branch.id !== branchId
						);
						setBranches(updatedBranches);
						Swal.fire({
							text: "Sucursal eliminada con éxito",
							icon: "success",
							confirmButtonColor: "#f0572d",
						});
					} else {
						throw new Error("Error al borrar la sucursal");
					}
				}
			});
		} catch {
			Swal.fire({
				text: "La sucursal no ha podido ser eliminada",
				icon: "error",
			});
		}
	};

	const sortedBranches = branches?.sort((a, b) => a.id - b.id);

	return (
		<div className="gestion-sucursales-container">
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<div className="table-container-sup">
				<h3>Gestión de sucursales</h3>
				<div className="table-container">
					<Table
						striped
						bordered
						hover
						responsive
						className="table-gestion-sucursales"
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>Nombre</th>
								<th>Dirección</th>
								<th>Editar</th>
								<th>Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{sortedBranches?.map((branch, index) => (
								<tr
									key={branch.id}
									className={index === hoveredRow ? "hovered-row" : ""}
									onMouseEnter={() => handleRowHover(index)}
									onMouseLeave={() => handleRowHover(null)}
								>
									<td>{branch.id}</td>
									<td>{branch.name}</td>
									<td>{branch.address}</td>

									<td>
										<Button
											className="button-editar"
											onClick={() => handleEdit(branch?.id)}
										>
											<FontAwesomeIcon icon={faPenToSquare} />
										</Button>
									</td>
									<td>
										<Button
											className="button-eliminar"
											onClick={() => handleRemove(branch?.id)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</Button>
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

export default BranchManagement;
