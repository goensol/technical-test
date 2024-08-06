import { getSimulation } from "@ensol-test/frontend/repositories/simulation";
import { SimulationParameters } from "@ensol-test/types/simulations";
import { useMutation } from "@tanstack/react-query";

export const launchSimulationMutation = () => {
  return useMutation({
    mutationFn: (parameters: SimulationParameters) => getSimulation(parameters),
    onError: (error: Error) => {
      console.error("Error fetching simulation:", error);
    },
  });
};
