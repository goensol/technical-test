import { Grid, Container, Title, Text } from "@mantine/core";
import SimulationForm from "../simulation-form/SimulationForm";
import SimulationResults from "../simulation-results/SimulationResults";

export default function SimulationContainer() {
  return (
    <Container my="md">
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Title>
            <Text
              inherit
              variant="gradient"
              gradient={{ from: "#E480B8", to: "#5982FA", deg: 20 }}
            >
              Simuler simplement le nombre de panneaux solaire à installer chez
              vous !
            </Text>
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <SimulationForm />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <SimulationResults />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
