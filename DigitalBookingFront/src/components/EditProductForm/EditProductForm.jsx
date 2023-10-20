import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import "./EditProductForm.css";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";

const EditProductForm = () => {
	const {
		products,
		setProducts,
		categories,
		editProduct,
		features,
		getFeatureIcon,
		getProductsById,
		branches,
		brands,
	} = useContext(ProductsContext);

	const [newProducts, setNewProducts] = useState([]);
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [brand, setBrand] = useState([]);
	const [category, setCategory] = useState([]);
	const [branch, setBranch] = useState([]);
	const [images, setImages] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState([]);
	const [cerrarFormEdit, setCerrarFormEdit] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const idParam = parseInt(params.id);

	const getProduct = async () => {
		try {
			const response = await getProductsById(idParam);

			if (response?.status === 200) {
				const product = response.data;
				setSelectedProduct(product);
			} else {
				throw new Error("Error al buscar el instrumento");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	useEffect(() => {
		if (newProducts.length > 0) {
			setProducts([...products, ...newProducts]);
		}
	}, [newProducts]);

	const onChangeId = (event) => {
		setId(event.target.value);
	};

	useEffect(() => {
		if (selectedProduct) {
			setId(selectedProduct.id);
			setName(selectedProduct.name);
			setDescription(selectedProduct.description);
			setPrice(selectedProduct.price);
			setStock(selectedProduct.stock);
			setBrand(selectedProduct.brand);
			setCategory(selectedProduct.category);
			setBranch(selectedProduct.branch);
			setImages(selectedProduct.images?.map((image) => image.url));
		}
	}, [selectedProduct]);

	useEffect(() => {
		if (newProducts.length > 0) {
			setProducts((prevProducts) => [...prevProducts, ...newProducts]);
		}
	}, [newProducts, setProducts]);

	const onChangeName = (event) => {
		setName(event.target.value);
	};

	const onChangeDescription = (event) => {
		setDescription(event.target.value);
	};

	const onChangePrice = (event) => {
		setPrice(event.target.value);
	};

	const onChangeCategory = (event) => {
		const categoriaTitle = event.target.value;
		const aux = categories.find(
			(category) => category.title === categoriaTitle
		);
		setCategory([aux]);
	};

	console.log(category)

	const onChangeBranch = (event) => {
		const branchName = event.target.value;
		const aux = branches.find((branch) => branch.name === branchName);
		setBranch(aux);
	};

	const onChangeBrand = (event) => {
		const brandName = event.target.value;
		const aux = brands.find((brand) => brand.name === brandName);
		setBrand(aux);
	};

	const onChangeStock = (event) => {
		setStock(event.target.value);
	};

	const handleFeatureChange = (event, featureId) => {
		if (event.target.checked) {
			setSelectedFeatures((prevSelectedFeatures) => [
				...prevSelectedFeatures,
				featureId,
			]);
		} else {
			setSelectedFeatures((prevSelectedFeatures) =>
				prevSelectedFeatures.filter((id) => id !== featureId)
			);
		}
	};

	const [selectedFeatures, setSelectedFeatures] = useState([]);
	useEffect(() => {
		if (selectedProduct) {
			const selectedFeatureIds = selectedProduct?.features?.map(
				(feature) => feature.id
			);
			setSelectedFeatures(selectedFeatureIds);
		}
	}, [selectedProduct]);

	const onSubmitForm = async (event) => {
		event.preventDefault();

		const mappedImages = selectedProduct.images.map((image) => {
			return { id: 0, url: image.url };
		});


		const payload = {
			id: id,
			description: description,
			brand: brand,
			images: mappedImages,
			name: name,
			price: price,
			stock: stock,
			category: category,
			branch: branch,
			features: selectedFeatures?.map((featureId) => ({ id: featureId })),
		};


		try {
			const response = await editProduct(payload);

			if (response?.status === 200) {
				const updatedProduct = response.data;
				setNewProducts((prevProducts) => [
					...prevProducts,
					{ ...updatedProduct },
				]);
				Swal.fire({
					text: "Instrumento editado con éxito!",
					icon: "success",
					showCloseButton: true,
					confirmButtonText: "OK",
					confirmButtonColor: "#f0572d",
					customClass: {
						confirmButton: "custom-confirm-button",
					},
				});
			} else {
				throw new Error("Error al editar el instrumento");
			}
		} catch (error) {
			Swal.fire({
				text: "Error al editar el instrumento - ",
				icon: "error",
			});
		}
	};

	return (
		<div
			className={cerrarFormEdit ? "cerrar-form" : "form-edit-product-container"}
		>
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<Form onSubmit={onSubmitForm} className="form-edit-product">
				<h3 className="mb-5 text-center">Datos del instrumento a editar</h3>

				<div className="edit-product-containers">
					<div className="edit-product-group1">
						<h4>Datos generales</h4>
						<Form.Group className="mb-3 input">
							<Form.Control
								type="text"
								placeholder="Id"
								value={`ID: ${id}`}
								onChange={onChangeId}
								disabled
							/>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="text"
								placeholder="Título"
								value={name}
								onChange={onChangeName}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="text"
								placeholder="Descripción"
								value={description}
								onChange={onChangeDescription}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="number"
								placeholder="Precio"
								value={price}
								onChange={onChangePrice}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="number"
								placeholder="Stock"
								value={stock}
								onChange={onChangeStock}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Select
								onChange={onChangeBrand}
								required
								value={brand?.name}
							>
								<option value="">Selecciona la marca</option>
								{brands?.map((brand) => {
									return (
										<option value={brand?.name} key={brand?.name}>
											{brand?.name}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Select
								onChange={onChangeCategory}
								required
								value={category?.title}
							>
								<option value="">Selecciona la categoría</option>
								{categories.map((category) => {
									return (
										<option value={category?.title} key={category?.title}>
											{category?.title}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Select
								onChange={onChangeBranch}
								required
								value={branch?.name}
								key={branch?.id}
							>
								<option value="">Selecciona la sucursal</option>
								{branches?.map((branch) => {
									return (
										<option value={branch?.name} key={branch?.name}>
											{branch.name}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>
					</div>

					<div className="edit-product-group-3">
						<h4>Características</h4>
						<Form.Group className="mb-3 caracteristicas-edit">
							<Form.Label>Selecciona las que apliquen (al menos 4):</Form.Label>
							<Accordion>
								{features.map((feature) => (
									<Form.Check
										type="checkbox"
										key={feature.id}
										id={`feature-${feature.id}`}
										label={
											<div>
												{getFeatureIcon(feature.icon)} {feature.name}
											</div>
										}
										onChange={(event) => handleFeatureChange(event, feature.id)}
										checked={selectedFeatures?.includes(feature.id)}
									/>
								))}
							</Accordion>
						</Form.Group>
					</div>
				</div>
				<div className="botones-editar">
					<Button type="submit" className="button-agregar">
						Actualizar datos
					</Button>
					<Button className="btn-cerrar" onClick={() => handleCerrarForm()}>
						Cerrar
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default EditProductForm;
