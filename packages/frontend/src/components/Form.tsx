import { getSimulation } from '@ensol-test/frontend/queries/simulation';
import { SimulationResponse } from '@ensol-test/types/simulations';
import { Button, Card, Group, Text, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';

type Props = {
  onSubmit: (results: SimulationResponse) => void;
};

export const Form = ({ onSubmit }: Props) => {
  const [latitude, setLatitude] = useState<number | ''>('');
  const [longitude, setLongitude] = useState<number | ''>('');
  const [inclination, setInclination] = useState<number | ''>('');
  const [monthlyBill, setMonthlyBill] = useState<number | ''>('');
  return (
    <Card withBorder h="100%">
      <Stack>
        <Title order={2}>Simulator</Title>

        <Group grow align="flex-end">
          <Text>Adress:</Text>
          <TextInput
            placeholder="Latitude"
            value={latitude}
            onChange={(event) => setLatitude(Number(event.currentTarget.value))}
            required
          />
          <TextInput
            placeholder="Longitude"
            value={longitude}
            onChange={(event) => setLongitude(Number(event.currentTarget.value))}
            required
          />
        </Group>
        <Group grow align='flex-end'>
          <Text>Inclination</Text>
          <TextInput
            placeholder="20°"
            value={inclination}
            onChange={(event) => setInclination(event.currentTarget.valueAsNumber)}
            required
          />
        </Group>
        <Group grow align='flex-end'>
          <Text>Montly Bill</Text>
          <TextInput
            placeholder='200€'
            value={monthlyBill}
            onChange={(event) => setMonthlyBill(event.currentTarget.valueAsNumber)}
            required
          />
        </Group>
      </Stack>
      <Button mt="16" onClick={async () => getSimulation({})}>
        Lancer la simulation
      </Button>
    </Card>
  );
};
