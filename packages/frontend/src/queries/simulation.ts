import { httpClient } from "@ensol-test/frontend/backend/axios";

import {
  SimulationParameters,
  SimulationResponse,
} from "@ensol-test/types/simulations";

export const getSimulation = async (parameters: SimulationParameters) => {
  const response = await httpClient.get<SimulationResponse>(
    "/simulations",
    parameters
  );
  return response.data;
};
