import {
  SimulationParameters,
  SimulationResponse,
} from "@ensol-test/types/simulations";
import { UseMutationResult } from "@tanstack/react-query";

export type Props = UseMutationResult<
  SimulationResponse,
  Error,
  SimulationParameters
>;
