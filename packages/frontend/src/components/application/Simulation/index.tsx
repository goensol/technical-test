import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useSimulation } from "./hook";
import { Result } from "./Result";
import { Form } from "./Form";

export const Simulation = () => {
  const { onSubmit, launchSimulationMutationResult } = useSimulation();
  return (
    <Stack>
      <Title order={2}>
        Faites une simulation de votre production photovoltaïque !
      </Title>
      <SimpleGrid cols={2}>
        <Form onSubmit={onSubmit} />

        <Result {...launchSimulationMutationResult} />
      </SimpleGrid>
    </Stack>
  );
};
