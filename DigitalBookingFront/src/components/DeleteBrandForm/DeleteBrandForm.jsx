import "./DeleteBrandForm.css";
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

const DeleteBrandForm = () => {
	const { brands, setBrands, deleteBrand } = useContext(ProductsContext);
	const [hoveredRow, setHoveredRow] = useState(null);
	const navigate = useNavigate();

	const handleRowHover = (index) => {
		setHoveredRow(index);
	};

	const handleRemove = async (brandId) => {
		try {
			Swal.fire({
				title: "¿Seguro deseas eliminar la marca?",
				showDenyButton: false,
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Eliminar",
				confirmButtonColor: "#f0572d",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const response = await deleteBrand(brandId);
					if (response?.status === 204) {
						const updatedBrands = brands.filter(
							(brand) => brand?.id !== brandId
						);
						setBrands(updatedBrands);
						Swal.fire({
							text: "Marca eliminada con éxito",
							icon: "success",
							confirmButtonColor: "#f0572d",
						});
					} else {
						Swal.fire({
							text: "La marca no ha podido ser eliminada, verificar que los productos asociados a la misma se hayan borrado previamente",
							icon: "error",
							confirmButtonColor: "#f0572d",
						});
					}
				}
			});
		} catch {
			Swal.fire({
				text: "La marca no ha podido ser eliminada, verificar que los productos asociados a la misma se hayan borrado previamente",
				icon: "error",
			});
		}
	};

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	const sortedProducts = brands?.sort((a, b) => a.id - b.id);

	return (
		<div className="delete-brands">
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<div className="delete-brands-container">
				<h3>Marcas</h3>
				<div className="brands-table">
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Id</th>
								<th>Nombre</th>
								<th>Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{sortedProducts?.map((brand, index) => (
								<tr
									key={brand.id}
									className={index === hoveredRow ? "hovered-row" : ""}
									onMouseEnter={() => handleRowHover(index)}
									onMouseLeave={() => handleRowHover(null)}
								>
									<td>{brand.id}</td>
									<td>{brand.name}</td>
									<td>
										<Button
											className="button-eliminar"
											onClick={() => handleRemove(brand.id)}
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

export default DeleteBrandForm;
