import { useState, useEffect } from "react";
import { ProductsContext } from "../../utils/Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import "./InstrumentDetailCard.css";
import Carousel from "react-bootstrap/Carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import InstrumentDetailHeader from "../InstrumentDetailHeader/InstrumentDetailHeader";
import InstrumentDetailSubHeader from "../InstrumentDetailSubHeader/InstrumentDetailSubHeader";
import Policies from "../Policies/Policies";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import Map from "../Map/Map";
import { AuthContext } from "../../utils/AuthContext";

const InstrumentDetailCard = () => {
	const [product, setProduct] = useState(null);
	const { products, getFeatureIcon } = useContext(ProductsContext);
	const { setLoginError } = useContext(AuthContext);

	const params = useParams();
	const idParam = parseInt(params.id);

	const [login, setLogin] = useState("");

	useEffect(() => {
		setLogin(localStorage.getItem("login"));
	}, []);

	const handleLoginError = () => {
		setLoginError(true);
	};

	const retiro = localStorage.getItem("fechaRetiro");
	const devolucion = localStorage.getItem("fechaDevolucion");

	const productFiltered = products?.filter((product) => product.id === idParam);

	const [showImagesGallery, setShowImagesGallery] = useState(false);
	const [showImagesContainer, setShowImagesContainer] = useState(true);

	useEffect(() => {
		if (productFiltered?.length > 0) {
			setProduct(productFiltered[0]);
		}
	}, [productFiltered]);

	const images = [
		{
			original: `${product ? product.images[0]?.url : ""}`,
			thumbnail: `${product ? product.images[0]?.url : ""}`,
			originalHeight: "300rem",
		},
		{
			original: `${product ? product.images[1]?.url : ""}`,
			thumbnail: `${product ? product.images[1]?.url : ""}`,
			originalHeight: "300rem",
		},
		{
			original: `${product ? product.images[2]?.url : ""}`,
			thumbnail: `${product ? product.images[2]?.url : ""}`,
			originalHeight: "300rem",
		},
		{
			original: `${product ? product.images[3]?.url : ""}`,
			thumbnail: `${product ? product.images[3]?.url : ""}`,
			originalHeight: "300rem",
		},
		{
			original: `${product ? product.images[4]?.url : ""}`,
			thumbnail: `${product ? product.images[4]?.url : ""}`,
			originalHeight: "300rem",
		},
	];

	const productFeatures =
		productFiltered?.length > 0 ? productFiltered[0].features : [];

	const handleClickOnImage = () => {
		setShowImagesGallery(!showImagesGallery);
		setShowImagesContainer(!showImagesContainer);
	};

	const renderCustomControls = () => {
		return (
			<Button
				className="close-gallery-button"
				variant="secondary"
				onClick={closeGallery}
			>
				Cerrar
			</Button>
		);
	};

	const closeGallery = () => {
		setShowImagesGallery(false);
		setShowImagesContainer(true);
	};

	

	return (
		product && (
			<div className="detail-card-container">
				<InstrumentDetailHeader product={product} />
				<InstrumentDetailSubHeader product={product} />
				{showImagesContainer && (
					<div className="container-images">
						<div className="big-image">
							<img
								src={product?.images[0]?.url}
								alt=""
								className="image1"
								onClick={handleClickOnImage}
							/>
						</div>
						<div className="medium-image1">
							<img
								src={product?.images[1]?.url}
								alt=""
								className="image2"
								onClick={handleClickOnImage}
							/>
							<img
								src={product?.images[2]?.url}
								alt=""
								className="image3"
								onClick={handleClickOnImage}
							/>
						</div>
						<div className="medium-image2">
							<img
								src={product?.images[3]?.url}
								alt=""
								className="image4"
								onClick={handleClickOnImage}
							/>
							<img
								src={product?.images[4]?.url}
								alt=""
								className="image5"
								onClick={handleClickOnImage}
							/>
						</div>
					</div>
				)}

				{showImagesGallery && (
					<div className="gallery-container-images">
						<ImageGallery
							className="image-gallery"
							items={images}
							infinite={true}
							showFullscreenButton={false}
							showPlayButton={false}
							showIndex={true}
							renderCustomControls={renderCustomControls}
							useTranslate3D={true}
						/>
					</div>
				)}

				<div className="carousel-container">
					<Carousel variant={"dark"} className="carousel-product-detail">
						<Carousel.Item className="img-carousel-product-detail">
							<img src={product?.images[0]?.url} alt="First slide" />
						</Carousel.Item>
						<Carousel.Item className="img-carousel-product-detail">
							<img src={product?.images[1]?.url} alt="Second slide" />
						</Carousel.Item>
						<Carousel.Item className="img-carousel-product-detail">
							<img src={product?.images[2]?.url} alt="Third slide" />
						</Carousel.Item>
						<Carousel.Item className="img-carousel-product-detail">
							<img src={product?.images[3]?.url} alt="Fourth slide" />
						</Carousel.Item>
						<Carousel.Item className="img-carousel-product-detail">
							<img src={product?.images[4]?.url} alt="Fifth slide" />
						</Carousel.Item>
					</Carousel>
				</div>

				<div className="container-body">
					<h3>LLevá tu performance a otro nivel</h3>
					<p>{product.description}</p>
				</div>

				<div className="container-caracteristicas-list">
					<h3>Características</h3>
					<div className="features-div">
						{productFeatures.map((feature) => (
							<div key={feature.id} className="feature-div">
								{getFeatureIcon(feature.icon)}
								<span>{feature.name}</span>
							</div>
						))}
					</div>
				</div>
				<hr />

				<div className="calendar-and-map-container">
					<div className="calendar-component-detail">
						<h3>Fechas disponibles</h3>
						<CalendarComponent
							onDatesSelected={() => {}}
							isInputCalendar={false}
							productId={product?.id}
						/>
					</div>

					<div className="map-detail">
						<h3>Ubicación</h3>
						<Map product={product} />
					</div>
				</div>

				<div className="politicas-detail">
					<Policies />
				</div>

				{login == "USER" && (
					<Link to={`/reservar/${product.id}`} className="link">
						<Button className="btn-reservar">Reservar</Button>
					</Link>
				)}
				{login !== "USER" && login !== "ADMIN" && (
					<Link to={"/user/login"} className="link">
						<Button className="btn-reservar" onClick={handleLoginError}>
							Reservar
						</Button>
					</Link>
				)}
			</div>
		)
	);
};

export default InstrumentDetailCard;
