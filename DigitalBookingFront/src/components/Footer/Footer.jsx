import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faTwitter,
	faPinterest,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ShareButton from "../ShareButton/ShareButton";
import RainButton from "../RainButton/RainButton";

const Footer = () => {
	return (
		<footer>
			<div className="logo-footer">
				<RainButton />
				<p>©2023 - Todos los derechos reservados</p>
			</div>
			<div className="redes-sociales">
				<FontAwesomeIcon className="icon" icon={faFacebook} />
				<FontAwesomeIcon className="icon" icon={faInstagram} />
				<FontAwesomeIcon className="icon" icon={faTwitter} />
				<FontAwesomeIcon className="icon" icon={faPinterest} />
				<FontAwesomeIcon className="icon" icon={faYoutube} />
				<div className="share-logo">
					<ShareButton
						defaultMessage={"Encontré este sitio que podría interesarte: "}
						url={"http://g2c5-frontnode.s3-website.us-east-2.amazonaws.com"}
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
