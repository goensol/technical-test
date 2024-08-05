import { Card, Stack, Title } from "@mantine/core";
import { Props } from "./type";
import { H1 } from "../../atoms/H1";

export const Result = ({ results }: Props) => {
  return (
    <Card withBorder>
      <Title order={3}>Results</Title>

      <Stack>Les résultats doivent apparaître ici</Stack>
    </Card>
  );
};
