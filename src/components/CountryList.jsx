import React from "react";

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountriesList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message="Add your first city by clicking on the map" />;

	// const countriesSet = new Set(cities.map((city) => city.country));
	// const countries = [...countriesSet];
	const countries = cities.reduce((acc, cur) => {
		if (!acc.map((el) => el.country).includes(cur.country))
			return [...acc, { country: cur.country, emoji: cur.emoji, id: cur.id }];
		else return acc;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.id} />
			))}
		</ul>
	);
}

export default CountriesList;
