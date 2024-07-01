import { getSimulation } from '@ensol-test/frontend/queries/simulation';
import { SimulationResponse } from '@ensol-test/types/simulations';
import { Button, Card, Group, Text, Stack, TextInput, Title, NumberInput } from '@mantine/core';
import { useState } from 'react';

type Props = {
  onSubmit: (results: SimulationResponse) => void;
};

export const Form = ({ onSubmit }: Props) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [inclination, setInclination] = useState<number>(0);
  const [monthlyBill, setMonthlyBill] = useState<number>(0);
  return (
    <Card withBorder h="100%">
      <Stack>
        <Title order={2}>Simulator</Title>

        <Group grow align="flex-end">
          <Text>Address:</Text>
          <NumberInput
            placeholder="Latitude"
            value={latitude}
            hideControls
            onChange={(event) => setLatitude(Number(event))}
            required
          />
          <NumberInput
            placeholder="Longitude"
            value={longitude}
            hideControls
            onChange={(event) => setLongitude(Number(event))}
            required
          />
        </Group>
        <Group grow align='flex-end'>
          <Text>Inclination</Text>
          <NumberInput
            placeholder="20°"
            value={inclination}
            hideControls
            onChange={(event) => setInclination(Number(event))}
            required
          />
        </Group>
        <Group grow align='flex-end'>
          <Text>Montly Bill</Text>
          <NumberInput
            placeholder='200€'
            value={monthlyBill}
            hideControls
            onChange={(event) => setMonthlyBill(Number(event))}
            required
          />
        </Group>
      </Stack>
      <Button mt="16" onClick={
          async () => onSubmit(await getSimulation({ latitude, longitude, inclination, monthlyBill }))
          }>
        Lancer la simulation
      </Button>
    </Card>
  );
};
