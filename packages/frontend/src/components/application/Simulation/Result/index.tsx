import { Span } from "@ensol-test/frontend/components/atoms/Span";
import { Card, Title } from "@mantine/core";
import { Props } from "./type";

export const Result = ({ data, isPending, isSuccess }: Props) => {
  return (
    <Card withBorder>
      <Title order={3}>Results</Title>
      {isPending && <Span>Loading...</Span>}
      {isSuccess && (
        <div className="p-4 space-y-4">
          <Span>Recommander nb of pannels : {data.recommanderPanelCount}</Span>
          <Span>
            Estimated energy production : {data.energyProductionEstimate}
          </Span>
        </div>
      )}
    </Card>
  );
};
