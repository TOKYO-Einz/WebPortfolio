import "./DeleteCategoryForm.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";

const DeleteCategoryForm = () => {
	const { categories, setCategories, deleteCategory } =
		useContext(ProductsContext);
		
	const [hoveredRow, setHoveredRow] = useState(null);
	const navigate = useNavigate();

	const handleRowHover = (index) => {
		setHoveredRow(index);
	};

	const handleRemove = async (categoryId) => {
		try {
			Swal.fire({
				title: "¿Seguro deseas eliminar la categoría?",
				showDenyButton: false,
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Eliminar",
				confirmButtonColor: "#f0572d",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const response = await deleteCategory(categoryId);
					if (response?.status === 204) {
						const updatedCategories = categories.filter(
							(category) => category?.id !== categoryId
						);
						setCategories(updatedCategories);
						Swal.fire({
							text: "Categoría eliminada con éxito",
							icon: "success",
							confirmButtonColor: "#f0572d",
						});
					} else {
						Swal.fire({
							text: "La categoría no ha podido ser eliminada, verificar que los productos asociados a la misma se hayan borrado previamente",
							icon: "error",
							confirmButtonColor: "#f0572d",
						});
					}
				}
			});
		} catch {
			Swal.fire({
				text: "La categoría no ha podido ser eliminada, verificar que los productos asociados a la misma se hayan borrado previamente",
				icon: "error",
			});
		}
	};

	const [cerrarForm, setCerrarForm] = useState(false);
	const handleCerrarForm = () => {
		navigate("/admin");
	};

	return (
		<div className="delete-category-container">
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<div className="delete-category-container">
				<h3>Categorías</h3>
				<div className="delete-table-container">
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Id</th>
								<th>Título</th>
								<th>Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category, index) => (
								<tr
									key={category.id}
									className={index === hoveredRow ? "hovered-row" : ""}
									onMouseEnter={() => handleRowHover(index)}
									onMouseLeave={() => handleRowHover(null)}
								>
									<td>{category.id}</td>
									<td>{category.title}</td>
									<td>
										<Button
											className="button-eliminar"
											onClick={() => handleRemove(category.id)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
				<Button className="btn-cerrar" onClick={handleCerrarForm}>
					Cerrar
				</Button>
			</div>
		</div>
	);
};

export default DeleteCategoryForm;
