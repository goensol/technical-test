import type { SimulationResponse } from "@ensol-test/types/simulation";
import { Card, Stack, Text, Title } from "@mantine/core";

type Props = {
	results: SimulationResponse;
};

export const Results = ({ results }: Props) => {
	return (
		<Card withBorder h="100%">
			<Title order={3} mb={10}>
				Résultats
			</Title>
			<Stack gap={10}>
				<Text>
					Nombre de panneaux recommandés :{" "}
					<span style={{ fontWeight: 700 }}>{results.numberOfPanels}</span>
				</Text>
				<Text>
					Production d'énergie estimée :{" "}
					<span style={{ fontWeight: 700 }}>
						{results.solarEnergyProduction} kWh
					</span>
				</Text>
			</Stack>
		</Card>
	);
};
