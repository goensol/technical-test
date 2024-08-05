import { useZodForm } from "@ensol-test/frontend/hooks/useZodForm";
import { simulatorSchema } from "@ensol-test/shared/validations/simulator";
import { Card, Title } from "@mantine/core";
import { Form } from "@ensol-test/frontend/components/molecules/Form";
import { FormInput } from "@ensol-test/frontend/components/molecules/FormInput";
import { SubmitButton } from "@ensol-test/frontend/components/molecules/SubmitButton";
import { Props } from "./type";

export const SimulationForm = ({ onSubmit }: Props) => {
  const form = useZodForm({
    schema: simulatorSchema,
  });
  return (
    <Card withBorder h="100%">
      <Title order={3}>Simulator</Title>
      <Form form={form} onSubmit={onSubmit}>
        <div className="p-4 space-y-4">
          <FormInput
            type="text"
            label={"Latitude :"}
            required
            {...form.register("latitude")}
          />
          <FormInput
            type="text"
            label={"Longitude :"}
            required
            {...form.register("longitude")}
          />
          <FormInput
            type="text"
            label={"Orientation"}
            required
            {...form.register("orientation")}
          />
          <FormInput
            type="number"
            label={"Inclination (°):"}
            step={10}
            required
            {...form.register("inclination")}
          />
          <FormInput
            type="number"
            label={"Monthly bill (€):"}
            required
            step={0.01}
            {...form.register("monthlyBill")}
          />

          <SubmitButton>Launch Simulation</SubmitButton>
        </div>
      </Form>
    </Card>
  );
};
