import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

const ProtectedRoutes = () => {
	const { data } = useContext(AuthContext);

	if (data.user.role !== "ADMIN") {
		return <Navigate to="/" />;
	}
	return <Outlet />;
};

export default ProtectedRoutes;
