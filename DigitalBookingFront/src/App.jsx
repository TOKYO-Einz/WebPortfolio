import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./utils/ScrollToTop.jsx";

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		location.pathname === "/" && navigate("/home");
		localStorage.getItem("login");
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [location.pathname]);

	return (
		<div className="App">
			<Header />
			<ScrollToTop />
			<Outlet className="outlet-comp" />
			<Footer />
		</div>
	);
}

export default App;
