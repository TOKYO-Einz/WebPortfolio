import { ProductsContext } from "../../utils/Context";
import { useState, useEffect } from "react";
import { useContext } from "react";
import InstrumentCard from "../InstrumentCard/InstrumentCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Recommendations.css";
import { Pagination } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import wings from "../../assets/wings.png";

const Recommendations = () => {
	const { products } = useContext(ProductsContext);
	const [randomProducts, setRandomProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	useEffect(() => {
		if (products && products.length) {
			setRandomProducts(getRandomProducts(products, products.length));
		}
	}, [products]);

	function getRandomProducts(array, count) {
		const shuffledArray = shuffleArray([...array]);
		return shuffledArray?.slice(0, count);
	}

	function shuffleArray(array) {
		const shuffledArray = [...array];
		for (let i = shuffledArray?.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
		return shuffledArray;
	}

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = randomProducts?.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(randomProducts?.length / productsPerPage);

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

	return (
		<div className="recommendations-container">
			<h3>Recomendados</h3>
			<div className="wings-container">
				<img src={wings} alt="alas" className="wings-image" />
			</div>

			<div className="recommendations-cards">
				{currentProducts?.map((product) => (
					<div key={product?.id}>
						<InstrumentCard product={product} />
					</div>
				))}
			</div>

			<div className="carousel-recommendations">
				<Carousel bsPrefix={"carousel"} variant={"dark"}>
					{currentProducts?.map((product) => (
						<Carousel.Item key={product?.id}>
							<div className="carousel-recommendations-card">
								<InstrumentCard
									product={product}
									className="carousel-recommendations-card"
								/>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</div>

			<div className="pagination-recommendations">
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
		</div>
	);
};

export default Recommendations;
