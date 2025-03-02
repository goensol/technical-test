import { httpClient } from "@ensol-test/frontend/backend/axios";

import type { SimulationParameters } from "@ensol-test/types/simulation";

export const getSimulation = async (parameters: SimulationParameters) => {
	const response = await httpClient.get("/simulations", { params: parameters });
	return response.data;
};
