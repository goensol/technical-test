import { SimulationResponse } from "@ensol-test/types/simulations";
import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { Result } from "./Result";
import { SimulationForm } from "./SimulationForm";

export const Simulation = () => {
  const [simulationResults, setSimulationResults] = useState<
    SimulationResponse | undefined
  >();

  return (
    <Stack>
      <Title order={2}>
        Faites une simulation de votre production photovoltaïque !
      </Title>
      <SimpleGrid cols={2}>
        <SimulationForm onSubmit={() => {}} />
        {simulationResults && <Result result={simulationResults} />}
      </SimpleGrid>
    </Stack>
  );
};
