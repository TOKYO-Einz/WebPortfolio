import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./BackHomeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
<FontAwesomeIcon icon={faChevronLeft} />;

const BackHomeButton = ({ isBackIcon }) => {
	const navigate = useNavigate();

	return (
		<div>
			{!isBackIcon ? (
				<Button className="back-home-button" onClick={() => navigate("/home")}>
					Volver
				</Button>
			) : (
				isBackIcon && (
					<Button
						className="back-home-button-icon"
						onClick={() => navigate("/home")}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</Button>
				)
			)}
		</div>
	);
};

export default BackHomeButton;
