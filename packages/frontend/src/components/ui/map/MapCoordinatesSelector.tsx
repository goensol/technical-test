import { Box } from "@mantine/core";
import {
	type DragEndEvent,
	Icon,
	type LatLng,
	type Map as LeafletMap,
} from "leaflet";
import { useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { CitySearch } from "./CitySearch";
import { MapEvents } from "./MapEvents";

const customIcon = new Icon({
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

type Props = {
	position: LatLng;
	setPosition: (position: LatLng) => void;
};

export const MapCoordinatesSelector = ({ position, setPosition }: Props) => {
	const mapRef = useRef<LeafletMap | null>(null);

	const handleDragendEvent = (e: DragEndEvent) => {
		setPosition(e.target.getLatLng());
	};

	const handleCityChange = (position: LatLng) => {
		mapRef.current?.flyTo(position, 15, {
			animate: true,
			duration: 0.5,
		});
		setPosition(position);
	};

	return (
		<Box style={{ position: "relative", flexGrow: 1, display: "flex" }}>
			<Box
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
					zIndex: 1000,
					width: "300px",
				}}
			>
				<CitySearch setPosition={handleCityChange} />
			</Box>

			<MapContainer
				center={position}
				zoom={5}
				ref={mapRef}
				style={{ height: "100%", width: "100%", cursor: "pointer" }}
			>
				<TileLayer
					attribution="IGN-F/Geoportail"
					url={
						"https://data.geopf.fr/wmts?" +
						"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&" +
						"LAYER=ORTHOIMAGERY.ORTHOPHOTOS" +
						"&STYLE=normal&TILEMATRIXSET=PM&" +
						"TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg"
					}
					maxNativeZoom={18}
					maxZoom={20}
				/>
				<Marker
					position={position}
					icon={customIcon}
					draggable={true}
					eventHandlers={{
						dragend: handleDragendEvent,
					}}
				/>
				<MapEvents setPosition={setPosition} />
			</MapContainer>
		</Box>
	);
};
