import "./AddCategoryForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
	const { categories, setCategories, postCategory } =
		useContext(ProductsContext);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		imgUrl: "",
	});

	const [formValidation, setFormValidation] = useState({
		title: undefined,
		titleLength: undefined,
		description: undefined,
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
		const { title, description, imgUrl } = formData;

		const validTitle = !categories.some((category) => category.title === title);
		const validTitleLength = title.length > 0;
		const validDescriptionLength = description.length > 0;
		const validImgUrlLength = imgUrl.length > 0;

		setFormValidation({
			title: validTitle,
			titleLength: validTitleLength,
			description: validDescriptionLength,
			imgUrl: validImgUrlLength,
		});

		return (
			validTitle &&
			validTitleLength &&
			validDescriptionLength &&
			validImgUrlLength
		);
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			try {
				const { title, description, imgUrl } = formData;

				const payload = {
					title,
					description,
					imgUrl,
				};

				const response = await postCategory(payload);

				if (response?.status === 201) {
					const newCategory = response.data;
					setCategories((prevCategories) => [
						...prevCategories,
						{ ...newCategory },
					]);

					Swal.fire({
						text: "Categoría agregada con éxito!",
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
					throw new Error("Error al agregar la categoría");
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
		<div className="form-add-category-container">
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<Form onSubmit={onSubmitForm} className="form-add-category">
				<h3 className="mb-4">Datos de la nueva categoría</h3>

				<Form.Group className="mb-3 input">
					<Form.Control
						type="text"
						name="title"
						placeholder="Título"
						value={formData.title}
						onChange={handleChange}
						className={
							formValidation.title === false ||
							formValidation.titleLength === false
								? "error-input"
								: ""
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
						name="description"
						placeholder="Descripción"
						value={formData.description}
						onChange={handleChange}
						className={
							formValidation.description === false ? "error-input" : ""
						}
					/>
					{formValidation.description === false && (
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
					Agregar categoría
				</Button>
				<Button className="btn-cerrar" onClick={handleCerrarForm}>
					Cerrar
				</Button>
			</Form>
		</div>
	);
};

export default AddCategoryForm;
