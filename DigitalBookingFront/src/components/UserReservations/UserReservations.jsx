import React from "react";
import "./UserReservations.css";
import Table from "react-bootstrap/Table";
import BackHomeButton from "../BackHomeButton/BackHomeButton";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import { AuthContext } from "../../utils/AuthContext";
import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const UserReservations = () => {
	const { getReservationByUser } = useContext(ProductsContext);
	const { data } = useContext(AuthContext);
	const [reservations, setReservations] = useState([]);
	const [loading, setLoading] = useState(true);

	const user = JSON.parse(localStorage.getItem("user"));
	const id = user?.id;
	const token = localStorage.getItem("token");

	const getReservations = async () => {
		try {
			const response = await getReservationByUser(data.user.id);
			setReservations(response.data);
			setLoading(false);
		} catch (error) {
			console.error("no se pudo encontrar al usuario");
			setLoading(false);
		}
	};

	useEffect(() => {
		getReservations();
	}, []);

	if (loading) {
		return <SkeletonLoader duration={2000} />;
	}

	return (
		<div className="user-reservations-container user-profile-container">
			<div className="user-profile-header user-resevations-header">
				<h2>Mis Reservas</h2>
				<div className="back-home-button-icon">
					<BackHomeButton isBackIcon={true} />
				</div>
			</div>
			{reservations?.length > 0 ? (
				<div className="table-user-reservations-container">
					<Table
						striped
						bordered
						hover
						responsive
						variant="dark"
						className="table-user-reservations"
						id="my-table-id"
					>
						<thead>
							<tr>
								<th>#</th>
								<th>Producto</th>
								<th>Fecha de retiro</th>
								<th>Fecha de devolución</th>
								<th>Sucursal</th>
								<th>Observaciones</th>
							</tr>
						</thead>
						<tbody>
							{reservations.map((reservation, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{reservation?.product?.name}</td>
									<td>{reservation?.startDay}</td>
									<td>{reservation?.endDay}</td>
									<td>{`${reservation?.product?.branch?.name} - ${reservation?.product?.branch?.address}`}</td>
									<td>{reservation?.comments || "-"}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			) : (
				<h4 className="mt-5">Aún no se han efectuado reservas</h4>
			)}
		</div>
	);
};

export default UserReservations;
