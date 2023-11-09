import {
	createContext,
	useState,
	useEffect,
	useContext,
	useReducer,
	useCallback,
} from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000";
const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error("Wrong action type");
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});
	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading data",
				});
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async function getCity(id) {
			if (Number(id) === currentCity.id) return;
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${URL}/cities/${id}`);
				const data = await res.json();
				dispatch({ type: "city/loaded", payload: data });
			} catch {
				dispatch({ type: "rejected", payload: "Couldn't fetch city" });
			}
		},
		[currentCity.id],
	);

	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${URL}/cities/`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "Couldn't add city" });
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({ type: "rejected", payload: "Couldn't delete city" });
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				currentCity,
				isLoading,
				getCity,
				createCity,
				deleteCity,
				error,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}
function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("Out of scope");
	return context;
}

export { useCities, CitiesProvider };
