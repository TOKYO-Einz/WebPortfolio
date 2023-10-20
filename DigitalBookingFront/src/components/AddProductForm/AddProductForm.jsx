import "./AddProductForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import Accordion from "react-bootstrap/Accordion";
import UploadImage from "../../utils/UploadImage";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
	const {
		products,
		setProducts,
		categories,
		postProduct,
		features,
		getFeatureIcon,
		branches,
		brands,
	} = useContext(ProductsContext);

	const [titleValidation, setTitleValidation] = useState(undefined);
	const [titleLengthValidation, setTitleLengthValidation] = useState(undefined);
	const [validDescription, setValidDescription] = useState(undefined);
	const [validPrice, setValidPrice] = useState(undefined);
	const [validStock, setValidStock] = useState(undefined);
	const [validBrand, setValidBrand] = useState(undefined);
	const [validCategory, setValidCategory] = useState(undefined);
	const [validBranch, setValidBranch] = useState(undefined);
	const [validFeatures, setValidFeatures] = useState(undefined);
	const [validImages, setValidImages] = useState(undefined);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState([]);
	const [branch, setBranch] = useState([]);
	const [imageAux, setImageAux] = useState(["", false]);
	const [imagesArray, setImagesArray] = useState([]);
	const [visualizarCarga, setVisualizarCarga] = useState(false);
	const [selectedFeatures, setSelectedFeatures] = useState([]);

	const navigate = useNavigate();

	const handleCerrarForm = () => {
		navigate("/admin");
	};

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
		const categoria = event.target.value;
		const aux = categories.filter((category) => category.title === categoria);
		setCategory(aux);
	};

	const onChangeBranch = (event) => {
		const sucursal = event.target.value;
		const aux = branches.filter((branch) => branch.name === sucursal);
		setBranch(aux);
	};

	const onChangeBrand = (event) => {
		const marca = event.target.value;
		const aux = brands.filter((brand) => brand.name === marca);
		setBrand(aux);
	};

	const onChangeImage1 = () => {
		const img = imageAux[0];
		if (imageAux[1] === false) {
			return;
		} else {
			setImagesArray((imagesArray) => [...imagesArray, { id: 0, url: img }]);
		}

		setVisualizarCarga(false);
	};

	const onAniadir = () => {
		setVisualizarCarga(true);
	};

	useEffect(() => {
		onChangeImage1();
	}, [imageAux]);

	const onChangeStock = (event) => {
		setStock(event.target.value);
	};

	const handleFeatureChange = (event, featureId) => {
		if (event.target.checked) {
			setSelectedFeatures([...selectedFeatures, featureId]);
		} else {
			setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
		}
	};

	const validateName = (name) => {
		return !products.some((product) => product.name === name);
	};

	const validateNumberField = (param) => {
		const re = /\d/;
		return re.test(param) && param.length > 0;
	};

	const validateLength = (param) => {
		return param?.toString().length > 0;
	};

	const validateFeatures = (param) => {
		return param?.length >= 4;
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		const validatedName = validateName(name);
		setTitleValidation(validatedName);
		const validatedTitleLength = validateLength(name);
		setTitleLengthValidation(validatedTitleLength);
		const validatedDescription = validateLength(description);
		setValidDescription(validatedDescription);
		const validatedPrice = validateNumberField(price);
		setValidPrice(validatedPrice);
		const validatedStock = validateNumberField(stock);
		setValidStock(validatedStock);
		const validatedBrand = validateLength(brand);
		setValidBrand(validatedBrand);
		const validatedCategory = validateLength(category);
		setValidCategory(validatedCategory);
		const validatedBranch = validateLength(branch);
		setValidBranch(validatedBranch);

		const validatedImages = validateLength(imagesArray);
		setValidImages(validatedImages);

		const validatedFeatures = validateFeatures(selectedFeatures);
		setValidFeatures(validatedFeatures);

		if (
			validatedName &&
			validatedTitleLength &&
			validatedDescription &&
			validatedPrice &&
			validatedStock &&
			validatedBrand &&
			validatedCategory &&
			validatedBranch &&
			validImages &&
			validatedFeatures
		) {
			try {
				const payload = {
					id: 0,
					name: name,
					description: description,
					stock: stock,
					price: price,
					images: imagesArray,
					brand: brand[0],
					category: category[0],
					branch: branch[0],
					features: selectedFeatures.map((id) => ({ id })),
				};

				const response = await postProduct(payload);

				if (response?.status === 201) {
					const newProduct = response;
					setProducts((prevProducts) => [...prevProducts, { ...newProduct }]);
					Swal.fire({
						text: "Instrumento agregado con éxito!",
						icon: "success",
						showCloseButton: true,
						confirmButtonText: "OK",
						confirmButtonColor: "#f0572d",
						customClass: {
							confirmButton: "custom-confirm-button",
						},
					}).then((result) => {
						if (result.isConfirmed) {
							location.reload();
						}
					});
					event.target.reset();
				} else {
					throw new Error("Error al agregar el instrumento");
				}
			} catch (error) {
				console.error(error);
				Swal.fire({
					text: error.message,
					icon: "error",
				});
			}
		}
	};

	return (
		<div className={"form-add-product-container"}>
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<h3 className="mb-4 text-center">Datos del nuevo instrumento</h3>

			<Form onSubmit={onSubmitForm} className="div-form-container">
				<div className="sections-container">
					<section className="section-add-product datos-generales">
						<h4>Datos generales</h4>
						<Form.Group className="mb-3 input">
							<Form.Control
								type="text"
								placeholder="Título"
								onChange={onChangeName}
								className={
									titleValidation === false || titleLengthValidation === false
										? "error-input"
										: null
								}
							/>
							{titleLengthValidation === false ? (
								<div className="divError">Por favor, revisa este campo</div>
							) : null}
							{titleValidation === false ? (
								<div className="divError">
									El instrumento ingresado ya existe
								</div>
							) : null}
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="text"
								as="textarea"
								rows={3}
								placeholder="Descripción"
								onChange={onChangeDescription}
								className={validDescription === false ? "error-input" : null}
							/>
							{validDescription === false ? (
								<div className="divError">Por favor, revisa este campo</div>
							) : null}
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="number"
								placeholder="Precio"
								onChange={onChangePrice}
								className={validPrice === false ? "error-input" : null}
							/>
							{validPrice === false ? (
								<div className="divError">Por favor, revisa este campo</div>
							) : null}
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Control
								type="number"
								placeholder="Stock"
								onChange={onChangeStock}
								className={validStock === false ? "error-input" : null}
							/>
							{validStock === false ? (
								<div className="divError">Por favor, revisa este campo</div>
							) : null}
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Select
								onChange={onChangeBrand}
								className={validBrand === false ? "error-input" : null}
							>
								<option defaultValue>Selecciona la marca</option>
								{brands?.map((brand) => {
									return (
										<option value={brand.name} key={brand?.name}>
											{brand.name}
										</option>
									);
								})}
							</Form.Select>
							{validCategory === false ? (
								<div className="divError">Por favor, selecciona un valor</div>
							) : null}
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Select
								onChange={onChangeCategory}
								className={validCategory === false ? "error-input" : null}
							>
								<option defaultValue>Selecciona la categoría</option>
								{categories?.map((category) => {
									return (
										<option value={category.title} key={category?.title}>
											{category.title}
										</option>
									);
								})}
							</Form.Select>
							{validCategory === false ? (
								<div className="divError">Por favor, selecciona un valor</div>
							) : null}
						</Form.Group>

						<Form.Group className="mb-3 input">
							<Form.Select
								onChange={onChangeBranch}
								className={validBranch === false ? "error-input" : null}
							>
								<option defaultValue>Selecciona la sucursal</option>
								{branches?.map((branch) => {
									return (
										<option value={branch.name} key={branch?.id}>
											{branch.name}
										</option>
									);
								})}
							</Form.Select>
							{validBranch === false ? (
								<div className="divError">Por favor, selecciona un valor</div>
							) : null}
						</Form.Group>
					</section>

					<section className="section-add-product imagenes">
						<h4>Imágenes</h4>

						<Form.Group className="mb-3 input d-flex justify-content-center">
							{visualizarCarga === false ? (
								<Button className="btn-general bt-aniadir" onClick={onAniadir}>
									Añadir
								</Button>
							) : (
								<UploadImage setImageUrl={setImageAux} />
							)}
						</Form.Group>

						<div
							className="div-imagenes-add-product"
							style={{ display: "flex" }}
						>
							{imagesArray.map((image, index) => (
								<div className="div-imagen-add-product" key={index}>
									<img className="imagen-add-product" src={image?.url} alt="" />
								</div>
							))}
						</div>

						{validImages === false ? (
							<div className="divError mt-3">
								Por favor, sube al menos una imagen
							</div>
						) : null}
					</section>

					<section className="section-add-product caracteristicas">
						<h4>Características</h4>
						<Form.Group className="mb-3">
							<Form.Label>Selecciona las que apliquen (al menos 4):</Form.Label>

							<Accordion>
								{features?.map((feature) => (
									<Form.Check
										type="checkbox"
										key={feature?.id}
										id={`feature-${feature?.id}`}
										label={
											<div>
												{getFeatureIcon(feature?.icon)} {feature?.name}
											</div>
										}
										onChange={(event) => handleFeatureChange(event, feature.id)}
									/>
								))}
							</Accordion>
							{validFeatures === false ? (
								<div className="divError mt-3">
									Por favor, selecciona al menos 4 características
								</div>
							) : null}
						</Form.Group>
					</section>
				</div>

				<div className="botones-agregar-producto">
					<Button type="submit" className="button-agregar">
						Agregar instrumento
					</Button>
					<Button
						className="btn-cerrar-agregar-prod"
						onClick={handleCerrarForm}
					>
						Cerrar
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AddProductForm;
