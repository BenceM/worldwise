import React from "react";
import { Outlet } from "react-router-dom";
function Layout() {
	return (
		<div className="site-wrapper">
			{/* <Header /> */}
			<header>
				<h1>Allo</h1>
			</header>
			<main>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</div>
	);
}

export default Layout;
