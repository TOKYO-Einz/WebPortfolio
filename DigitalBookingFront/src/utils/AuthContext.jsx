import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const AuthContext = createContext("");

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || {},
	accessToken: localStorage.getItem("token") || "",
	login: localStorage.getItem("login") || "",
};

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			localStorage.setItem("token", action.payload.accessToken);

			localStorage.setItem("login", action.payload.user.role);
			return {
				...state,
				user: action.payload.user,
				accessToken: action.payload.accessToken,
			};
		case "LOGOUT":
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("login");
			localStorage.removeItem("fechaRetiro");
			localStorage.removeItem("fechaDevolucion");
			return {
				...state,
				user: {},
				accessToken: "",
			};

		default:
			return state;
	}
};

const AuthContextProvider = ({ children }) => {
	const [loginError, setLoginError] = useState(false);

	const [state, dispatch] = useReducer(authReducer, initialState);

	const data = {
		dispatch,
		user: state.user,
		token: state.accessToken,
		login: state.login,
	};

	const url = "http://ec2-3-20-223-217.us-east-2.compute.amazonaws.com:8819";

	const token = localStorage.getItem("token");

	const [usersList, setUsersList] = useState([]);

	const logInUser = async (payload) => {
		try {
			const response = await axios.post(`${url}/api/login`, payload, {});
			return response;
		} catch (error) {
			console.error("Error logging user:", error);
		}
	};

	const getUsers = async () => {
		if (token) {
			try {
				const response = await axios.get(`${url}/users/list?page=0&size=100`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data.content;
				setUsersList(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		}
	};

	const getUserById = async (id) => {
		if (token) {
			try {
				const response = await axios.get(`${url}/users/search/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				return response.data;
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		}
	};

	const createUser = async (payload) => {
		try {
			const response = await axios.post(`${url}/users/create`, payload);

			return response;
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	const crearCuenta = async (payload) => {
		try {
			const response = await axios.post(`${url}/api/sign-up`, payload, {});
			return response;
		} catch (error) {
			console.error("Error al crear la cuenta:", error);
		}
	};

	const editUser = async (payload) => {
		try {
			const response = await axios.put(
				`${url}/users/edit/${payload.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (error) {
			console.error("Error editing user: ", error);
		}
	};

	const postLocation = async (payload) => {
		try {
			const response = await axios.post(`${url}/locations/create`, payload, {});
			return response;
		} catch (error) {
			console.error("Error al crear la locación:", error);
		}
	};

	const getLocationById = async (id) => {
		try {
			const response = await axios.get(`${url}/locations/search/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch (error) {
			console.error("Error fetching location:", error);
		}
	};

	const editLocation = async (payload) => {
		try {
			const response = await axios.put(
				`${url}/locations/edit/${payload.id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (error) {
			console.error("Error editing user: ", error);
		}
	};

	const [isPersonalDataValid, setIsPersonalDataValid] = useState(false);

	const validatePersonalData = async (personalData) => {
		try {
			(await personalData) === true
				? setIsPersonalDataValid(true)
				: setIsPersonalDataValid(false);
		} catch (error) {
			console.error("Error validating data: ", error);
		}
	};

	useEffect(() => {
		getUsers();
		validatePersonalData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				dispatch,
				data,
				logInUser,
				crearCuenta,
				usersList,
				getUsers,
				editUser,
				createUser,
				loginError,
				setLoginError,
				getUserById,
				postLocation,
				getLocationById,
				editLocation,
				validatePersonalData,
				isPersonalDataValid,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
