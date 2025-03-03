import type { LatLng } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";

export const MapEvents = ({
	setPosition,
}: { setPosition: (position: LatLng) => void }) => {
	const map = useMap();

	useMapEvents({
		click(event) {
			const newPosition = event.latlng;
			setPosition(newPosition);
			map.panTo(newPosition, {
				animate: true,
				duration: 0.5,
			});
		},
	});

	return null;
};
