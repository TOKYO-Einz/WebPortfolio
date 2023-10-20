import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./InstrumentCard.css";
import HeartFavButton from "../HeartFavButton/HeartFavButton";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import ShareButton from "../ShareButton/ShareButton";

const InstrumentCard = ({ product, loading }) => {
	if (loading) {
		return <SkeletonLoader isSkeletonCard={true} />;
	}

	if (!product) {
		return null;
	}

	return (
		<div className="instrument-card-container" key={product.id}>
			<Card className="instrument-card">
				<div className="card-brand">
					<img
						src={product?.brand?.image}
						alt="logo-marca"
						className={`brand-img-card ${
							product.brand == "Steinway" ? "img-card-steinway" : ""
						}
						}`}
					/>
				</div>

				<div className="fav-and-share">
					<div className="share-card">
						<ShareButton
							defaultMessage={
								"Encontré este instrumento que podría interesarte: "
							}
							url={`http://g2c5-frontnode.s3-website.us-east-2.amazonaws.com/producto/${product?.id}`}
						/>
					</div>
					<div className="heart-fav">
						<HeartFavButton product={product} />
					</div>
				</div>

				<Link to={`/producto/${product?.id}`} className="link">
					<div className="card-image-container">
						<div className="image-wrapper">
							<Card.Img
								variant="top"
								src={product?.images[0]?.url}
								alt={product?.name}
								className="card-image"
							/>
						</div>
					</div>
					<Card.Body>
						<Card.Text className="instrument-card-text">
							{product?.name}
						</Card.Text>
					</Card.Body>
				</Link>
			</Card>
		</div>
	);
};

export default InstrumentCard;
