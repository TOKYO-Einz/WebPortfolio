import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import "./ShareButton.css";

const ShareButton = ({ url, defaultMessage }) => {
	const [showModal, setShowModal] = useState(false);
	const [customMessage, setCustomMessage] = useState(defaultMessage);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const shareOnFacebook = () => {
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			url
		)}&quote=${encodeURIComponent(customMessage)}`;
		window.open(facebookUrl, "_blank");
	};

	const shareOnTwitter = () => {
		const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
			url
		)}&text=${encodeURIComponent(customMessage)}`;
		window.open(twitterUrl, "_blank");
	};

	const shareOnWhatsApp = () => {
		const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
			`${customMessage} ${url}`
		)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className="share-button">
			<Button className="share-button-icon" onClick={openModal}>
				<FontAwesomeIcon icon={faShareNodes} className="share-icon" />
			</Button>
			<Modal
				show={showModal}
				onHide={closeModal}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header className="modal-share-header" closeButton>
					<Modal.Title className="modal-share-title">
						Compartir en redes
					</Modal.Title>
				</Modal.Header>

				<Modal.Footer className="modal-redes-footer">
					<Button className="share-button-icon redes" onClick={shareOnFacebook}>
						<FontAwesomeIcon
							icon={faFacebook}
							className="mr-2 icon-modal-redes facebook"
						/>
					</Button>
					<Button className="share-button-icon redes" onClick={shareOnTwitter}>
						<FontAwesomeIcon
							icon={faTwitter}
							className="mr-2  icon-modal-redes twitter"
						/>
					</Button>
					<Button className="share-button-icon redes" onClick={shareOnWhatsApp}>
						<FontAwesomeIcon
							icon={faWhatsapp}
							className="mr-2  icon-modal-redes whatsapp"
						/>
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ShareButton;
