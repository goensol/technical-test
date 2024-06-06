import { Text, Card, DefaultMantineColor, StyleProp } from "@mantine/core";

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
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Text>{text}</Text>
      <Text fz="xl" fw={700} c={variant}>
        {value}
        {unit ? ` ${unit}` : undefined}
      </Text>
    </Card>
  );
}
