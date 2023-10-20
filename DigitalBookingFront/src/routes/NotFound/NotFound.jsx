import logo from "../../assets/logo_404.png";
import "./NotFound.css";
import BackHomeButton from "../../components/BackHomeButton/BackHomeButton";

const NotFound = () => {
	return (
		<div className="not-found-container">
			<h3 className="error-text">Mmm... algo no suena bien</h3>
			<img src={logo} alt="logo" className="logo-not-found" />
			<h3 className="error-text second">Error 404 - Recurso no encontrado</h3>
			<BackHomeButton className="button-not-found" />
		</div>
	);
};

export default NotFound;
