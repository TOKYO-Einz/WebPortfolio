import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import "./EditBranchForm.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";

const EditBranchForm = () => {
	const { editBranch, branches, setBranches, getBranchById } =
		useContext(ProductsContext);

	const [newBranches, setNewBranches] = useState([]);
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [selectedBranch, setSelectedBranch] = useState([]);

	const navigate = useNavigate();

	const params = useParams();
	const idParam = parseInt(params.id);

	const getBranch = async () => {
		try {
			const response = await getBranchById(idParam);

			if (response?.status === 200) {
				const branch = response.data;
				setSelectedBranch(branch);
			} else {
				throw new Error("Error al buscar la sucursal");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getBranch();
	}, []);

	const handleCerrarForm = () => {
		navigate("/admin");
	};

	useEffect(() => {
		if (newBranches.length > 0) {
			setBranches([...branches, ...newBranches]);
		}
	}, [newBranches]);

	useEffect(() => {
		if (selectedBranch) {
			setId(selectedBranch.id);
			setName(selectedBranch.name);
			setAddress(selectedBranch.address);
			setLatitude(parseFloat(selectedBranch.latitude));
			setLongitude(parseFloat(selectedBranch.longitude));
		}
	}, [selectedBranch]);

	useEffect(() => {
		if (newBranches.length > 0) {
			setBranches((prevBranches) => [...prevBranches, ...newBranches]);
		}
	}, [newBranches, setBranches]);

	const onChangeId = (event) => {
		setId(event.target.value);
	};

	const onChangeName = (event) => {
		setName(event.target.value);
	};

	const onChangeAddress = (event) => {
		setAddress(event.target.value);
	};

	const onChangeLatitude = (event) => {
		setLatitude(event.target.value);
	};

	const onChangeLongitude = (event) => {
		setLongitude(event.target.value);
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		const payload = {
			id: id,
			name: name,
			address: address,
			latitude: latitude,
			longitude: longitude,
		};

		try {
			const response = await editBranch(payload);

			if (response?.status === 200) {
				const updatedBranch = response.data;
				setNewBranches((prevBranches) => [
					...prevBranches,
					{ ...updatedBranch },
				]);
				Swal.fire({
					text: "Sucursal editada con éxito!",
					icon: "success",
					showCloseButton: true,
					confirmButtonText: "OK",
					confirmButtonColor: "#f0572d",
					customClass: {
						confirmButton: "custom-confirm-button",
					},
				});
			} else {
				throw new Error("Error al editar la sucursal");
			}
		} catch (error) {
			Swal.fire({
				text: "Error al editar la sucursal - ",
				icon: "error",
			});
		}
	};

	return (
		<div>
			<div className="nav-bar-admin">
				<NavigationBarAdmin />
			</div>
			<Form onSubmit={onSubmitForm} className="form-edit-branch">
				<h3 className="mb-5 text-center">Datos de la sucursal a editar</h3>

				<div className="edit-product-containers">
					<div className="">
						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Label className="me-4">ID</Form.Label>
							<Form.Control
								type="text"
								placeholder="Id"
								value={id}
								onChange={onChangeId}
								disabled
							/>
						</Form.Group>

						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Label className="me-3">Nombre</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nombre"
								value={name}
								onChange={onChangeName}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input  d-flex align-items-center">
							<Form.Label className="me-3">Dirección</Form.Label>

							<Form.Control
								type="text"
								placeholder="Dirección"
								value={address}
								onChange={onChangeAddress}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Label className="me-3">Latitud</Form.Label>
							<Form.Control
								type="text"
								placeholder="Latitud"
								value={latitude}
								onChange={onChangeLatitude}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3 input d-flex align-items-center">
							<Form.Label className="me-3">Longitud</Form.Label>

							<Form.Control
								type="text"
								placeholder="Longitud"
								value={longitude}
								onChange={onChangeLongitude}
								required
							/>
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

export default EditBranchForm;
