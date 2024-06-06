import { DEFAULT_SIMULATION_FORM_STATE } from "@ensol-test/constants";
import * as maptalks from "maptalks";

let map: maptalks.Map;

let layer = new maptalks.VectorLayer("vector");

export const initMap = () => {
  removeMap();

  map = new maptalks.Map("map", {
    center: [
      DEFAULT_SIMULATION_FORM_STATE.longitude,
      DEFAULT_SIMULATION_FORM_STATE.latitude,
    ], // Initial center coordinates (Paris)
    zoom: 19,
    baseLayer: new maptalks.TileLayer("tile", {
      urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      subdomains: ["a", "b", "c"],
    }),
  });

  let point = new maptalks.Marker([
    DEFAULT_SIMULATION_FORM_STATE.longitude,
    DEFAULT_SIMULATION_FORM_STATE.latitude,
  ]);
  layer.addGeometry(point);
  layer.addTo(map);
  map.setCenter(map.getCenter());

  map.on("click", handleMapClick);
};

export const removeMap = () => {
  if (map) {
    map.off("click", handleMapClick);
    map.remove();
  }
};

export const drawMarker = (x: number, y: number) => {
  layer.clear();
  let point = new maptalks.Marker([x, y]);
  layer.addGeometry(point);
};

// @ts-ignore
const handleMapClick = (e: maptalks.MapMouseEvent) => {
  const { x, y } = e.coordinate;

  // @ts-ignore
  document.getElementById("input-latitude").value = parseFloat(y.toFixed(3));
  // @ts-ignore
  document.getElementById("input-longitude").value = parseFloat(x.toFixed(3));

  drawMarker(x, y);
};
