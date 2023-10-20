import "./InstrumentDetailHeader.css";
import BackHomeButton from "../BackHomeButton/BackHomeButton";

const InstrumentDetailHeader = ({ product }) => {
	return (
		<div className="container-title">
			<div className="container-text">
				<div className="container-category-brand">
					<h5 className="detail-card-category">{product?.category?.title}</h5>
					{product?.brand?.image && (
						<img
							src={product?.brand?.image}
							alt="logo-marca"
							className={`brand-img-card ${
								product?.brand == "Steinway" ? "img-card-steinway" : ""
							}
						}`}
						/>
					)}
				</div>
				<h2 className="detail-card-product-name">{product?.name}</h2>
			</div>
			<div className="back-detail-header">
				<BackHomeButton isBackIcon={true} />
			</div>
		</div>
	);
};

export default InstrumentDetailHeader;
