import { useParams } from "react-router-dom";
import InstrumentCard from "../InstrumentCard/InstrumentCard";
import { ProductsContext } from "../../utils/Context";
import { useContext, useState, useEffect } from "react";
import BackHomeButton from "../BackHomeButton/BackHomeButton";
import { Pagination } from "react-bootstrap";
import "./SearchedByCategory.css";

const SearchedByCategory = () => {
	const params = useParams();
	const { products } = useContext(ProductsContext);
	const categoryName = params?.name;
	const [loading, setLoading] = useState(true);
	const filteredProducts = products?.filter(
		(product) => product?.category?.title === categoryName
	);

	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;
	const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts?.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="searched-container">
			<h3>{categoryName}</h3>
			<div
				className={
					filteredProducts?.length > 1 ? "searched-cards" : "searched-card"
				}
			>
				{loading
					? Array.from({ length: productsPerPage }).map((_, index) => (
							<InstrumentCard key={index} loading={true} />
					  ))
					: currentProducts?.map((product) => (
							<InstrumentCard
								className="searched-card"
								key={product?.id}
								product={product}
							/>
					  ))}
			</div>
			<Pagination>
				<Pagination.Prev
					disabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}
				/>
				{Array.from({ length: totalPages }, (_, index) => (
					<Pagination.Item
						key={index + 1}
						active={index + 1 === currentPage}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next
					disabled={currentPage === totalPages}
					onClick={() => handlePageChange(currentPage + 1)}
				/>
			</Pagination>
			<BackHomeButton />
		</div>
	);
};

export default SearchedByCategory;
