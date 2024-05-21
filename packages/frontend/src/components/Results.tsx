import { SimulationResponse } from '@ensol-test/types/simulations';
import { Card, Stack } from '@mantine/core';

type Props = {
  results: SimulationResponse;
};

export const Results = ({ results }: Props) => {
  return (
    <Card withBorder>
      <Stack>Les résultats doivent apparaître ici</Stack>
    </Card>
  );
};
