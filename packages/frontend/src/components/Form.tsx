import { getSimulation } from "@ensol-test/frontend/queries/simulation";
import type { SimulationResponse } from "@ensol-test/types/simulations";
import { Button, Card, Stack } from "@mantine/core";

type Props = {
	onSubmit: (results: SimulationResponse) => void;
};

export const Form = ({ onSubmit }: Props) => {
	return (
		<Card withBorder h="100%">
			<Stack>Le formulaire doit être ici</Stack>
			<Button mt="16" onClick={async () => getSimulation({})}>
				Lancer la simulation
			</Button>
		</Card>
	);
};
