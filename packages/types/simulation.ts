import type { simulationSchema } from "@ensol-test/shared/validation/simulation";
import type { z } from "zod";

export type SimulationParameters = z.infer<typeof simulationSchema>;
export type SimulationResponse = {
	numberOfPanels: number;
	estimatedEnergyProduction: number;
};
