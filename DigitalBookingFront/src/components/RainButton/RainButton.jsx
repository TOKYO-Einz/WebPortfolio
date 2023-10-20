import React, { useState, useEffect } from "react";
import "./RainButton.css";
import logo from "../../assets/logo_header.png";

const Note = ({ left, top }) => {
	return (
		<div className="note" style={{ left: `${left}px`, top: `${top}px` }}>
			{Math.random() < 0.5 ? "🎸" : "🎸"}
		</div>
	);
};

const RainButton = () => {
	const [isRaining, setIsRaining] = useState(false);
	const [notes, setNotes] = useState([]);

	const handleButtonClick = () => {
		setIsRaining((prevIsRaining) => !prevIsRaining);
	};

	useEffect(() => {
		let timeout;

		if (isRaining) {
			timeout = setTimeout(() => {
				setIsRaining(false);
			}, 7777);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [isRaining]);

	useEffect(() => {
		let interval;

		if (isRaining) {
			interval = setInterval(() => {
				createNote();
				createNote();
			}, 1000);
		}

		return () => {
			clearInterval(interval);
			setNotes([]);
		};
	}, [isRaining]);

	const createNote = () => {
		const xPosition = Math.random() * window.innerWidth;
		const yPosition = Math.random() * window.innerHeight;

		setNotes((prevNotes) => [
			...prevNotes,
			{ id: Date.now(), left: xPosition, top: yPosition },
		]);
	};

	return (
		<div>
			<div
				className={`rain-button ${isRaining ? "active" : ""}`}
				onClick={handleButtonClick}
			>
				<img src={logo} alt="Logo" />
			</div>
			{notes.map((note) => (
				<Note key={note.id} left={note.left} top={note.top} />
			))}
		</div>
	);
};

export default RainButton;
