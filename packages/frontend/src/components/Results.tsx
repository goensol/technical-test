import { SimulationResponse } from '@ensol-test/types/simulations';
import { Card, Group, Stack, Text, Title } from '@mantine/core';

type Props = {
  results: SimulationResponse | undefined;
};

export const Results = ({ results }: Props) => {
  if (!results) {
    return (
      <Card withBorder>
        <Stack>
          <Title order={2}>Results</Title>
          <Text>
            Run the simulation to get the results.
          </Text>
        </Stack>
      </Card>
    );
  }
  return (
    <Card withBorder>
      <Stack>
        <Title order={2}>Results</Title>
        <Group grow>
          <Text>Number of panels:</Text>
          <Text>{results.numberOfPanel}</Text>
        </Group>
        <Group grow>
          <Text>Estimated energy production:</Text>
          <Text>{results.energyProduction}kWh</Text>
        </Group>
      </Stack>
    </Card>
  );
};
