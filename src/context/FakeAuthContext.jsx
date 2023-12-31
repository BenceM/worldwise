import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
	isLoggedIn: false,
	user: null,
};

const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isLoggedIn: true };
		case "logout":
			return { ...state, user: null, isLoggedIn: false };
		default:
			throw new Error("Unknown action");
	}
}
function AuthProvider({ children }) {
	const [{ isLoggedIn, user }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		}
	}
	function logout() {
		dispatch({ type: "logout" });
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("Context was used outside the provider");
	return context;
}

export { AuthProvider, useAuth };
