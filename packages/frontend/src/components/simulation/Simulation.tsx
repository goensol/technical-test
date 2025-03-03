import { Form } from "@ensol-test/frontend/components/simulation/Form";
import { Results } from "@ensol-test/frontend/components/simulation/Results";
import type { SimulationResponse } from "@ensol-test/types/simulation";
import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useRef, useState } from "react";
import { EmptyResults } from "./EmptyResults";

export const Simulation = () => {
	const [simulationResults, setSimulationResults] = useState<
		SimulationResponse | undefined
	>();

	const resultsRef = useRef<HTMLDivElement | null>(null);

	const handleSimulationSubmit = (results: SimulationResponse) => {
		setSimulationResults(results);

		setTimeout(() => {
			resultsRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}, 100);
	};

	return (
		<Stack>
			<Title order={2}>
				Faites une simulation de votre production photovoltaïque !
			</Title>
			<SimpleGrid cols={{ base: 1, md: 2 }}>
				<Form onSubmit={handleSimulationSubmit} />
				<div ref={resultsRef}>
					{simulationResults ? (
						<Results results={simulationResults} />
					) : (
						<EmptyResults />
					)}
				</div>
			</SimpleGrid>
		</Stack>
	);
};
