import {
  NumberInput,
  Group,
  Button,
  Space,
  Title,
  Select,
} from "@mantine/core";

export default function SimulationForm() {
  return (
    <>
      <Title order={2}>Veuillez saisir vos informations</Title>
      <Space h="lg" />
      <Group grow>
        <NumberInput placeholder="43.701" label="Latitude (°)" />
        <NumberInput placeholder="7.268" label="Longitude (°)" />
      </Group>
      <Space h="lg" />

      <Group grow>
        <NumberInput placeholder="30" label="Inclinaison (°)" />
        <Select
          label="Orientation"
          placeholder="Sud"
          data={["Ouest", "Sud-Ouest", "Sud", "Sud-Est", "Est"]}
        />
      </Group>
      <Space h="lg" />

      <NumberInput placeholder="200€" label="Facture Mensuelle d'électricité" />
      <Space h="lg" />

      <Button>Simuler !</Button>
    </>
  );
}
