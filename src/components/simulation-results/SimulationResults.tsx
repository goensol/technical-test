import { Space, Title, Text } from "@mantine/core";

export default function SimulationResults() {
  return (
    <>
      <Title order={2}>Résultats de la simulation</Title>
      <Space h="lg" />

      <Text>Nombre optimale de panneaux à installer : 14</Text>
      <Text>Estimation de la production annuelle d'électricité : 9000kWh</Text>
    </>
  );
}
