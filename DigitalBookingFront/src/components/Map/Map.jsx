import React from "react";
import "./Map.css";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

const Map = ({ product }) => {
	const latitudGet = product?.branch?.latitude || -31.42823824576768;
	const longitudGet = product?.branch?.longitude || -64.18213612806736;

	return (
		<>
			<MapContainer
				center={[latitudGet, longitudGet]}
				zoom={10}
				scrollWheelZoom={true}
				style={{ height: "400px", display: "flex", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[latitudGet, longitudGet]}>
					<Popup>
						{product?.branch?.name} <br /> Centro de distribución autorizado{" "}
						<br /> {product?.branch?.address}
					</Popup>
				</Marker>
			</MapContainer>
		</>
	);
};

export default Map;
