import "./SearchedByBrand.css";
import { ProductsContext } from "../../utils/Context";
import { useContext, useEffect, useState } from "react";
import InstrumentCard from "../InstrumentCard/InstrumentCard";
import { Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

const SearchedByBrand = ({ searchedBrand, setIsSearchByBrand }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	const { products } = useContext(ProductsContext);

	useEffect(() => {
		const filteredProducts = products?.filter(
			(product) => product?.brand?.name == searchedBrand
		);
		setSearchResults(filteredProducts);
	}, [searchedBrand, products]);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(searchResults?.length / productsPerPage);

	const handleFirstPageClick = () => {
		paginate(1);
	};

	const handlePrevPageClick = () => {
		if (currentPage > 1) {
			paginate(currentPage - 1);
		}
	};

	const handleNextPageClick = () => {
		if (currentPage < totalPages) {
			paginate(currentPage + 1);
		}
	};

	const handleLastPageClick = () => {
		paginate(totalPages);
	};

	const location = useLocation();

	const handleReload = () => {
		window.location.reload();
		setIsSearchByBrand(false);
	};

	return (
		<div className="searched-by-input-container">
			<h2>Resultados de la búsqueda</h2>
			{searchResults?.length > 0 ? (
				<div className="searched-result-cards">
					{searchResults?.map((product) => (
						<div className="searched-result-card-div" key={product?.id}>
							<InstrumentCard product={product} />
						</div>
					))}
				</div>
			) : (
				<h5 className="empty-results-message">
					No se han encontrado resultados, intente buscar nuevamente
				</h5>
			)}
			{searchResults?.length > 0 && (
				<div className="pagination">
					<Pagination className="mt-3 pagination">
						<Pagination.First
							onClick={handleFirstPageClick}
							disabled={currentPage === 1}
						/>
						<Pagination.Prev
							onClick={handlePrevPageClick}
							disabled={currentPage === 1}
						/>
						{Array(totalPages)
							.fill()
							.map((_, index) => (
								<Pagination.Item
									key={index + 1}
									active={index + 1 === currentPage}
									onClick={() => paginate(index + 1)}
								>
									{index + 1}
								</Pagination.Item>
							))}

						<Pagination.Next
							onClick={handleNextPageClick}
							disabled={currentPage === totalPages}
						/>
						<Pagination.Last
							onClick={handleLastPageClick}
							disabled={currentPage === totalPages}
						/>
					</Pagination>
				</div>
			)}
			<Button onClick={handleReload} className="button-volver">
				Volver
			</Button>
		</div>
	);
};

export default SearchedByBrand;
