import { createContext, useEffect, useState } from "react";
import axios from "axios";
import useFavoriteInstruments from "./useFavoriteInstruments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGem,
	faHeadphones,
	faChild,
	faCubes,
	faFireFlameCurved,
	faSackDollar,
	faMusic,
	faPlay,
	faBook,
	faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const initialValue = { categories: [], products: [] };

export const ProductsContext = createContext(initialValue);

const ProductsContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [features, setFeatures] = useState([]);
	const [branches, setBranches] = useState([]);
	const [brands, setBrands] = useState([]);
	const [token, setToken] = useState(localStorage.getItem("token"));

	const url = "http://ec2-3-20-223-217.us-east-2.compute.amazonaws.com:8819";

	const { data } = useContext(AuthContext);

	const getToken = () => {
		setToken(localStorage.getItem("token"));
	};

	useEffect(() => {
		getToken();
	}, [data]);

	//PRODUCTOS

	//1. GET ALL

	const getProducts = async () => {
		try {
			const response = await axios.get(`${url}/products/list`, {});
			const data = response.data.content;
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	//2. POST

	const postProduct = async (payload) => {
		try {
			const response = await axios.post(`${url}/products/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error posting product:", error);
		}
	};

	//3. GET PRODUCTS BY ID

	const getProductsById = async (id) => {
		try {
			const response = await axios.get(`${url}/products/search/${id}`, {});
			return response;
		} catch (error) {
			console.error("Error fetching products by id:", error);
		}
	};

	//4. DELETE PRODUCT

	const deleteProduct = async (id) => {
		try {
			const response = await axios.delete(`${url}/products/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error deleting product: ", error);
		}
	};

	//5. EDIT PRODUCT

	const editProduct = async (payload) => {
		try {
			const response = await axios.put(
				`${url}/products/edit/${payload.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (error) {
			console.error("Error editing product: ", error);
		}
	};

	//CATEGORIAS

	//1. GET CATEGORIAS

	const getCategories = async () => {
		try {
			const response = await axios.get(`${url}/categories/list`, {});
			const data = response.data.content;
			setCategories(data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	//2. GET CATEGORIA BY ID

	const getCategoriesById = async (id) => {
		try {
			const response = await axios.get(`${url}/categories/search/${id}`);
			const data = response.data;
		} catch (error) {
			console.error("Error fetching categories by id:", error);
		}
	};

	//3. POST CATEGORIA

	const postCategory = async (payload) => {
		try {
			const response = await axios.post(`${url}/categories/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error posting category: ", error);
			return { error };
		}
	};

	//5. DELETE CATEGORIA

	const deleteCategory = async (id) => {
		try {
			const response = await axios.delete(`${url}/categories/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error deleting category: ", error);
			return { error };
		}
	};

	// FEATURES

	//1. GET ALL FEATURES

	const getFeatures = async () => {
		if (token) {
			try {
				const response = await axios.get(`${url}/features/list`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data;
				setFeatures(data);
			} catch (error) {
				console.error("Error fetching features:", error);
			}
		}
	};

	//2. POST FEATURE

	const postFeature = async (payload) => {
		try {
			const response = await axios.post(`${url}/features/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error posting category: ", error);
			return { error };
		}
	};

	//GET FEATURE ICON

	const getFeatureIcon = (icon) => {
		switch (icon) {
			case "material":
				return (
					<FontAwesomeIcon className="feature-icon icon-gem" icon={faGem} />
				);
			case "sonido":
				return (
					<FontAwesomeIcon
						className="feature-icon icon-headphones"
						icon={faHeadphones}
					/>
				);
			case "principiantes":
				return (
					<FontAwesomeIcon className="feature-icon icon-child" icon={faChild} />
				);
			case "accesorios":
				return (
					<FontAwesomeIcon className="feature-icon icon-cubes" icon={faCubes} />
				);
			case "solicitado":
				return (
					<FontAwesomeIcon
						className="feature-icon icon-fire"
						icon={faFireFlameCurved}
					/>
				);
			case "precio":
				return (
					<FontAwesomeIcon
						className="feature-icon icon-dollar"
						icon={faSackDollar}
					/>
				);
			case "partituras":
				return (
					<FontAwesomeIcon className="feature-icon icon-music" icon={faMusic} />
				);
			case "video":
				return (
					<FontAwesomeIcon className="feature-icon icon-play" icon={faPlay} />
				);
			case "guia":
				return (
					<FontAwesomeIcon className="feature-icon icon-book" icon={faBook} />
				);
			case "limitado":
				return (
					<FontAwesomeIcon
						className="feature-icon icon-sparkles"
						icon={faWandMagicSparkles}
					/>
				);
			default:
				return null;
		}
	};

	//BRANCHES

	//1. GET BRANCHES

	const getBranches = async () => {
		if (token) {
			try {
				const response = await axios.get(`${url}/branches/list`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data;
				setBranches(data);
			} catch (error) {
				console.error("Error fetching branches:", error);
			}
		}
	};

	//2. POST BRANCH

	const postBranch = async (payload) => {
		try {
			const response = await axios.post(`${url}/branches/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error posting branch: ", error);
			return { error };
		}
	};

	//3. PUT BRANCH

	const editBranch = async (payload) => {
		try {
			const response = await axios.put(
				`${url}/branches/edit/${payload.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (error) {
			console.error("Error editing branch: ", error);
		}
	};

	//4. DELETE BRANCH

	const deleteBranch = async (id) => {
		try {
			const response = await axios.delete(`${url}/branches/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error deleting branch: ", error);
			return { error };
		}
	};

	//5. GET BRANCH BY ID

	const getBranchById = async (id) => {
		try {
			const response = await axios.get(`${url}/branches/search/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error fetching branch by id:", error);
		}
	};

	//BRANDS

	const getBrands = async () => {
		try {
			const response = await axios.get(`${url}/brands/list`, {});
			const data = response.data;
			setBrands(data);
		} catch (error) {
			console.error("Error fetching brands:", error);
		}
	};

	//2. POST BRAND

	const postBrand = async (payload) => {
		try {
			const response = await axios.post(`${url}/brands/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error posting brand: ", error);
			return { error };
		}
	};

	//3. PUT BRAND

	const editBrand = async (payload) => {
		try {
			const response = await axios.put(
				`${url}/brands/edit/${payload.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (error) {
			console.error("Error editing brand: ", error);
		}
	};

	//4. DELETE BRAND

	const deleteBrand = async (id) => {
		try {
			const response = await axios.delete(`${url}/brands/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error deleting brand: ", error);
			return { error };
		}
	};

	//5. GET BRAND BY ID

	const getBrandById = async (id) => {
		try {
			const response = await axios.get(`${url}/brands/search/${id}`, {});
			return response;
		} catch (error) {
			console.error("Error fetching brand by id:", error);
		}
	};

	//SCORE

	//1. POST SCORE

	const rateProduct = async (payload) => {
		try {
			const response = await axios.post(`${url}/scores/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error al puntuar el producto: ", error);
			return { error };
		}
	};

	//RESERVAS

	//1. POST RESERVA

	const postReservation = async (payload) => {
		try {
			const response = await axios.post(`${url}/reservations/create`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (error) {
			console.error("Error al realizar la reserva: ", error);
			return { error };
		}
	};

	//2. GET RESERVA POR USUARIO

	const getReservationByUser = async (id) => {
		if (id) {
			try {
				const response = await axios.get(
					`${url}/reservations/searchUserRes/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return response;
			} catch (error) {
				console.error("Error fetching reservation by user:", error);
			}
		}
	};

	//3. GET RESERVA POR PRODUCTO

	const getReservationByProduct = async (id) => {
		if (id) {
			try {
				const response = await axios.get(
					`${url}/reservations/searchProdRes/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return response;
			} catch (error) {
				console.error("Error fetching reservation by product:", error);
			}
		}
	};

	const {
		favsState,
		addFavoriteInstrument,
		removeFavoriteInstrument,
		removeAllInstruments,
	} = useFavoriteInstruments();

	useEffect(() => {
		getProducts();
		getCategories();
		getFeatures();
		getBranches();
		getBrands();
		setProducts();
		getReservationByProduct();
		getReservationByUser();
	}, [window.location.pathname]);

	return (
		<ProductsContext.Provider
			value={{
				products,
				getProducts,
				setProducts,
				postProduct,
				deleteProduct,
				editProduct,
				getProductsById,

				categories,
				setCategories,
				deleteCategory,
				postCategory,

				features,
				postFeature,
				getFeatureIcon,

				favsState,
				addFavoriteInstrument,
				removeFavoriteInstrument,
				removeAllInstruments,

				branches,
				setBranches,
				postBranch,
				editBranch,
				deleteBranch,
				getBranchById,

				brands,
				setBrands,
				postBrand,
				deleteBrand,

				rateProduct,

				postReservation,
				getReservationByUser,
				getReservationByProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsContextProvider;
