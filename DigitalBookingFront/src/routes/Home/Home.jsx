import "./Home.css";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import HomeSearcher from "../../components/HomeSearcher/HomeSearcher";
import Category from "../../components/Category/Category";
import Recommendations from "../../components/Recommendations/Recommendations";
import SearchedByInput from "../../components/SearchedByInput/SearchedByInput";
import BrandsSearcher from "../../components/BrandsSearcher/BrandsSearcher";
import SearchedByBrand from "../../components/SearchedByBrand/SearchedByBrand";

const Home = () => {
	const [showSpinner, setShowSpinner] = useState(true);
	const [isSearchedByInput, setIsSearchByInput] = useState(false);
	const [isSearchedByBrand, setIsSearchByBrand] = useState(false);
	const [searchedInstrument, setSearchedInstrument] = useState();
	const [searchedBrand, setSearchedBrand] = useState("");

	useEffect(() => {
		setTimeout(() => {
			setShowSpinner(false);
		}, 2000);
	}, []);

	return (
		<div className="home">
			{showSpinner ? (
				<div className="spinner-home">
					<Spinner />
				</div>
			) : (
				<div className="home-container">
					{isSearchedByInput === false && isSearchedByBrand === false && (
						<>
							<BrandsSearcher
								searchedBrand={searchedBrand}
								setSearchedBrand={setSearchedBrand}
								setIsSearchByBrand={setIsSearchByBrand}
								setSearchedInstrument={setSearchedInstrument}
							/>
							<HomeSearcher
								searchedInstrument={searchedInstrument}
								setSearchedInstrument={setSearchedInstrument}
								setIsSearchByInput={setIsSearchByInput}
								setIsSearchByBrand={setIsSearchByBrand}
							/>

							<Category />
							<Recommendations />
						</>
					)}

					{isSearchedByInput === false && isSearchedByBrand === true && (
						<>
							<BrandsSearcher
								searchedBrand={searchedBrand}
								setSearchedBrand={setSearchedBrand}
								setIsSearchByBrand={setIsSearchByBrand}
								setSearchedInstrument={setSearchedInstrument}
							/>
							<SearchedByBrand
								searchedBrand={searchedBrand}
								setSearchedBrand={setSearchedBrand}
							/>
						</>
					)}

					{isSearchedByInput === true && isSearchedByBrand === false && (
						<>
							<HomeSearcher
								searchedInstrument={searchedInstrument}
								setSearchedInstrument={setSearchedInstrument}
								setIsSearchByInput={setIsSearchByInput}
								setIsSearchByBrand={setIsSearchByBrand}
							/>
							<SearchedByInput
								searchedInstrument={searchedInstrument}
								setIsSearchByInput={setIsSearchByInput}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
