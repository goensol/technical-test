import { SimulationResponse } from "@ensol-test/types/simulations";
import { Box, Card, Stack, Text } from "@mantine/core";

type Props = {
    results?: SimulationResponse;
};

export const Results = ({ results }: Props) => {
    return (
        <Card withBorder>
            <Stack>
                {results ? (
                    <>
                        <Box mb="xl">
                            <Text size="lg" mb={5}>
                                Recommended nb of panels:
                            </Text>
                            <Text size="xl" ml="md">
                                {results.estimatedPanels}
                            </Text>
                        </Box>

                        <Box>
                            <Text size="lg" mb={5}>
                                Estimated energy production:
                            </Text>
                            <Text size="xl" ml="md">
                                {results.yearlyEnergyProduction}kWh/year
                            </Text>
                        </Box>
                    </>
                ) : null}
            </Stack>
        </Card>
    );
};
