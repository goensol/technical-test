import { SimulationParameters } from "@ensol-test/types/simulations";
import { launchSimulationMutation } from "./queries";

export const useSimulation = () => {
  const launchSimulationMutationResult = launchSimulationMutation();

  const onSubmit = (data: SimulationParameters) => {
    launchSimulationMutationResult.mutate(data);
  };

  return {
    onSubmit,
    launchSimulationMutationResult,
  };
};
