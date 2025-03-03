import { simulationSchema } from "@ensol-test/shared/validation/simulation";
import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulation";
import type { Request, Response } from "express";
import { HttpError } from "../middlewares/httpError";
import type { SimulationService } from "../services/simulation";

export class SimulationController {
	private readonly simulationService: SimulationService;

	constructor(simulationService: SimulationService) {
		this.simulationService = simulationService;
	}
	async getSimulationResults(
		req: Request<SimulationParameters>,
		res: Response<SimulationResponse>,
	) {
		const validationResult = simulationSchema.safeParse(req.query);
		if (!validationResult.success) {
			throw new HttpError(
				`Bad request: ${JSON.stringify(validationResult.error.format())}`,
				400,
			);
		}

		const { coordinates, orientation, inclination, monthlyBill } =
			validationResult.data;
		const result = await this.simulationService.calculateSimulation(
			coordinates.latitude,
			coordinates.longitude,
			orientation,
			inclination,
			monthlyBill,
		);
		res.json(result);
	}
}
