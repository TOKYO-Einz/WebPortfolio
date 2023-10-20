import "./SkeletonLoader.css";
import React from "react";
import { Card } from "react-bootstrap";

const SkeletonLoader = ({ isSkeletonCard }) => {
	return (
		<div>
			{!isSkeletonCard ? (
				<div className="skeleton-loader">
					<div className="skeleton-loader-content"></div>
				</div>
			) : (
				<Card>
					<Card.Body className="skeleton-card-body">
						<Card.Title>Cargando...</Card.Title>
						<Card.Text className="skeleton-container">
							<span className="skeleton-image"></span>
							<span className="skeleton-line"></span>
							<span className="skeleton-line"></span>
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</div>
	);
};

export default SkeletonLoader;
