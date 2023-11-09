import { useEffect, useState, lazy, Suspense } from "react";
import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Layout from "./components/Layout";
// import Product from "./pages/Product";
// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./components/AppLayout";
// import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
//const Layout = lazy(() => import("./components/Layout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./components/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

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
				<Route
					path="/app"
					element={
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
					}
				>
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
		<AuthProvider>
			<CitiesProvider>
				<Suspense fallback={<SpinnerFullPage />}>
					<RouterProvider router={router} />;
				</Suspense>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
