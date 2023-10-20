import "./AddBrandForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Swal from "sweetalert2";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";

const AddBrandForm = () => {
	const { brands, setBrands, postBrand } = useContext(ProductsContext);

	const [formData, setFormData] = useState({
		title: "",
		imgUrl: "",
	});

	const [formValidation, setFormValidation] = useState({
		title: undefined,
		titleLength: undefined,
		imgUrl: undefined,
	});

	const navigate = useNavigate();

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const validateForm = () => {
		const { title, imgUrl } = formData;

		const validTitle = !brands.some((brand) => brand.name === title);
		const validTitleLength = title.length > 0;
		const validImgUrlLength = imgUrl.length > 0;

		setFormValidation({
			title: validTitle,
			titleLength: validTitleLength,
			imgUrl: validImgUrlLength,
		});

		return validTitle && validTitleLength && validImgUrlLength;
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			try {
				const { title, imgUrl } = formData;

				const payload = {
					name: title,
					image: imgUrl,
				};

				const response = await postBrand(payload);

				if (response?.status === 201) {
					const newBrand = response.data;
					setBrands((prevBrands) => [...prevBrands, { ...newBrand }]);

					Swal.fire({
						text: "Marca agregada con éxito!",
						icon: "success",
						showCloseButton: true,
						confirmButtonText: "OK",
						confirmButtonColor: "#f0572d",
						customClass: {
							confirmButton: "custom-confirm-button",
						},
					});
					event.target.reset();
				} else {
					throw new Error("Error al agregar la marca");
				}
			} catch (error) {
				Swal.fire({
					text: error.message,
					icon: "error",
				});
			}
		}
	};

	return (
		<div className={"form-add-category-container"}>
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<Form onSubmit={onSubmitForm} className="form-add-category">
				<h3 className="mb-4">Datos de la nueva marca</h3>

				<Form.Group className="mb-3 input">
					<Form.Control
						type="text"
						name="title"
						placeholder="Nombre"
						value={formData.title}
						onChange={handleChange}
						className={
							formValidation.title === false &&
							formValidation.titleLength === false &&
							"error-input"
						}
					/>
					{formValidation.title === false && (
						<div className="divError">La categoría ingresada ya existe</div>
					)}
					{formValidation.titleLength === false && (
						<div className="divError">Por favor, revisa este campo</div>
					)}
				</Form.Group>

				<Form.Group className="mb-3 input">
					<Form.Control
						type="text"
						name="imgUrl"
						placeholder="URL imagen"
						value={formData.imgUrl}
						onChange={handleChange}
						className={formValidation.imgUrl === false && "error-input"}
					/>
					{formValidation.imgUrl === false && (
						<div className="divError">Por favor, revisa este campo</div>
					)}
				</Form.Group>

				<Button type="submit" className="button-agregar">
					Agregar marca
				</Button>
				<Button className="btn-cerrar" onClick={handleCerrarForm}>
					Cerrar
				</Button>
			</Form>
		</div>
	);
};

export default AddBrandForm;
