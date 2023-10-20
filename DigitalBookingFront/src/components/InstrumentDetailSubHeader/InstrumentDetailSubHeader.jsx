import React from "react";
import Rating from "../Rating/Rating";
import "./InstrumentDetailSubHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import HeartFavButton from "../HeartFavButton/HeartFavButton";
import ShareButton from "../ShareButton/ShareButton";
import { useEffect, useState } from "react";

const InstrumentDetailSubHeader = ({ product }) => {
	const [login, setLogin] = useState("");
	useEffect(() => {
		setLogin(localStorage.getItem("login"));
	}, []);

	return (
		<div className="detail-subheader-container">
			<div className="subheader-direccion">
				<FontAwesomeIcon icon={faLocationDot} className="location-icon" />
				{product?.branch?.address || "Av. Siempreviva 742, Springfield"}
			</div>
			<div className="detail-subheader-rating">
				<Rating />
			</div>
			<div className="detail-subheader-heart-and-share">
				<div
					className={`detail-subheader-heart ${
						login !== "USER" && "hide-heart"
					}`}
				>
					<HeartFavButton product={product} />
				</div>

				<div className="detail-subheader-share">
					<ShareButton
						defaultMessage={
							"Encontré este instrumento que podría interesarte: "
						}
						url={`http://g2c5-frontnode.s3-website.us-east-2.amazonaws.com/producto/${product?.id}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default InstrumentDetailSubHeader;
