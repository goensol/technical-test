import { Form } from "@ensol-test/frontend/components/simulation/Form";
import { Results } from "@ensol-test/frontend/components/simulation/Results";
import type { SimulationResponse } from "@ensol-test/types/simulation";
import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { EmptyResults } from "./EmptyResults";

export const Simulation = () => {
	const [simulationResults, setSimulationResults] = useState<
		SimulationResponse | undefined
	>();

	return (
		<Stack>
			<Title order={2}>
				Faites une simulation de votre production photovoltaïque !
			</Title>
			<SimpleGrid cols={{ base: 1, md: 2 }}>
				<Form onSubmit={setSimulationResults} />
				{simulationResults ? (
					<Results results={simulationResults} />
				) : (
					<EmptyResults />
				)}
			</SimpleGrid>
		</Stack>
	);
};
