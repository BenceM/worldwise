import React, { useEffect } from "react";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) navigate("/");
	}, [isLoggedIn, navigate]);
	return isLoggedIn ? children : null;
}

export default ProtectedRoute;
