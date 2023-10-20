import React from "react";
import "./BrandsSearcher.css";
import Carousel from "react-bootstrap/Carousel";
import { ProductsContext } from "../../utils/Context";
import { useContext } from "react";

const BrandsSearcher = ({
	setIsSearchByBrand,
	setSearchedBrand,
	setSearchedInstrument,
}) => {
	const { brands } = useContext(ProductsContext);

	const handleSetBrand = (brand) => {
		setSearchedBrand(brand);
		setIsSearchByBrand(true);
		setSearchedInstrument(false);
	};

	return (
		<div className="brands-searcher">
			<div className=" brands-searcher-container searcher">
				{brands.map((brand) => (
					<div
						key={brand?.id}
						className={`brand-img brand-img-${brand?.name}`}
						onClick={() => handleSetBrand(brand?.name)}
					>
						<img
							src={brand?.image}
							alt={brand?.name}
							className={brand?.name?.toLowerCase()}
						/>
					</div>
				))}
			</div>
			<div className="carousel-brands-container">
				<Carousel
					interval={5000}
					variant="light"
					indicators={true}
					controls={false}
					className="carousel-brands-div"
				>
					{brands.map((brand) => (
						<Carousel.Item
							key={brand.id}
							onClick={() => handleSetBrand(brand?.name)}
							className="carousel-brand-item"
						>
							<img
								src={brand?.image}
								alt={brand?.name}
								className="carousel-brand-adjust"
							/>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default BrandsSearcher;
