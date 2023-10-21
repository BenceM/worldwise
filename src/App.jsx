import { useState } from "react";
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
					<Route index element={<CityList />} />
					<Route path="cities" element={<p>cities</p>} />
					<Route path="countries" element={<p>countries</p>} />
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
