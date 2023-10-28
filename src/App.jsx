import { useEffect, useState } from "react";
import {
	Navigate,
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
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
function App() {
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
					<Route index element={<Navigate replace to="cities" />} />
					<Route path="cities" element={<CityList />} />
					<Route path="cities/:id" element={<City />} />
					<Route path="countries" element={<CountryList />} />
					<Route path="form" element={<Form />} />
				</Route>
			</>,
		),
	);
	return (
		<CitiesProvider>
			<RouterProvider router={router} />;
		</CitiesProvider>
	);
}

export default App;
