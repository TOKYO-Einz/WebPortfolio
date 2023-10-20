import React from "react";
import "./AdminComponent.css";
import NavigationBarAdmin from "../NavigationBarAdmin/NavigationBarAdmin";
import AdminProductsSearcher from "../AdminProductsSearcher/AdminProductsSearcher";

const AdminComponent = () => {
	return (
		<div>
			<NavigationBarAdmin />
			<AdminProductsSearcher />
		</div>
	);
};

export default AdminComponent;
