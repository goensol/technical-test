import { simulatorSchema } from "@ensol-test/shared/validations/simulator";
import { z } from "zod";
export type SimulationParameters = z.infer<typeof simulatorSchema>; // To define
export type SimulationResponse = {
  recommanderPanelCount: number;
  energyProductionEstimate: number;
};
