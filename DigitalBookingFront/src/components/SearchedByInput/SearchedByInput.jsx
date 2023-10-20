import "./SearchedByInput.css";
import { ProductsContext } from "../../utils/Context";
import { useContext, useEffect, useState } from "react";
import InstrumentCard from "../InstrumentCard/InstrumentCard";
import { Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { DateObject } from "react-multi-date-picker";

const SearchedByInput = ({ searchedInstrument, setIsSearchByInput }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	const productsPerPage = 10;

	const { products, getReservationByProduct } = useContext(ProductsContext);

	const [productsToBeExcluded, setProductsToBeExcluded] = useState([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	const getDisabledDates = async (id) => {
		if (id) {
			try {
				const response = await getReservationByProduct(id);
				const reservationsArray = response.data;
				const disabledDatesArray = reservationsArray.map((reservation) => {
					const startDateSplit = reservation.startDay.split("/");
					const startDateString = `${startDateSplit[2]}/${startDateSplit[1]}/${startDateSplit[0]}`;
					const startDate = new DateObject(startDateString).format();

					const endDateSplit = reservation.endDay.split("/");
					const endDateString = `${endDateSplit[2]}/${endDateSplit[1]}/${endDateSplit[0]}`;
					const endDate = new DateObject(endDateString).format();

					// return [startDate, endDate];
					if (
						(startSelected <= startDate && endSelected >= endDate) ||
						(startSelected <= startDate &&
							endSelected >= startDate &&
							endSelected <= endDate) ||
						(startSelected >= startDate &&
							startSelected <= endDate &&
							endSelected >= endDate)
					) {
						setProductsToBeExcluded(id);
					}
				});
			} catch (error) {
				console.error("No se encontraron reservas input");
			}
		}
	};

	useEffect(() => {
		getDisabledDates();
	}, [searchedInstrument]);

	const fechaRetiro = JSON.parse(localStorage.getItem("fechaRetiro"));
	const fechaRetiroSplitted = fechaRetiro.split("/");
	const startSelected = `${fechaRetiroSplitted[2]}/${fechaRetiroSplitted[1]}/${fechaRetiroSplitted[0]}`;
	const fechaDevolucion = JSON.parse(localStorage.getItem("fechaDevolucion"));
	const fechaDevolucionSplitted = fechaDevolucion.split("/");
	const endSelected = `${fechaDevolucionSplitted[2]}/${fechaDevolucionSplitted[1]}/${fechaDevolucionSplitted[0]}`;

	useEffect(() => {
		if (searchedInstrument) {
			const searchedInstr = searchedInstrument
				? searchedInstrument.toLowerCase()
				: null;
			const filteredProducts = products.filter((product) =>
				product.name?.toLowerCase().includes(searchedInstr)
			);

			const arrayIds = filteredProducts?.map((product) => product.id);

			arrayIds?.forEach((id) => getDisabledDates(id));

			const finalFiltered = filteredProducts.filter(
				(product) => product.id != productsToBeExcluded
			);

			setSearchResults(finalFiltered);
		} else {
			setSearchResults([]);
		}
	}, [productsToBeExcluded, searchedInstrument]);

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

	const handleReload = () => {
		setIsSearchByInput(false);
	};

	return (
		<div className="searched-by-input-container">
			<h2>Resultados de la búsqueda</h2>
			{searchResults?.length > 0 ? (
				<div className="searched-result-cards">
					{loading
						? Array.from({ length: 3 }).map((_, index) => (
								<div className="card-skeleton-search-input">
									<InstrumentCard key={index} loading={true} />
								</div>
						  ))
						: searchResults?.map((product) => (
								<div className="searched-result-card-div" key={product.id}>
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

export default SearchedByInput;
