import { SimulationStatus } from "@ensol-test/interfaces";
import { LoadingOverlay, Text } from "@mantine/core";
import React from "react";

interface LoadingOverlayResultsProps {
  simulationStatus: SimulationStatus;
}

const LoadingOverlayResults: React.FC<LoadingOverlayResultsProps> = ({
  simulationStatus,
}) => {
  const getCorrectOverlay = () => {
    if (simulationStatus === SimulationStatus.NOT_STARTED) {
      return (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{
            children: (
              <Text fw={700}>Lancez la simulation pour voir les résultats</Text>
            ),
          }}
        />
      );
    } else if (simulationStatus === SimulationStatus.RUNNING) {
      return (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      );
    } else {
      return null;
    }
  };

  return <>{getCorrectOverlay()}</>;
};

export default LoadingOverlayResults;
