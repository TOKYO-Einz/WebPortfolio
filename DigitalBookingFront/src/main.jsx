import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./routes/Home/Home";
import Details from "./routes/Details/Details";
import NotFound from "./routes/NotFound/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsContextProvider from "./utils/Context";
import SearchedByCategory from "./components/SearchedByCategory/SearchedByCategory";
import Admin from "./routes/Admin/Admin";
import UserLogin from "./routes/UserLogin/UserLogin";
import Favoritos from "./routes/Favoritos/Favoritos";
import CreateAccount from "./routes/CreateAccount/CreateAccount";
import UserProfile from "./components/UserProfile/UserProfile";
import Reservar from "./routes/Reservar/Reservar";
import AuthContextProvider from "./utils/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes/ProtectedRoutes";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import AdminProductsSearcher from "./components/AdminProductsSearcher/AdminProductsSearcher";
import AddCategoryForm from "./components/AddCategoryForm/AddCategoryForm";
import DeleteCategoryForm from "./components/DeleteCategoryForm/DeleteCategoryForm";
import RoleManagement from "./components/RoleManagement/RoleManagement";
import BranchManagement from "./components/BranchManagement/BranchManagement";
import EditProductForm from "./components/EditProductForm/EditProductForm";
import AddBranchForm from "./components/AddBranchForm/AddBranchForm";
import EditBranchForm from "./components/EditBranchForm/EditBranchForm";
import AddBrandForm from "./components/AddBrandForm/AddBrandForm";
import DeleteBrandForm from "./components/DeleteBrandForm/DeleteBrandForm";
import UserReservations from "./components/UserReservations/UserReservations";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthContextProvider>
			<ProductsContextProvider>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="/home" element={<Home />} />
						<Route path="/producto/:id" element={<Details />} />
						<Route path="/categoria/:name" element={<SearchedByCategory />} />
						<Route path="/user/crear-cuenta" element={<CreateAccount />} />
						<Route path="/user/login" element={<UserLogin />} />
						<Route element={<ProtectedRoutes />}>
							<Route path="/admin/" element={<Admin />} />
							<Route
								path="/admin/agregar-producto"
								element={<AddProductForm />}
							/>
							<Route
								path="/admin/buscar-producto"
								element={<AdminProductsSearcher />}
							/>
							<Route
								path="/admin/editar-producto/:id"
								element={<EditProductForm />}
							/>
							<Route
								path="/admin/agregar-categoria"
								element={<AddCategoryForm />}
							/>
							<Route
								path="/admin/eliminar-categoria"
								element={<DeleteCategoryForm />}
							/>
							<Route path="/admin/agregar-marca" element={<AddBrandForm />} />
							<Route
								path="/admin/eliminar-marca"
								element={<DeleteBrandForm />}
							/>
							<Route
								path="/admin/gestionar-roles"
								element={<RoleManagement />}
							/>
							<Route
								path="/admin/gestionar-sucursales"
								element={<BranchManagement />}
							/>
							<Route
								path="/admin/agregar-sucursal"
								element={<AddBranchForm />}
							/>
							<Route
								path="/admin/editar-sucursal/:id"
								element={<EditBranchForm />}
							/>
						</Route>
						<Route path="/favoritos" element={<Favoritos />} />
						<Route path="/perfil" element={<UserProfile />} />
						<Route path="/mis-reservas" element={<UserReservations />} />
						<Route path="/reservar/:id" element={<Reservar />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</ProductsContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
);
