import { useEffect, useState } from "react";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

const URL = "http://localhost:8000";
function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<Layout />}>
					<Route path="pricing" element={<Pricing />} />
					<Route path="product" element={<Product />} />
					<Route path="login" element={<Login />} />

					<Route index element={<HomePage />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
				,
				<Route path="/app" element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path="cities"
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path="countries"
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="form" element={<p>Form</p>} />
				</Route>
				,
			</>,
		),
	);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
