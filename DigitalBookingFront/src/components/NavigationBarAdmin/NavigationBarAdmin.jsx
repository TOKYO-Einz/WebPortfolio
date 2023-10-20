import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import BackHomeButton from "../BackHomeButton/BackHomeButton";
import "./NavigationBarAdmin.css";

const NavigationBarAdmin = () => {
	const location = useLocation();

	return (
		<div>
			<Navbar
				collapseOnSelect
				expand="lg"
				bg="dark"
				variant="dark"
				className="navbar-admin d-flex"
			>
				<Container className="navbar-admin-container d-flex justify-content-between">
					<Navbar.Brand as={Link} to="/admin" className="panel-admin-title">
						Panel de Administración
					</Navbar.Brand>
					<div>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse
							id="responsive-navbar-nav admin-opciones"
							className="admin-opciones"
						>
							<Nav>
								<Nav.Link
									as={Link}
									to="/admin/agregar-producto"
									className={
										location.pathname === "/admin/agregar-producto"
											? "active"
											: ""
									}
								>
									Agregar instrumento
								</Nav.Link>

								<NavDropdown
									title="Categorías"
									id="collasible-nav-dropdown"
									className={
										location.pathname === "/admin/agregar-categoria" ||
										location.pathname === "/admin/eliminar-categoria"
											? "active"
											: ""
									}
								>
									<NavDropdown.Item as={Link} to="/admin/agregar-categoria">
										Agregar categoría
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/admin/eliminar-categoria">
										Eliminar categoría
									</NavDropdown.Item>
								</NavDropdown>

								<NavDropdown
									title="Marcas"
									id="collasible-nav-dropdown"
									className={
										location.pathname === "/admin/agregar-marca" ||
										location.pathname === "/admin/eliminar-marca"
											? "active"
											: ""
									}
								>
									<NavDropdown.Item as={Link} to="/admin/agregar-marca">
										Agregar marca
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/admin/eliminar-marca">
										Eliminar marca
									</NavDropdown.Item>
								</NavDropdown>

								<NavDropdown
									title="Sucursales"
									id="collasible-nav-dropdown"
									className={
										location.pathname === "/admin/gestionar-sucursales" ||
										location.pathname === "/admin/agregar-sucursal"
											? "active"
											: ""
									}
								>
									<NavDropdown.Item as={Link} to="/admin/agregar-sucursal">
										Agregar sucursal
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/admin/gestionar-sucursales">
										Gestionar sucursales
									</NavDropdown.Item>
								</NavDropdown>

								<Nav.Link
									as={Link}
									to="/admin/gestionar-roles"
									className={
										location.pathname === "/admin/gestionar-roles"
											? "active"
											: ""
									}
								>
									Gestionar roles
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</div>
					<div className="navigation-back">
						<BackHomeButton isBackIcon={true} />
					</div>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavigationBarAdmin;
