import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000";

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});
	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert("some Error");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert("some Error");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				currentCity,
				isLoading,
				getCity,
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
