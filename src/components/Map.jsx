import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
	const { cities } = useCities();

	const [position, setPosition] = useState([40, 0]);
	const [lat, lng] = useUrlPosition();
	const {
		isLoading: isLoadingPosition,
		getPosition,
		mapPosition: geoPosition,
	} = useGeolocation();

	useEffect(() => {
		if (lat && lng) setPosition([lat, lng]);
	}, [lat, lng]);

	useEffect(() => {
		if (geoPosition) setPosition([geoPosition.lat, geoPosition.lng]);
	}, [geoPosition]);
	return (
		<div className={styles.mapContainer}>
			{!geoPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your position"}
				</Button>
			)}
			<MapContainer
				center={position}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker position={city.position} key={city.id}>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={position} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}
function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}
export default Map;
