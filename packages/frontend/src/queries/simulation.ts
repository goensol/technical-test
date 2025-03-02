import { httpClient } from "@ensol-test/frontend/backend/axios";

import type { SimulationParameters } from "@ensol-test/types/simulations";

export const getSimulation = async (parameters: SimulationParameters) => {
	const response = await httpClient.get("/simulations", parameters);
	return response.data;
};
