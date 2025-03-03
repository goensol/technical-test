import { Card, Center, Text } from "@mantine/core";

export const EmptyResults = () => {
	return (
		<Card withBorder>
			<Center h="100%">
				<Text ta="center">
					Lancer une simulation pour voir les résultats apparaître ici
				</Text>
			</Center>
		</Card>
	);
};
