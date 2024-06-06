import { Text, Card, DefaultMantineColor, StyleProp } from "@mantine/core";
import LoadingOverlayResults from "../loading-overlay-results/LoadingOverlayResults";
import { useAppSelector } from "@ensol-test/app/hooks";
import { RootState } from "@ensol-test/app/store";

interface CardResultProps {
  text: string;
  value: number;
  unit?: string;
  variant?: StyleProp<DefaultMantineColor>;
}

export default function CardResult({
  text,
  value,
  unit,
  variant,
}: CardResultProps) {
  const simulationStatus = useAppSelector(
    (state: RootState) => state.sizing.simulationStatus
  );

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <LoadingOverlayResults simulationStatus={simulationStatus} />
      <Text>{text}</Text>
      <Text fz="xl" fw={700} c={variant}>
        {value}
        {unit ? ` ${unit}` : undefined}
      </Text>
    </Card>
  );
}
