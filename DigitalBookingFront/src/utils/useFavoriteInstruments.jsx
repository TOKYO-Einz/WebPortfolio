import { useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
	favoriteInstruments: JSON.parse(localStorage.getItem("favoritos")) || [],
};

const notifyRemoved = () => {
	toast.error("🎵 Removido de favoritos", {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: "colored",
		className: "toastMessage",
	});
};

const notifyAllRemoved = () => {
	toast.error("🎶 Todos los favoritos se han removido", {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: "colored",
		className: "toastMessage",
	});
};

const reducer = (favsState, action) => {
	switch (action.type) {
		case "ADD_FAVORITE":
			const newFavoriteInstruments = [
				...favsState?.favoriteInstruments,
				action.payload,
			];
			localStorage.setItem("favoritos", JSON.stringify(newFavoriteInstruments));
			return { ...favsState, favoriteInstruments: newFavoriteInstruments };
		case "REMOVE_FAVORITE":
			const filteredFavoriteInstruments = favsState?.favoriteInstruments?.filter(
				(instrument) => instrument.id !== action.payload.id
			);
			localStorage.setItem(
				"favoritos",
				JSON.stringify(filteredFavoriteInstruments)
			);
			notifyRemoved();
			return { ...favsState, favoriteInstruments: filteredFavoriteInstruments };
		case "REMOVE_ALL_INSTRUMENTS":
			const emptyArray = [];
			localStorage.setItem("favoritos", JSON.stringify);
			notifyAllRemoved();
			return { ...favsState, favoriteInstruments: emptyArray };
		default:
			return favsState;
	}
};

const useFavoriteInstruments = () => {
	const [favsState, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		localStorage.setItem(
			"favoritos",
			JSON.stringify(favsState?.favoriteInstruments)
		);
	}, [favsState?.favoriteInstruments]);

	const addFavoriteInstrument = (instrument) =>
		dispatch({ type: "ADD_FAVORITE", payload: instrument });
	const removeFavoriteInstrument = (instrument) =>
		dispatch({ type: "REMOVE_FAVORITE", payload: instrument });
	const removeAllInstruments = () =>
		dispatch({ type: "REMOVE_ALL_INSTRUMENTS" });

	return {
		favsState,
		addFavoriteInstrument,
		removeFavoriteInstrument,
		removeAllInstruments,
	};
};

export default useFavoriteInstruments;
