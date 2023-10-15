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
function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route path="pricing" element={<Pricing />} />
				<Route path="product" element={<Product />} />
				<Route index element={<HomePage />} />
				<Route path="*" element={<PageNotFound />} />
			</Route>,
		),
	);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
