import "./AddBranchForm.css";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../utils/Context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import { useNavigate } from "react-router-dom";

const AddBranchForm = () => {
	const { setBranches, postBranch } = useContext(ProductsContext);

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const navigate = useNavigate();

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	const onChangeName = (event) => {
		setName(event.target.value);
	};

	const onChangeAddress = (event) => {
		setAddress(event.target.value);
	};

	const onChangeLatitude = (event) => {
		setLatitude(parseFloat(event.target.value));
	};

	const onChangeLongitude = (event) => {
		setLongitude(parseFloat(event.target.value));
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		const payload = {
			name: name,
			address: address,
			latitude: latitude,
			longitude: longitude,
		};

		try {
			const response = await postBranch(payload);

			if (response?.status === 201) {
				const updatedBranch = response.data;
				setBranches((prevBranches) => [...prevBranches, { ...updatedBranch }]);
				Swal.fire({
					text: "Sucursal agregada con éxito!",
					icon: "success",
					showCloseButton: true,
					confirmButtonText: "OK",
					confirmButtonColor: "#f0572d",
					customClass: {
						confirmButton: "custom-confirm-button",
					},
				});
			} else {
				throw new Error("Error al agregar la sucursal");
			}
		} catch (error) {
			Swal.fire({
				text: "Error al agregar la sucursal - ",
				icon: "error",
			});
		}
	};

	return (
		<div>
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<Form
				onSubmit={onSubmitForm}
				className="form-edit-branch form-add-branch"
			>
				<h3 className="mb-5 text-center titulo-agregar-sucursal">
					Datos de la nueva sucursal
				</h3>

				<div className="edit-product-containers">
					<div>
						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Control
								className="input-agregar-sucursal"
								type="text"
								placeholder="Nombre"
								onChange={onChangeName}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input  d-flex align-items-center">
							<Form.Control
								className="input-agregar-sucursal"
								type="text"
								placeholder="Dirección"
								onChange={onChangeAddress}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Control
								className="input-agregar-sucursal"
								type="text"
								placeholder="Latitud"
								onChange={onChangeLatitude}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Control
								className="input-agregar-sucursal"
								type="text"
								placeholder="Longitud"
								onChange={onChangeLongitude}
								required
							/>
						</Form.Group>
					</div>
				</div>
				<div className="botones-agregar-sucursal">
					<Button type="submit" className="button-agregar">
						Agregar sucursal
					</Button>
					<Button className="btn-cerrar" onClick={() => handleCerrarForm()}>
						Cerrar
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AddBranchForm;
