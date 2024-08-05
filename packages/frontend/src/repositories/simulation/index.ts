import { httpClient } from "@ensol-test/shared/abstractions/httpClient";

import {
  SimulationParameters,
  SimulationResponse,
} from "@ensol-test/types/simulations";
import { BASE_URL } from "../constant";

export const getSimulation = async (parameters: SimulationParameters) => {
  const response = await httpClient(BASE_URL).httpGet<
    SimulationResponse,
    SimulationParameters
  >("/simulations", {
    params: parameters,
  });
  return response;
};
