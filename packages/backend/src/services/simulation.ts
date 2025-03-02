import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulation";
import { HttpError } from "../middlewares/httpError";

export class SimulationService {
	async calculateSimulation(
		parameters: SimulationParameters,
	): Promise<SimulationResponse> {
		throw new HttpError("Not implemented", 501);
	}
}
