import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
function Map() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");
	return (
		<div className={styles.mapContainer} onClick={() => navigate("form")}>
			<h1>
				{lat}
				{lng}
			</h1>
			<button onClick={() => setSearchParams({ lat: 23, lng: 55 })}>
				change pos
			</button>
		</div>
	);
}

export default Map;
