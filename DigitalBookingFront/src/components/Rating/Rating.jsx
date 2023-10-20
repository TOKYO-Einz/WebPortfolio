import React, { useState, useEffect } from "react";
import "./Rating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGuitar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ProductsContext } from "../../utils/Context";
import { useParams } from "react-router-dom";

const Rating = () => {
	const { rateProduct, getProductsById } = useContext(ProductsContext);
	const [product, setProduct] = useState("");

	const params = useParams();
	const idParam = parseInt(params.id);

	const [login, setLogin] = useState("");
	useEffect(() => {
		setLogin(localStorage.getItem("login"));
	}, []);

	const ratingNumber = product?.averageScore;

	const [ratingScore, setRatingScore] = useState("");
	const [highlightedGuitars, setHighlightedGuitars] = useState([]);
	const [hoveredGuitar, setHoveredGuitar] = useState(null);

	useEffect(() => {
		switch (highlightedGuitars.length) {
			case 1:
				setRatingScore("Malo");
				break;
			case 2:
				setRatingScore("Regular");
				break;
			case 3:
				setRatingScore("Bueno");
				break;
			case 4:
				setRatingScore("Muy bueno");
				break;
			case 5:
				setRatingScore("Excelente");
				break;
			default:
				setRatingScore("Puntuación");
				break;
		}
	}, [highlightedGuitars]);

	const getProduct = async () => {
		try {
			const response = await getProductsById(idParam);

			if (response?.status === 200) {
				const p = response.data;
				setProduct(p);
			} else {
				throw new Error("Error al buscar el instrumento");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getProduct();
	}, [ratingNumber]);

	const handleClick = async (index) => {
		const selectedGuitars = [...Array(index).keys()].map((i) => i + 1);
		setHighlightedGuitars(selectedGuitars);

		const newScore = index * 2;

		const payload = {
			value: newScore,
			product: {
				id: product?.id,
			},
		};

		try {
			const response = await rateProduct(payload);

			if (response?.status === 201) {
				getProduct();
			} else {
				throw new Error("Error al puntuar el instrumento");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="rating-container">
			<div className={`guitars-score ${login !== "USER" && "hide-guitars"}`}>
				<div className="guitars-container">
					{[1, 2, 3, 4, 5].map((guitarIndex) => (
						<FontAwesomeIcon
							key={guitarIndex}
							className={`rating-icon icon-guitar-${guitarIndex} ${
								highlightedGuitars.includes(guitarIndex) ||
								guitarIndex === hoveredGuitar
									? "highlighted"
									: ""
							}`}
							icon={faGuitar}
							onClick={() => handleClick(guitarIndex)}
						/>
					))}
				</div>

				<div className="rating-label">
					<span>{ratingScore}</span>
				</div>
			</div>

			<div className="general-rating-container d-flex flex-column align-items-center">
				<span className={`mb-1 ${login === "USER" && "hide-span"}`}>
					Puntuación general
				</span>
				<div className="rating-number">
					<span>{ratingNumber ?? "10"}</span>
				</div>
			</div>
		</div>
	);
};

export default Rating;
