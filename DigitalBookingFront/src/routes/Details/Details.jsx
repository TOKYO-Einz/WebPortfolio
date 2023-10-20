import { useParams } from "react-router-dom";
import { ProductsContext } from "../../utils/Context";
import { useContext, useState, useEffect } from "react";
import NotFound from "../NotFound/NotFound";
import InstrumentDetailCard from "../../components/InstrumentDetailCard/InstrumentDetailCard";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import "./Details.css";

const Details = () => {
	const [productById, setProductById] = useState([]);
	const [loading, setLoading] = useState(true);
	const { getProductsById } = useContext(ProductsContext);
	let param = useParams();
	let idParam = parseInt(param.id);

	const getProduct = async () => {
		try {
			const response = await getProductsById(idParam);
			setProductById(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching product by id:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getProduct();
	}, [idParam]);

	const getMaxID = () => {
		let maxID = 0;

		if (productById.id > maxID) {
			maxID = productById.id;
		}

		return maxID;
	};

	const isValidParam = () => {
		const maxID = getMaxID();
		return idParam <= maxID;
	};

	if (loading) {
		return <SkeletonLoader duration={2000} />;
	}

	return (
		<div className="details-container">
			{isValidParam() ? <InstrumentDetailCard /> : <NotFound />}
		</div>
	);
};
export default Details;
