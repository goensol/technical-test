import { simulationSchema } from "@ensol-test/shared/validations/simulation";
import { z } from "zod";
export type SimulationParameters = z.infer<typeof simulationSchema>; // To define
export type SimulationResponse = {
  recommanderPanelCount: number;
  energyProductionEstimate: number;
};
