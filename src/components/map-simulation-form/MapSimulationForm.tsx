import { useEffect } from "react";
import { Box } from "@mantine/core";
import { initMap, removeMap } from "@ensol-test/utils/handle-map";

export default function MapSimulationForm() {
  useEffect(() => {
    initMap();

    return () => {
      removeMap();
    };
  }, []);

  return (
    <Box>
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </Box>
  );
}
