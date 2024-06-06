import { useAppSelector } from "@ensol-test/app/hooks";
import { RootState } from "@ensol-test/app/store";
import { SimulationStatus } from "@ensol-test/interfaces";
import { LoadingOverlay, Text, Card } from "@mantine/core";

export default function LoadingOverlayResults() {
  const simulationStatus = useAppSelector(
    (state: RootState) => state.sizing.simulationStatus
  );

  const error = useAppSelector((state: RootState) => state.sizing.error);

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
    } else if (simulationStatus === SimulationStatus.FAILURE) {
      return (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{
            children: (
              <Card shadow="md" padding="lg" radius="md" withBorder>
                <Text>Erreur avec la simulation :</Text>
                <Text fz="xl" fw={700} c={"red"}>
                  {error}
                </Text>
              </Card>
            ),
          }}
        />
      );
    } else {
      return null;
    }
  };

  return <>{getCorrectOverlay()}</>;
}
