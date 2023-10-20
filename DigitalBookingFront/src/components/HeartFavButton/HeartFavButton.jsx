import "./HeartFavButton.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { ProductsContext } from "../../utils/Context";
import { useContext } from "react";

library.add(fas, far);

const HeartFavButton = ({ product }) => {
	const { favsState, addFavoriteInstrument, removeFavoriteInstrument } =
		useContext(ProductsContext);
	const login = localStorage.getItem("login");

	const handleButtonClick = (event) => {
		event.stopPropagation();

		toggleFav();
	};

	const isFavorite = favsState.favoriteInstruments.some(
		(favorite) => favorite.id === product.id
	);
	const toggleFav = () => {
		isFavorite
			? removeFavoriteInstrument(product)
			: addFavoriteInstrument(product);
	};

	return (
		login === "USER" && (
			<div className="heart-fav-button" onClick={handleButtonClick}>
				{isFavorite ? (
					<FontAwesomeIcon icon={faHeart} />
				) : (
					<FontAwesomeIcon icon={["far", "heart"]} />
				)}
			</div>
		)
	);
};

export default HeartFavButton;
