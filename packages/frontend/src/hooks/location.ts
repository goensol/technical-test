import type { City } from "@ensol-test/types/location";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type GeoApiResponse = {
	nom: string;
	code: string;
	centre: {
		coordinates: [number, number];
	};
};

export const useFetchCities = () => {
	const [search, setSearch] = useState("");
	const [debounced] = useDebouncedValue(search, 200);

	const [cities, setCities] = useState<City[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchCities = useCallback(async (query: string): Promise<void> => {
		setIsLoading(true);
		if (query.length < 3) setCities([]);

		try {
			const response = await axios.get<GeoApiResponse[]>(
				`https://geo.api.gouv.fr/communes?nom=${query}&fields=centre&boost=population&limit=5`,
			);
			const cities = response.data.map((city) => ({
				name: city.nom,
				code: city.code,
				coordinates: {
					lat: city.centre.coordinates[1],
					lng: city.centre.coordinates[0],
				},
			}));
			setCities(cities);
		} catch (error) {
			notifications.show({
				title: "Erreur lors de la recherche des communes",
				message: "Veuillez réessayer plus tard",
				color: "red",
			});
			console.error("Erreur lors de la recherche des communes:", error);
			setCities([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchCities(debounced);
		}, 300);

		return () => clearTimeout(timer);
	}, [debounced, fetchCities]);

	return { search, setSearch, isLoading, cities };
};
