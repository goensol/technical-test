import { useFetchCities } from "@ensol-test/frontend/hooks/location";
import type { City } from "@ensol-test/types/location";
import { Combobox, Input, InputBase, Loader, useCombobox } from "@mantine/core";
import { LatLng } from "leaflet";
import { useState } from "react";

type Props = {
	setPosition: (position: LatLng) => void;
};

export const CitySearch = ({ setPosition }: Props) => {
	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const {
		search,
		setSearch,
		isLoading: isCitySearchLoading,
		cities,
	} = useFetchCities();

	const combobox = useCombobox({
		onDropdownClose: () => {
			combobox.resetSelectedOption();
			combobox.focusTarget();
			setSearch("");
		},

		onDropdownOpen: () => {
			combobox.focusSearchInput();
		},
	});

	const options = cities.map((city) => (
		<Combobox.Option value={city.code} key={city.code}>
			{city.name} ({city.code})
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {
				const city = cities.find((city) => city.code === val) ?? null;
				setSelectedCity(city);
				if (city) {
					setPosition(new LatLng(city.coordinates.lat, city.coordinates.lng));
				}
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					rightSection={<Combobox.Chevron />}
					rightSectionPointerEvents="none"
					onClick={() => combobox.toggleDropdown()}
				>
					{selectedCity?.name || (
						<Input.Placeholder>Chercher une ville</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown style={{ zIndex: 1000 }}>
				<Combobox.Search
					value={search}
					onChange={(event) => setSearch(event.currentTarget.value)}
					placeholder="Sélectionner votre commune"
				/>
				<Combobox.Options>
					{isCitySearchLoading ? (
						<Combobox.Options>
							<Combobox.Empty>
								<Loader size="sm" />
							</Combobox.Empty>
						</Combobox.Options>
					) : options.length > 0 ? (
						options
					) : (
						<Combobox.Options>
							<Combobox.Empty>Aucune ville trouvée</Combobox.Empty>
						</Combobox.Options>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};
