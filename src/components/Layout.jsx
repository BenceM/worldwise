import React from "react";
import { Outlet } from "react-router-dom";
import PageNav from "./PageNav";
function Layout() {
	return (
		<div className="site-wrapper">
			{/* <Header /> */}

			<main>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</div>
	);
}

export default Layout;
