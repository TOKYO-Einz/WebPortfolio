import InstrumentCard from "../../components/InstrumentCard/InstrumentCard";
import { ProductsContext } from "../../utils/Context";
import { useContext } from "react";
import "./Favoritos.css";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import BackHomeButton from "../../components/BackHomeButton/BackHomeButton";

const Favoritos = () => {
	const { favsState, removeFavoriteInstrument, removeAllInstruments } =
		useContext(ProductsContext);

	return (
		<>
			<section className="favoritos-container">
				<ToastContainer />
				<h1 className="mt-4">Instrumentos Favoritos</h1>
				<div>
					{favsState?.favoriteInstruments?.length > 0 ? (
						<div className="d-flex flex-column align-items-center">
							<Button
								className="button remover-todos"
								onClick={() => removeAllInstruments()}
							>
								Remover todos los favoritos
							</Button>
							<div className="favoritos-card-container">
								{favsState?.favoriteInstruments?.map((instrument) => (
									<div key={instrument?.id} className="favoritos-card">
										<InstrumentCard {...instrument} product={instrument} />
										<Button
											onClick={() => removeFavoriteInstrument(instrument)}
											className="button btn-remover-favorito"
										>
											Remover
										</Button>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="div-sin-favoritos">
							<h3 className="p-2">Aún no se han agregado favoritos</h3>
							<BackHomeButton />
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Favoritos;
