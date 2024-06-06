import { useAppSelector } from "@ensol-test/app/hooks";
import { RootState } from "@ensol-test/app/store";
import { Space, Title, Text, Box, Card } from "@mantine/core";

export default function SimulationResults() {
  const data = useAppSelector((state: RootState) => state.sizing.data);
  const loading = useAppSelector((state: RootState) => state.sizing.loading);
  const error = useAppSelector((state: RootState) => state.sizing.error);

  const { customerYearlyUsage, nbOfPanels, yearlyProd } = data;

  return (
    <Box>
      <Title order={2}>Résultats de la simulation</Title>
      <Space h="lg" />
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Text>Estimation votre consommation annuelle d'électricité :</Text>
        <Text fz="xl" fw={700}>
          {customerYearlyUsage}kWh
        </Text>
      </Card>
      <Space h="lg" />
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Text>Nombre optimale de panneaux à installer :</Text>
        <Text fz="xl" fw={700}>
          {nbOfPanels}
        </Text>
      </Card>
      <Space h="lg" />
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Text>Estimation de la production annuelle d'électricité :</Text>
        <Text fz="xl" fw={700}>
          {yearlyProd}kWh
        </Text>
      </Card>
    </Box>
  );
}
