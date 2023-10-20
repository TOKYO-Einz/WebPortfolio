import React, { useState, useEffect } from "react";
import "./LoadingBar.css";

const LoadingBar = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress === 100) {
					clearInterval(interval);
					return prevProgress;
				} else {
					return prevProgress + 1;
				}
			});
		}, 20);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="loading-overlay">
			<div className="loading-bar-container">
				<div className="loading-bar" style={{ width: `${progress}%` }}>
					<div className="progress-text">{progress}%</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingBar;
