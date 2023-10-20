import "./AdminProductsSearcher.css";
import { useEffect, useState } from "react";
import { ProductsContext } from "../../utils/Context";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditProductForm from "../EditProductForm/EditProductForm";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";

const AdminProductsSearcher = () => {
	const { products, setProducts, deleteProduct } = useContext(ProductsContext);
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [hoveredRow, setHoveredRow] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [onEdit, setOnEdit] = useState(false);

	const navigate = useNavigate();

	const handleRowHover = (index) => {
		setHoveredRow(index);
	};

	const handleSearch = (event) => {
		setSearchValue(event.target.value);
		const filteredProducts = products?.filter((product) =>
			product.name?.toLowerCase().includes(event.target.value.toLowerCase())
		);
		setSearchResults(filteredProducts);
	};

	const handleRemove = async (productId) => {
		try {
			Swal.fire({
				title: "¿Seguro deseas eliminar el instrumento?",
				showDenyButton: false,
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Eliminar",
				confirmButtonColor: "#f0572d",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const response = await deleteProduct(productId);
					if (response?.status === 204) {
						const updatedProducts = products.filter(
							(product) => product.id !== productId
						);
						setProducts(updatedProducts);
						setSearchResults((prevSearchResults) =>
							prevSearchResults.filter((product) => product.id !== productId)
						);
						Swal.fire({
							text: "Instrumento eliminado con éxito",
							icon: "success",
							confirmButtonColor: "#f0572d",
						});
					} else {
						Swal.fire({
							text: "El instrumento no pudo borrarse",
							icon: "error",
							confirmButtonColor: "#f0572d",
						});
					}
				}
			});
		} catch {
			Swal.fire({
				text: "El instrumento no ha podido ser eliminado",
				icon: "error",
			});
		}
	};

	const handleEdit = (productId) => {
		const selected = products?.find((product) => product.id === productId);
		setSelectedProduct(selected || {});
		setOnEdit(true);
		navigate(`/admin/editar-producto/${productId}`);
	};

	const resetForm = () => {
		setSearchValue("");
		setSearchResults([]);
	};

	useEffect(() => {
		resetForm();
	}, []);

	const sortedProducts = searchResults?.sort((a, b) => a.id - b.id);

	return (
		<div>
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<div className="searcher-container">
				{onEdit === false && (
					<Form
						className={`admin-buscar-button-form" ${
							onEdit === true && "searcher-hidden"
						}`}
					>
						<Form.Group className="admin-buscar-button">
							<Form.Control
								className="admin-input-searcher"
								type="text"
								placeholder="Buscar instrumento por nombre"
								value={searchValue}
								onChange={handleSearch}
							/>
						</Form.Group>
					</Form>
				)}
				{onEdit === false && searchResults?.length > 0 && (
					<div className="table-container">
						<Table
							striped
							bordered
							hover
							responsive
							className={onEdit === true && "table-hidden"}
						>
							<thead>
								<tr>
									<th>Id</th>
									<th>Nombre</th>
									<th>Editar</th>
									<th>Eliminar</th>
								</tr>
							</thead>
							<tbody>
								{sortedProducts?.map((product, index) => (
									<tr
										key={product.id}
										className={index === hoveredRow ? "hovered-row" : ""}
										onMouseEnter={() => handleRowHover(index)}
										onMouseLeave={() => handleRowHover(null)}
									>
										<td>{product.id}</td>
										<td>{product.name}</td>
										<td>
											<Button
												className="button-editar"
												onClick={() => handleEdit(product.id)}
											>
												<FontAwesomeIcon icon={faPenToSquare} />
											</Button>
										</td>
										<td>
											<Button
												className="button-eliminar"
												onClick={() => handleRemove(product.id)}
											>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
				{onEdit && <EditProductForm />}
			</div>
		</div>
	);
};

export default AdminProductsSearcher;
