import { NumberInput, SimpleGrid } from "@mantine/core";
import type { LatLng } from "leaflet";

type Props = {
	position: LatLng;
};
export const CoordinatesDisplay = ({ position }: Props) => {
	const { lat, lng } = position;
	return (
		<SimpleGrid cols={2}>
			<NumberInput
				value={lat}
				label="Latitude"
				suffix="°"
				disabled
				hideControls
				min={-90}
				max={90}
				decimalScale={6}
			/>
			<NumberInput
				value={lng}
				label="Longitude"
				suffix="°"
				disabled
				hideControls
				min={-90}
				max={90}
				decimalScale={6}
			/>
		</SimpleGrid>
	);
};
