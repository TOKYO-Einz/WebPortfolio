import image from "../../assets/logo_spinner.png";
import "./Spinner.css";

const Spinner = () => {
	return (
		<div className="spinner-container">
			<img src={image} alt="spinner" className="spinner" />
		</div>
	);
};

export default Spinner;
