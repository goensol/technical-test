import { Stack } from "@mantine/core";
import type { LatLng } from "leaflet";
import { CoordinatesDisplay } from "./CoordinatesDisplay";
import { MapCoordinatesSelector } from "./MapCoordinatesSelector";

type Props = {
	position: LatLng;
	setPosition: (position: LatLng) => void;
};
export const CoordinatesPicker = ({ position, setPosition }: Props) => {
	return (
		<Stack gap="md" h={536}>
			<MapCoordinatesSelector position={position} setPosition={setPosition} />
			<CoordinatesDisplay position={position} />
		</Stack>
	);
};
