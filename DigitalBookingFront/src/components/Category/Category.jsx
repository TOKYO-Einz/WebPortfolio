import "./Category.css";
import Card from "react-bootstrap/Card";
import { ProductsContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";

const Category = () => {
	const { products, categories } = useContext(ProductsContext);
	const navigate = useNavigate();

	return (
		<div className="categories-container">
			<h3 className="categories-container-titulo-principal">
				Buscar por tipo de instrumento
			</h3>

			<div className="categories-cards">
				{categories?.map((category) => (
					<div className="mt-3" key={category?.id}>
						<Card
							className="card-category"
							onClick={() => navigate(`/categoria/${category?.title}`)}
						>
							<Card.Body>
								<Card.Img
									variant="top"
									src={category?.imgUrl}
									className="img-category"
								/>
								<Card.Title>{category?.title}</Card.Title>
								<Card.Text>
									{
										products?.filter(
											(product) => product?.category?.title === category?.title
										).length
									}
									{""}{" "}
									{products?.filter(
										(product) => product?.category?.title === category?.title
									).length === 1
										? "instrumento"
										: "instrumentos"}
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>

			<div className="mobile-carousel">
				<Carousel bsPrefix={"carousel"}>
					{categories.map((category) => (
						<Carousel.Item
							key={category?.id}
							interval={5000}
							onClick={() => navigate(`/categoria/${category?.title}`)}
						>
							<div className="carousel-image-container">
								<img
									className="d-block w-100"
									src={category?.imgUrl}
									alt={category?.title}
								/>
							</div>
							<Carousel.Caption className="carousel-caption">
								<div className="title-category-carousel">
									<h3>{category?.title}</h3>
									<p>
										{
											products?.filter(
												(product) => product.category?.title === category?.title
											).length
										}{" "}
										{products?.filter(
											(product) => product.category?.title === category?.title
										).length === 1
											? "instrumento"
											: "instrumentos"}
									</p>
								</div>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Category;
